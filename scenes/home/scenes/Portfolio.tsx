import React, {useEffect, useState} from "react";
import {Box, Button, Center, Divider, Heading, HStack, List, Spinner, Text, VStack} from "native-base";
import {noop} from "lodash";
import AuthService from "../../../services/AuthService";
import useModal from "../../../hooks/useModal";
import FullScreenModal from "../../../components/FullScreenModal";
import {useAppDispatch, useAppSelector} from "../../../state/hooks";
import {getHoldings} from "../../../state/portfolioSlice";
import PageLayout from "../../../components/PageLayout";
import { getUser } from "../../../state/userSlice";
import PlaidConnect from "../../../components/plaid/PlaidCallToAction";
import PlaidCallToAction from "../../../components/plaid/PlaidCallToAction";

function Portfolio() {
    const isPlaidConnected: boolean = useAppSelector(state => state.user.user?.is_plaid_connected || false);

    const dispatch = useAppDispatch();

    const loading = useAppSelector(state => state.portfolio.loading);
    const portfolio = useAppSelector(state => state.portfolio.portfolio);

    const [linkToken, setLinkToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        AuthService.obtainPlaidLinkToken().then(setLinkToken);
        dispatch(getHoldings());
    }, []);

    console.log(portfolio?.balance)

    return (
        <PageLayout headerText="Portfolio">
            {isPlaidConnected ? (
                <VStack>
                    {portfolio ? (
                        <>
                            <Center my="2">
                                <Text fontSize="5xl" color="green.500" fontWeight="light">
                                    {`$${portfolio.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                                </Text>
                                <Text color="light.400">your current holdings</Text>
                            </Center>
                            <VStack space="sm">
                                {portfolio.holdings.map((holding) => (
                                    <HStack>
                                        <VStack>
                                            <Text color="light.100" fontWeight="medium" fontSize="lg">{holding.ticker_symbol}</Text>
                                            <Text color="violet.500">{`${holding.quantity} shares`}</Text>
                                        </VStack>
                                    </HStack>
                                ))}
                            </VStack>
                        </>
                    ) : (
                        <Center><Spinner /></Center>
                    )}
                </VStack>
            ) : (
                <PlaidCallToAction onSuccess={console.log} />
            )}
        </PageLayout>
    );
}

export default Portfolio;
