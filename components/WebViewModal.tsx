import React from "react";
import WebView from "react-native-webview";
import {Box, Container, Icon, Link, Pressable, Text, View} from "native-base";
import {useAppDispatch} from "../state/hooks";
import {close} from "../state/webSlice";
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

interface ComponentProps {
    url: string;
}

function WebViewModal({ url }: ComponentProps) {
    const dispatch = useAppDispatch();

    const onRequestClose = () => dispatch(close());

    return (
        <Box
            safeAreaTop
            position="absolute"
            left={0}
            w="100%"
            h="100%"
            zIndex={999}
        >
            <Box bgColor="dark.50" px={4} py={2}>
                <Pressable onPress={onRequestClose} alignSelf="flex-end">
                    <FontAwesomeIcon icon={faXmark} color="#fafaf9" size={24} />
                </Pressable>
            </Box>
            <WebView source={{ uri: url }} />
        </Box>
    );
}

export default WebViewModal;
