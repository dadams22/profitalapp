import React from "react";
import {AspectRatio, Box, Center, Heading, HStack, Image, Pressable, Stack, Text} from "native-base";

interface ComponentProps {
    title: string;
    subtitle: string;
    imageUri: string;
    tag: string;
    description?: string;
    footerText: string;
    onPress?: () => void;
}

function FlatCard({ title, subtitle, imageUri, tag, description, footerText, onPress, }: ComponentProps) {
    return (
        <Pressable onPress={onPress}>
            <Box alignItems="center">
                <Box w="100%" overflow="hidden" borderRadius={10} shadow={4} backgroundColor="dark.100">
                    <Box>
                        <AspectRatio w="100%" ratio={16 / 9}>
                            <Image source={{ uri: imageUri }} alt="image" />
                        </AspectRatio>
                        {/*<Center bg="violet.500" _dark={{*/}
                        {/*    bg: "violet.400"*/}
                        {/*}} _text={{*/}
                        {/*    color: "warmGray.50",*/}
                        {/*    fontWeight: "700",*/}
                        {/*    fontSize: "xs"*/}
                        {/*}} position="absolute" bottom="0" px="3" py="1.5">*/}
                        {/*    PHOTOS*/}
                        {/*</Center>*/}
                    </Box>
                    <Stack p="4" space={3}>
                        <Stack space={2}>
                            <Heading size="md" ml="-1" color={'light.100'}>
                                {title}
                            </Heading>
                            <Text fontSize="xs" color={'violet.400'} fontWeight="500" ml="-0.5" mt="-1">
                                {subtitle}
                            </Text>
                        </Stack>
                        {!!description && (
                            <Text color="light.100" fontWeight="400">
                                {description}
                            </Text>
                        )}
                        {/*<HStack alignItems="center" space={4} justifyContent="space-between">*/}
                        {/*    <HStack alignItems="center">*/}
                        {/*        <Text color="coolGray.600" _dark={{*/}
                        {/*            color: "warmGray.200"*/}
                        {/*        }} fontWeight="400">*/}
                        {/*            6 mins ago*/}
                        {/*        </Text>*/}
                        {/*    </HStack>*/}
                        {/*</HStack>*/}
                    </Stack>
                </Box>
            </Box>
        </Pressable>
    );
}

export default FlatCard;