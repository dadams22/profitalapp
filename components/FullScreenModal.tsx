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
            top={0}
            left={0}
            bottom={0}
            right={0}
            zIndex={999}
        >
            {children}
        </Box>
    )
}

export default FullScreenModal;