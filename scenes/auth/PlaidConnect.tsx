import React from 'react';
import { Box } from 'native-base';

import { useAppDispatch } from '../../state/hooks';
import { setAuthenticated } from '../../state/userSlice';
import PlaidCallToAction from '../../components/plaid/PlaidCallToAction';

function PlaidConnect() {
    const dispatch = useAppDispatch();

    const authenticate = () => dispatch(setAuthenticated(true));

    return (
        <Box safeAreaTop w="100%" h="100%" bgColor="dark.50">
            <PlaidCallToAction onSuccess={authenticate} onSkip={authenticate} />;
        </Box>
    );
}

export default PlaidConnect;