import React from "react";
import {
    NativeBaseProvider,
    extendTheme,
    StatusBar,
} from "native-base";
import {NavigationContainer, Theme as NavigationTheme, DarkTheme, DefaultTheme} from "@react-navigation/native";
import {Provider} from "react-redux";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";

import {store} from "./state/store";
import Root from "./Root";

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
