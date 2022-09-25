import { Box, Center, Divider, Heading, Link, Text, VStack } from 'native-base';
import React from 'react';
import FullScreenModal from '../FullScreenModal';
import PlaidButton from './PlaidButton';
import useModal from '../../hooks/useModal';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { getUser } from '../../state/userSlice';
import AuthService from '../../services/AuthService';

//@ts-ignore
import PlaidLink from "@burstware/expo-plaid-link";

interface ComponentProps {
    onSuccess: () => void;
    onSkip?: () => void;
}

function PlaidCallToAction({ onSuccess, onSkip }: ComponentProps) {
    const dispatch = useAppDispatch();

    const linkToken: string | undefined = useAppSelector(state => state.user.plaid_link_token);

    const { isOpen, open, close } = useModal();

    const onPlaidSuccess = (publicTokenResponse: { publicToken: string }) => {
        const publicToken = publicTokenResponse.publicToken;
        AuthService.exchangePlaidPublicToken(publicToken)
            .then(() => dispatch(getUser()))
            .then(close);
    }

    return (
        <>
            <Center h="100%">
                <VStack space="xl" display="flex" alignItems="center">
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
                    <PlaidButton onPress={open} />
                    {onSkip && (
                        <Link onPress={onSkip} isUnderlined={false} _text={{ color: 'light.100' }}>
                            Skip for now
                        </Link>
                    )}
                </VStack>
            </Center>
            {linkToken && (
                <FullScreenModal show={isOpen}>
                    <PlaidLink
                        linkToken={linkToken}
                        onSuccess={onPlaidSuccess}
                        onExit={close}
                    />
                </FullScreenModal>
            )}
        </>
    );
}

export default PlaidCallToAction;
