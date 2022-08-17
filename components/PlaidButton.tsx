import React from 'react';
import {Box, Button, HStack, Text} from "native-base";
import PlaidIcon from "./icons/PlaidIcon";

interface ComponentProps {
    onPress: () => void;
}

function PlaidButton({ onPress }: ComponentProps) {
    return (
        <Button onPress={onPress} bgColor="light.50" color="light.900">
            <HStack display="flex" alignItems="center" space="sm">
                <PlaidIcon />
                <Text color="black" bold fontSize="xl">
                    Connect your Account
                </Text>
            </HStack>
        </Button>
    );
}

export default PlaidButton