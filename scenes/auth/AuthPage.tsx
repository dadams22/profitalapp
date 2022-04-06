import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Center, Spinner} from "native-base";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {useAppSelector} from "../../state/hooks";
import PlaidConnect from "./PlaidConnect";

export type AuthStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
    PlaidConnect: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthPage() {
    const checkingStatus = useAppSelector(state => state.user.checkingStatus);

    return (
        checkingStatus ? (
                <Center h="100%" w="100%" bgColor="dark.50">
                    <Spinner color="tertiary.500" />
                </Center>
            ) :
            (
                <Stack.Navigator screenOptions={{ headerShown: false, }}>
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="PlaidConnect" component={PlaidConnect} />
                </Stack.Navigator>
            )
    );
}

export default AuthPage;
