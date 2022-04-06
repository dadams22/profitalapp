import React, {useEffect, useState} from "react";
import {Box, Button, Center} from "native-base";
import AuthService from "../../../services/AuthService";
import useModal from "../../../hooks/useModal";
import FullScreenModal from "../../../components/FullScreenModal";
import {useAppDispatch, useAppSelector} from "../../../state/hooks";

// @ts-ignore
import PlaidLink from "@burstware/expo-plaid-link";
import {getHoldings} from "../../../state/portfolioSlice";

function Portfolio() {
    const dispatch = useAppDispatch();

    const holdings = useAppSelector(state => state.portfolio.holdings);

    const [linkToken, setLinkToken] = useState<string | undefined>(undefined);

    const { isOpen: isPlaidOpen, open: openPlaid, close: closePlaid, } = useModal();

    useEffect(() => {
        AuthService.obtainPlaidLinkToken().then(setLinkToken);
        dispatch(getHoldings());
    }, []);

    const onPlaidSuccess = (publicTokenResponse: { publicToken: string }) => {
        const publicToken = publicTokenResponse.publicToken;
        AuthService.exchangePlaidPublicToken(publicToken).then(closePlaid);
    }

    return (
        <Box safeArea bgColor="dark.50" w="100%" minH="100%">
            <Center>
                <Button
                    onPress={openPlaid}
                    bgColor="black"
                    _text={{ color: 'light.100', fontWeight: 'bold' }}
                >
                    Connect your Account
                </Button>
            </Center>
            {linkToken && isPlaidOpen && (
                <FullScreenModal>
                    <PlaidLink
                        linkToken={linkToken}
                        onSuccess={onPlaidSuccess}
                        onExit={closePlaid}
                    />
                </FullScreenModal>
            )}
        </Box>
    );
}

export default Portfolio;
