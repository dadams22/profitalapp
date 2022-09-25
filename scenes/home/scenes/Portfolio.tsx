import React, {useEffect, useState} from "react";
import {Center, Divider, Heading, HStack, Spinner, Text, VStack} from "native-base";
import AuthService from "../../../services/AuthService";
import {useAppDispatch, useAppSelector} from "../../../state/hooks";
import {getHoldings} from "../../../state/portfolioSlice";
import PageLayout from "../../../components/PageLayout";
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

    console.log(portfolio?.holdings)

    return (
        <PageLayout headerText="Portfolio">
            {isPlaidConnected ? (
                <VStack>
                    {portfolio ? (
                        <>
                            <Center my="2">
                                <Text fontSize="4xl" color="green.500" fontWeight="light">
                                    {`$${portfolio.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                                </Text>
                                <Text color="light.200">your current holdings</Text>
                            </Center>
                            <VStack space="xl">
                                <VStack space="2xs">
                                    <Heading color="light.100" fontSize="md">
                                        Stocks
                                    </Heading>
                                    {portfolio.holdings.map((holding) => (
                                        <VStack key={holding.ticker_symbol} space="2xs">
                                            <Divider bg="dark.200" />
                                            <HStack justifyContent="space-between">
                                                <VStack maxWidth="45%">
                                                    <Text color="light.100" fontWeight="medium" fontSize="md">
                                                        {holding.ticker_symbol}
                                                    </Text>
                                                    <Text color="violet.500" isTruncated>{holding.name}</Text>
                                                </VStack>
                                                <VStack justifyContent="center">
                                                    <Text fontSize="md" color="light.100" textAlign="right">
                                                        {`$${(holding.quantity * holding.institution_price).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                                                    </Text>
                                                    <Text fontSize="sm" color="light.200" textAlign="right">
                                                        {`(${holding.quantity})`}
                                                    </Text>
                                                </VStack>
                                            </HStack>
                                        </VStack>
                                    ))}
                                </VStack>
                                <VStack space="2xs">
                                    <Heading color="light.100" fontSize="md">
                                        Currency
                                    </Heading>
                                    {portfolio.currencies.map((currency) => (
                                        <VStack key={currency.iso_currency_code} space="2xs">
                                            <Divider bg="dark.200" />
                                            <HStack justifyContent="space-between">
                                                <VStack maxWidth="45%">
                                                    <Text color="light.100" fontWeight="medium" fontSize="md">
                                                        {currency.iso_currency_code}
                                                    </Text>
                                                    <Text color="violet.500" isTruncated>{currency.name}</Text>
                                                </VStack>
                                                <VStack justifyContent="center">
                                                    <Text fontSize="md" color="light.100" textAlign="right">
                                                        {`$${(currency.institution_price * currency.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                                                    </Text>
                                                </VStack>
                                            </HStack>
                                        </VStack>
                                    ))}
                                </VStack>
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
