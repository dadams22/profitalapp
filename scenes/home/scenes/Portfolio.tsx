import React, {useEffect, useState} from "react";
import {Box, Button, Center, Divider, Heading, Text, VStack} from "native-base";
import {noop} from "lodash";
import AuthService from "../../../services/AuthService";
import useModal from "../../../hooks/useModal";
import FullScreenModal from "../../../components/FullScreenModal";
import {useAppDispatch, useAppSelector} from "../../../state/hooks";

// @ts-ignore
import PlaidLink from "@burstware/expo-plaid-link";
import {getHoldings} from "../../../state/portfolioSlice";
import PageLayout from "../../../components/PageLayout";
import PlaidButton from "../../../components/PlaidButton";

function Portfolio() {
    const isPlaidConnected = false;

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
        <PageLayout headerText={isPlaidConnected ? "Portfolio" : undefined}>
            <Center h="100%">
                <VStack space="xl">
                    <VStack
                        space="xs"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        px={2}
                    >
                        <Heading size="lg" bold color="light.50" textAlign="center">
                            Start Tracking your Portfolio
                        </Heading>
                        <Box w={160}>
                            <Divider bgColor="violet.700" />
                        </Box>
                        <Text color="light.200" textAlign="center">
                            Profital securely syncs with your brokerage account through Plaid to personalize your
                            experience based on the assets that you hold.
                        </Text>
                    </VStack>
                    <PlaidButton onPress={openPlaid} />
                </VStack>
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
        </PageLayout>
    );
}

export default Portfolio;
