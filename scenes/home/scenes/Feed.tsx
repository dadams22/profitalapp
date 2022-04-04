import React, {useLayoutEffect, useState} from "react";
import {Box, FlatList, Heading, Spinner} from "native-base";

import FlatCard from "../../../components/FlatCard";
import NewsService, {Article} from "../../../services/NewsService";
import { openUrl } from "../../../state/webSlice";
import {useAppDispatch} from "../../../state/hooks";


function Feed() {
    const dispatch = useAppDispatch();

    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [nextPage, setNextPage] = useState<number>(1);

    const fetchMoreArticles = () => {
        if (loading) {
            return;
        }

        setLoading(true);
        NewsService
            .getNews(nextPage)
            .then((responseData) => {
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
                    <Heading size="xl" color="light.100" mt={8} mx={4}>
                        Live Updates
                    </Heading>
                }
                renderItem={({ item: article }) => {console.log(article); return(
                    <Box px={4} pt={4}>
                        <FlatCard
                            key={article.uuid}
                            title={article.title}
                            subtitle={article.source}
                            imageUri={article.image_url}
                            description={article.description}
                            footerText={''}
                            tags={
                                article.entities
                                    .filter(entity => entity.type === 'equity' && !entity.symbol.includes('.'))
                                    .map(entity => entity.symbol)
                            }
                            onPress={() => dispatch(openUrl(article.url))}
                        />
                    </Box>
                )}}
                ListFooterComponent={<Spinner size="lg" color="violet.500" my={20} />}
            />
        </Box>
    );
}

export default Feed;
