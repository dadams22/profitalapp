import React from "react";
import {Box, Center} from "native-base";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Feed from "./scenes/Feed";
import Portfolio from "./scenes/Portfolio";
import Search from "./scenes/Search";
import Account from "./scenes/Account";
import {useAppSelector} from "../../state/hooks";
import WebViewModal from "../../components/WebViewModal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {faChartColumn, faHouse, faMagnifyingGlass, faUser, IconDefinition} from "@fortawesome/free-solid-svg-icons";

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
    const webUrl = useAppSelector(state => state.web.url);

    return (
        <Box width="100%" minH="100%" bgColor="dark.50">
            {webUrl && <WebViewModal url={webUrl} />}
            <Tabs.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: '#10b981',
                    tabBarInactiveTintColor: '#d6d3d1',
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
