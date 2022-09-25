import React, {useState} from "react";
import _ from "lodash";
import {Box, Button, Center, Divider, HStack, Input, ScrollView, Spinner, Text, useTheme, VStack} from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import NewsService from "../../../services/NewsService";
import PageLayout from "../../../components/PageLayout";

function Search() {
    const { colors } = useTheme();

    const [searchMode, setSearchMode] = useState<'equity' | 'news'>('equity');
    const [searchResults, setSearchResults] = useState<any>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    console.log(searchResults);

    const onSearchChange = _.debounce((value: string) => {
        setLoading(true);
        NewsService.searchEntities(value)
            .then((response) => {
                setSearchResults(response.data);
                setLoading(false);
            });
    }, 50);

    const renderSelectorButton = (type: 'equity' | 'news', textValue: string) => {
        const onPress = () => setSearchMode(type);

        return (
            <Button
                bgColor={searchMode === type ? 'violet.700' : 'violet.400'}
                borderRadius="full"
                onPress={onPress}
                py={1}
            >
                {textValue}
            </Button>
        )
    }

    return (
        <PageLayout headerText="Search">
            <VStack space="sm">
                <Input
                    size="lg"
                    variant="outline"
                    placeholder="Search for news and equities..."
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={onSearchChange}
                    w="100%"
                    borderColor="light.200"
                    color="light.100"
                    _focus={{ borderColor: 'violet.500', }}
                    leftElement={
                        <Box ml={3}>
                            <FontAwesomeIcon icon={faSearch} color={colors.light["300"]} size={16} />
                        </Box>
                    }
                />
                <HStack space="sm">
                    {renderSelectorButton('equity', 'Equities')}
                    {renderSelectorButton('news', 'News')}
                </HStack>
                {loading ? (
                    <Center pt={20}><Spinner color="violet.500" /></Center>
                ) : (
                    <ScrollView>
                        {searchResults && searchResults.map((result: any) => (
                            <Box>
                                <VStack m={2}>
                                    <Text fontSize="md" fontWeight="bold" color="light.100">
                                        {result.symbol}
                                    </Text>
                                    <Text fontSize="sm" fontWeight="semibold" color="light.300">
                                        {result.name}
                                    </Text>
                                </VStack>
                                <Divider />
                            </Box>
                        ))}
                    </ScrollView>
                )}
            </VStack>
        </PageLayout>
    );
}

export default Search;
