import React, {useLayoutEffect, useState} from "react";
import {Box, FlatList, Heading, Spinner} from "native-base";

import FlatCard from "../../../components/FlatCard";
import NewsService, {Article} from "../../../services/NewsService";
import { openUrl } from "../../../state/webSlice";
import {useAppDispatch} from "../../../state/hooks";
import {timeSince} from "../../../util/time";


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
                renderItem={({ item: article }) => (
                    <Box px={4} pt={4}>
                        <FlatCard
                            key={article.uuid}
                            title={article.title}
                            subtitle={article.source}
                            imageUri={article.image_url}
                            description={article.description}
                            footerText={timeSince(article.published_at)}
                            tags={
                                article.entities
                                    .map(entity =>
                                        entity.holding_info?.institution_value && entity.holding_info?.quantity ?
                                            `${entity.symbol} - $${entity.holding_info.institution_value} (${entity.holding_info.quantity})`
                                            : entity.symbol
                                    )
                            }
                            onPress={() => dispatch(openUrl(
                                { url: article.url, title: article.title, subtitle: article.source, }
                                ))
                            }
                        />
                    </Box>
                )}
                ListFooterComponent={<Spinner size="lg" color="violet.500" my={20} />}
            />
        </Box>
    );
}

export default Feed;
