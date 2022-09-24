import React, {useEffect, useState} from "react";
import {Box, Button, Center, Divider, Heading, Text, VStack} from "native-base";
import {noop} from "lodash";
import AuthService from "../../../../services/AuthService";
import useModal from "../../../../hooks/useModal";
import FullScreenModal from "../../../../components/FullScreenModal";
import {useAppDispatch, useAppSelector} from "../../../../state/hooks";

// @ts-ignore
import PlaidLink from "@burstware/expo-plaid-link";
import {getHoldings} from "../../../../state/portfolioSlice";
import PageLayout from "../../../../components/PageLayout";
import PlaidButton from "../../../../components/plaid/PlaidButton";
import { getUser } from "../../../../state/userSlice";
import PlaidConnect from "../../../../components/plaid/PlaidConnect";

function Portfolio() {
    const isPlaidConnected: boolean = useAppSelector(state => state.user.user?.is_plaid_connected || false);

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
        AuthService.exchangePlaidPublicToken(publicToken)
            .then(() => dispatch(getUser()))
            .then(closePlaid);
    }

    return (
        <PageLayout headerText={isPlaidConnected ? "Portfolio" : undefined}>
            <PlaidConnect onSuccess={console.log} />
        </PageLayout>
    );
}

export default Portfolio;
