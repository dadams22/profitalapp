import React from "react";
import WebView from "react-native-webview";
import {Box, Pressable} from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

import {useAppDispatch} from "../state/hooks";
import {close} from "../state/webSlice";
import FullScreenModal from "./FullScreenModal";

interface ComponentProps {
    url: string;
}

function WebViewModal({ url }: ComponentProps) {
    const dispatch = useAppDispatch();

    const onRequestClose = () => dispatch(close());

    return (
        <FullScreenModal>
            <Box bgColor="dark.50" px={4} py={2}>
                <Pressable onPress={onRequestClose} alignSelf="flex-end">
                    <FontAwesomeIcon icon={faXmark} color="#fafaf9" size={24} />
                </Pressable>
            </Box>
            <WebView source={{ uri: url }} />
        </FullScreenModal>
    );
}

export default WebViewModal;
