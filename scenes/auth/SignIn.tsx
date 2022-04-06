import React, {useState} from "react";
import {Box, Button, Center, FormControl, Heading, HStack, Input, Link, Text, VStack} from "native-base";
import {NativeStackScreenProps} from "@react-navigation/native-stack";

import {useAppDispatch} from "../../state/hooks";
import {setAuthenticated} from "../../state/userSlice";
import AuthService from "../../services/AuthService";
import {AuthStackParamList} from "./AuthPage";

function SignIn({ navigation }: NativeStackScreenProps<AuthStackParamList, 'SignIn'>) {
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState<boolean>(false)

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onSubmit = () => {
        setLoading(true);
        AuthService.obtainAuthToken(username, password)
            .then(() => {
                dispatch(setAuthenticated(true));
            })
            .catch(console.log)
            .finally(() => setLoading(false));
    }

    return (
        <Center w="100%" h="100%" bgColor="dark.50">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Heading size="xl" fontWeight="bold" color="light.100">
                    Profital
                </Heading>
                <Heading mt="1" color="light.300" fontWeight="medium" size="sm">
                    Sign in to continue
                </Heading>

                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label _text={{ color: "light.100" }}>Username</FormControl.Label>
                        <Input
                            value={username}
                            onChangeText={setUsername}
                            color="light.200"
                            _focus={{borderColor: "violet.500",}}
                            autoCapitalize="none"
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label _text={{ color: "light.100" }}>Password</FormControl.Label>
                        <Input
                            type="password"
                            value={password}
                            onChangeText={setPassword}
                            color="light.200"
                            _focus={{ borderColor: "violet.500", }}
                        />
                        <Link _text={{
                            fontSize: "xs",
                            fontWeight: "500",
                            color: "violet.500"
                        }} alignSelf="flex-end" mt="1">
                            Forgot Password?
                        </Link>
                    </FormControl>
                    <Button onPress={onSubmit} isLoading={loading} mt="2" bgColor="violet.500">
                        Sign in
                    </Button>
                    <HStack mt="6" justifyContent="center">
                        <Text fontSize="sm" color="light.100">
                            New to Profital?{" "}
                        </Text>
                            <Link
                                onPress={() => navigation.navigate("SignUp")}
                                _text={{
                                    color: "violet.500",
                                    fontWeight: "medium",
                                    fontSize: "sm"
                                }}
                            >
                                Sign Up
                            </Link>
                    </HStack>
                </VStack>
            </Box>
        </Center>
    );
}

export default SignIn;
