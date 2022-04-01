import React, {useEffect, useLayoutEffect, useState} from "react";
import FlatCard from "../../../components/FlatCard";
import NewsService, {Article} from "../../../services/NewsService";
import {Box, Center, Divider, FlatList, Heading, ScrollView, Spinner, VStack} from "native-base";
import { openUrl } from "../../../state/webSlice";
import {useAppDispatch} from "../../../state/hooks";
import AuthService from "../../../services/AuthService";



function Feed() {
    const dispatch = useAppDispatch();

    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [nextPage, setNextPage] = useState<number>(1);

    console.log(articles);

    const fetchMoreArticles = () => {
        if (loading) {
            return;
        }

        setLoading(true);
        NewsService
            .getInstance()
            .getNews(nextPage)
            .then((responseData) => {
                console.log(responseData.data);
                setArticles([...articles, ...responseData.data])
                setLoading(false);
                setNextPage(nextPage + 1);
            });
    }

    useLayoutEffect(() => {
        fetchMoreArticles();
    }, []);

    return (
        <Box safeAreaTop bgColor="dark.50">
            <FlatList
                data={articles}
                bgColor={'dark.50'}
                minH="100%"
                contentContainerStyle={{ flexGrow: 1, }}
                keyExtractor={article => article.uuid}
                onEndReached={fetchMoreArticles}
                ListHeaderComponent={
                    // <VStack>
                    //     <Center w="100%" p={4}>
                            <Heading size="xl" color="light.100" mt={8} mx={4}>
                                Live Updates
                            </Heading>
                    //     </Center>
                    //     <Divider bg="light.50" />
                    // </VStack>
                }
                renderItem={({ item: article }) => (
                    <Box px={4} pt={4}>
                        <FlatCard
                            key={article.uuid}
                            title={article.title}
                            subtitle={article.source}
                            imageUri={article.image_url}
                            description={article.description}
                            footerText={''}
                            tag={''}
                            onPress={() => dispatch(openUrl(article.url))}
                        />
                    </Box>
                )}
                ListFooterComponent={<Spinner size="lg" color="violet.500" my={20} />}
            />
        </Box>
    );
}

export default Feed;
