import React from "react";
import WebView from "react-native-webview";
import {Box, Center, HStack, Pressable, Slide, Text, VStack} from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

import {useAppDispatch} from "../state/hooks";
import {close} from "../state/webSlice";
import FullScreenModal from "./FullScreenModal";

interface ComponentProps {
    url: string;
    title: string;
    subtitle: string;
}

function WebViewModal({ url, title, subtitle }: ComponentProps) {
    const dispatch = useAppDispatch();

    const onRequestClose = () => dispatch(close());

    return (
        <Slide in={!!url} placement="bottom" duration={300}>
            <FullScreenModal>
                <Box bgColor="dark.50" px={4} py={2}>
                    <HStack flexDirection="row" justifyContent="space-between" alignItems="center" w="100%">
                        <Box />
                        <VStack maxW={250} alignItems="center">
                            <Text fontSize="sm" fontWeight="semibold" color="light.100" numberOfLines={1}>
                                {title}
                            </Text>
                            <Text fontSize="xs" color="violet.500">
                                {subtitle}
                            </Text>
                        </VStack>
                        <Pressable onPress={onRequestClose}>
                            <FontAwesomeIcon icon={faXmark} color="#fafaf9" size={24} />
                        </Pressable>
                    </HStack>
                </Box>
                <WebView source={{ uri: url }} />
            </FullScreenModal>
        </Slide>
    );
}

export default WebViewModal;
