import React, {useEffect, useState} from "react";
import {Box, Button, Center, Divider, Heading, Text, VStack} from "native-base";
import {noop} from "lodash";
import AuthService from "../../../../services/AuthService";
import useModal from "../../../../hooks/useModal";
import FullScreenModal from "../../../../components/FullScreenModal";
import {useAppDispatch, useAppSelector} from "../../../../state/hooks";
import {getHoldings} from "../../../../state/portfolioSlice";
import PageLayout from "../../../../components/PageLayout";
import { getUser } from "../../../../state/userSlice";
import PlaidConnect from "../../../../components/plaid/PlaidCallToAction";

function Portfolio() {
    const isPlaidConnected: boolean = useAppSelector(state => state.user.user?.is_plaid_connected || false);

    const dispatch = useAppDispatch();

    const holdings = useAppSelector(state => state.portfolio.holdings);

    const [linkToken, setLinkToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        AuthService.obtainPlaidLinkToken().then(setLinkToken);
        dispatch(getHoldings());
    }, []);

    return (
        <PageLayout headerText={isPlaidConnected ? "Portfolio" : undefined}>
            <PlaidConnect onSuccess={console.log} />
        </PageLayout>
    );
}

export default Portfolio;
