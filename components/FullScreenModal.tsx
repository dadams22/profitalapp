import React from "react";
import {Box, Slide} from "native-base";

interface ComponentProps{
    show: boolean;
    children: React.ReactNode;
}

function FullScreenModal({ show, children }: ComponentProps) {
    return (
        <Slide in={show} placement="bottom" duration={300}>
            <Box
            safeAreaTop
            position="absolute"
            top={0}
            left={0}
            bottom={0}
            right={0}
            zIndex={999}
            display="flex"
            >
                {children}
            </Box>
        </Slide>
    )
}

export default FullScreenModal;