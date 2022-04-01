import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Center, Spinner} from "native-base";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {useAppSelector} from "../../state/hooks";

const Stack = createNativeStackNavigator();

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
                </Stack.Navigator>
            )
    );
}

export default AuthPage;
