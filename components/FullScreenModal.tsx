import React from "react";
import {Box} from "native-base";

interface ComponentProps{
    children: React.ReactNode;
}

function FullScreenModal({ children }: ComponentProps) {
    return (
        <Box
            safeAreaTop
            position="absolute"
            left={0}
            w="100%"
            h="100%"
            zIndex={999}
        >
            {children}
        </Box>
    )
}

export default FullScreenModal;