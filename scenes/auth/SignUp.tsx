import React, {useState} from "react";
import {Box, Button, Center, FormControl, Heading, HStack, Input, Link, Text, VStack} from "native-base";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import AuthService from "../../services/AuthService";
import {AuthStackParamList} from "./AuthPage";

function SignUp({ navigation }: NativeStackScreenProps<AuthStackParamList, 'SignUp'>) {
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const onSubmit = () => {
        setLoading(true);
        AuthService.signUp({ email, username, password })
            .then(() => navigation.navigate('PlaidConnect'))
            .catch(console.log)
            .finally(() => setLoading(false));
    }

    return (
        <Center w="100%" h="100%" bgColor="dark.50">
            <Box safeArea p="2" w="90%" maxW="290" py="8">
                <Heading size="xl" color="light.100" fontWeight="bold">
                    Profital
                </Heading>
                <Heading mt="1" color="light.300" fontWeight="medium" size="xs">
                    Sign up to get started!
                </Heading>
                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label _text={{ color: "light.100", }}>Email</FormControl.Label>
                        <Input
                            value={email}
                            onChangeText={setEmail}
                            color="light.200"
                            _focus={{borderColor: "violet.500",}}
                            autoCapitalize="none"
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label _text={{ color: "light.100", }}>Username</FormControl.Label>
                        <Input
                            value={username}
                            onChangeText={setUsername}
                            color="light.200"
                            _focus={{borderColor: "violet.500",}}
                            autoCapitalize="none"
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label _text={{ color: "light.100", }}>Password</FormControl.Label>
                        <Input
                            value={password}
                            onChangeText={setPassword}
                            type="password"
                            color="light.200"
                            _focus={{borderColor: "violet.500",}}
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label _text={{ color: "light.100", }}>Confirm Password</FormControl.Label>
                        <Input
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            type="password"
                            color="light.200"
                            _focus={{borderColor: "violet.500",}}
                        />
                    </FormControl>
                    <Button onPress={onSubmit} isLoading={loading} mt="2" bgColor="violet.500">
                        Sign up
                    </Button>
                    <HStack mt="6" justifyContent="center">
                        <Text fontSize="sm" color="light.100">
                            Existing User?{" "}
                        </Text>
                        <Link
                            onPress={() => navigation.navigate("SignIn")}
                            _text={{
                                color: "violet.500",
                                fontWeight: "medium",
                                fontSize: "sm"
                            }}
                        >
                            Sign In
                        </Link>
                    </HStack>
                </VStack>
            </Box>
        </Center>
    );
};

export default SignUp;
