import React from "react";
import {AspectRatio, Box, Heading, HStack, Image, Pressable, Stack, Text} from "native-base";

interface ComponentProps {
    title: string;
    subtitle: string;
    imageUri: string;
    tags: string[];
    description?: string;
    footerText: string;
    onPress?: () => void;
}

function FlatCard({ title, subtitle, imageUri, tags, description, footerText, onPress, }: ComponentProps) {
    return (
        <Pressable onPress={onPress}>
            <Box alignItems="center">
                <Box
                    w="100%"
                    overflow="hidden"
                    borderRadius={10}
                    shadow={4}
                    backgroundColor="dark.100"
                >
                    <Box position="relative">
                        <AspectRatio w="100%" ratio={16 / 9}>
                            <Image source={{ uri: imageUri }} alt="image" />
                        </AspectRatio>
                        {tags && (
                            <HStack
                                space="xs"
                                position="absolute"
                                bottom={0}
                                left={0}
                                m={2}
                            >
                                {tags.map((tag) => (
                                    <Box key={tag} bgColor="violet.700" borderRadius={'3xl'}>
                                        <Text
                                            color="light.100"
                                            fontWeight="bold"
                                            fontSize="xs"
                                            px={2}
                                            py={1}
                                        >
                                            {tag}
                                        </Text>
                                    </Box>
                                ))}
                            </HStack>
                        )}
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
                        <HStack alignItems="center">
                            <Text color="light.400" fontWeight="400">
                                {footerText}
                            </Text>
                        </HStack>
                    </Stack>
                </Box>
            </Box>
        </Pressable>
    );
}

export default FlatCard;