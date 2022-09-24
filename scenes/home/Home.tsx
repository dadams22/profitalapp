import React, {useEffect} from "react";
import {Box, useTheme} from "native-base";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {faChartColumn, faHouse, faMagnifyingGlass, faUser, IconDefinition} from "@fortawesome/free-solid-svg-icons";

import Feed from "./scenes/Feed";
import Portfolio from "./scenes/portfolio/Portfolio";
import Search from "./scenes/Search";
import Account from "./scenes/Account";
import WebViewModal from "../../components/WebViewModal";
import {useAppDispatch, useAppSelector} from "../../state/hooks";
import {getUser} from "../../state/userSlice";

const Tabs = createBottomTabNavigator();

interface TabDefinition {
    name: string;
    component: React.FunctionComponent;
    icon: IconDefinition;
}

const TAB_LIST: TabDefinition[] = [
    {
        name: 'Feed',
        component: Feed,
        icon: faHouse,
    },
    {
        name: 'Portfolio',
        component: Portfolio,
        icon: faChartColumn,
    },
    {
        name: 'Search',
        component: Search,
        icon: faMagnifyingGlass,
    },
    {
        name: 'Account',
        component: Account,
        icon: faUser,
    },
]

function Home() {
    const { colors } = useTheme();

    const webParams = useAppSelector(state => state.web);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, []);

    // @ts-ignore
    return (
        <Box width="100%" minH="100%" bgColor="dark.50">
            <WebViewModal {...webParams} />
            <Tabs.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: colors.violet["500"],
                    tabBarInactiveTintColor: colors.light["100"],
                }}
            >
                {TAB_LIST.map(({ name, component, icon, }) => (
                    <Tabs.Screen
                        key={name}
                        name={name}
                        component={component}
                        options={{
                            tabBarIcon: () => <FontAwesomeIcon icon={icon} color="#f5f5f4" size={20} />
                        }}
                    />
                ))}
            </Tabs.Navigator>
        </Box>
    );
}

export default Home;
