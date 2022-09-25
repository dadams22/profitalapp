import React from 'react';
import {Box, Heading, ScrollView} from "native-base";

interface ComponentProps {
    headerText?: string;
    children?: React.ReactNode;
}

function PageLayout({ headerText, children }: ComponentProps) {
    return (
        <ScrollView>
            <Box safeAreaTop px={4} py={8} bgColor="dark.50" minH="100%">
                {headerText && (
                    <Heading size="2xl" color="light.100" pb={4}>
                        {headerText}
                    </Heading>
                )}
                {children}
            </Box>
        </ScrollView>
    )
}

export default PageLayout;
