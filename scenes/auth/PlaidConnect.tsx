import React, {useEffect, useState} from 'react';
import {Box, Button, Heading, Link, Text, VStack} from "native-base";
// @ts-ignore
import PlaidLink from '@burstware/expo-plaid-link';

import AuthService from "../../services/AuthService";
import useModal from "../../hooks/useModal";
import FullScreenModal from '../../components/FullScreenModal';

interface ComponentProps {

}

function PlaidConnect({}: ComponentProps) {
    const [linkToken, setLinkToken] = useState<string | undefined>(undefined);
    const { isOpen: isPlaidOpen, open: openPlaid, close: closePlaid } = useModal();

    console.log(isPlaidOpen);

    useEffect(() => {
        AuthService.obtainPlaidLinkToken().then(setLinkToken);
    }, []);

    const onPlaidSuccess = (publicTokenResponse: { publicToken: string }) => {
        const publicToken = publicTokenResponse.publicToken;
        AuthService.exchangePlaidPublicToken(publicToken).then(closePlaid);
    }

    return (
        <Box safeAreaTop w="100%" h="100%" bgColor="dark.50">
            {linkToken && (
                <FullScreenModal show={isPlaidOpen}>
                    <PlaidLink
                        linkToken={linkToken}
                        onSuccess={onPlaidSuccess}
                        onExit={closePlaid}
                    />
                </FullScreenModal>
            )}
            <VStack h="100%" m={10} space={20} justifyContent="center" alignItems="center">
                <VStack w="100%" space="md">
                    <Heading size="lg" color="light.100">Connect your Account</Heading>
                    <Text color="light.200">
                        Profital connects securely with your brokerage account through Plaid to customize its
                        news feed based on your specific holdings. Profital will never sell your
                        data or share it in any way.
                    </Text>
                </VStack>
                <VStack justifyContent="center" alignItems="center" space="md">
                    <Button
                        onPress={openPlaid}
                        disabled={!linkToken}
                        size="lg"
                        bgColor="black"
                        _text={{ color: 'light.100', fontWeight: 'bold', }}
                    >
                        Connect your Account
                    </Button>
                    <Link isUnderlined={false} _text={{ color: 'light.100' }}>
                        Skip for now
                    </Link>
                </VStack>
            </VStack>
        </Box>
    );
}

export default PlaidConnect;