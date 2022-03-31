import React from "react";
import {Box, Button, Center, FormControl, Heading, HStack, Input, Link, Text, VStack} from "native-base";
import {NativeStackScreenProps} from "@react-navigation/native-stack";

function SignUp({ navigation }: NativeStackScreenProps) {
    return (
        <Center w="100%" h="100%" bgColor="dark.50">
            <Box safeArea p="2" w="90%" maxW="290" py="8">
                <Heading size="lg" color="light.100" fontWeight="semibold">
                    Profital
                </Heading>
                <Heading mt="1" color="light.300" fontWeight="medium" size="xs">
                    Sign up to continue!
                </Heading>
                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label _text={{ color: "light.100", }}>Email</FormControl.Label>
                        <Input />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label _text={{ color: "light.100", }}>Password</FormControl.Label>
                        <Input type="password" />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label _text={{ color: "light.100", }}>Confirm Password</FormControl.Label>
                        <Input type="password" />
                    </FormControl>
                    <Button mt="2" color="tertiary.500">
                        Sign up
                    </Button>
                    <HStack mt="6" justifyContent="center">
                        <Text fontSize="sm" color="light.100">
                            Existing User?{" "}
                        </Text>
                        <Link
                            onPress={() => navigation.navigate("SignIn")}
                            _text={{
                                color: "blue.500",
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
