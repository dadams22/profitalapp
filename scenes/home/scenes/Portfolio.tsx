import React, {useEffect, useState} from "react";
import {Box, Center, Link, Text} from "native-base";
import {PlaidLink} from "@burstware/expo-plaid-link";
import AuthService from "../../../services/AuthService";
import {useAppDispatch} from "../../../state/hooks";
import { openUrl } from "../../../state/webSlice";

function Portfolio() {
    const dispatch = useAppDispatch();

    const [linkToken, setLinkToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        AuthService.getInstance().obtainPlaidLinkToken().then(setLinkToken);
    }, [])

    const openPlaidLink = () => {
        const webLink = `https://cdn.plaid.com/link/v2/stable/link.html?isWebview=true&token=${linkToken}`;

        dispatch(openUrl(webLink));
    }

    console.log(linkToken);

    return (
        <Box safeArea bgColor="dark.50" w="100%" minH="100%">
            {linkToken && (
                <Center>
                    <Link onPress={openPlaidLink}>Connect your portfolio</Link>
                </Center>
            )}
        </Box>
    );
}

export default Portfolio;
