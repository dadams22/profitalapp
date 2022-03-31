import React, {useState} from "react";
import {
    Text,
    HStack,
    Center,
    Switch,
    useColorMode,
    NativeBaseProvider,
    extendTheme, Container, Box, StatusBar,
} from "native-base";

import Home from "./scenes/home/Home";
import {NavigationContainer, Theme as NavigationTheme, DarkTheme, DefaultTheme} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import SignUp from "./scenes/auth/SignUp";
import SignIn from "./scenes/auth/SignIn";
import AuthPage from "./scenes/auth/AuthPage";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {useAppSelector} from "./state/hooks";
import Root from "./Root";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
};

// extend the theme
export const theme = extendTheme({ config });

// Theme for react navigation
const navigationTheme: NavigationTheme = {
    ...DefaultTheme,
    dark: true,
    colors: {
        ...DefaultTheme.colors,
        background: '#0f172a',
    }
}

// Build font-awesome icon library
library.add(faXmark)


export default function App() {
    return (
        <Provider store={store}>
            <NativeBaseProvider theme={theme}>
                <NavigationContainer theme={DarkTheme}>
                    <StatusBar barStyle="light-content" />
                    <Root />
                </NavigationContainer>
            </NativeBaseProvider>
        </Provider>
    );
}
