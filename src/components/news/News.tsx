import { useCallback } from "react";

import { Search } from "../common/Search";
import { List } from "../common/List";
import { NewsItem } from "./NewsItem";

import { useSearch } from "../../hooks/useSearch";
import { NewsInterface } from "types";
import { Loading } from "../common/Loading";
import { ShowFormButton } from "../common/ShowFormButton";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { LIMIT_NEWS } from "../../utils/limitData";

export const News = () => {
    const { amount, data, loading, hasMore, searchPhrase, page, handleSearchPhraseChange, setPage, refresh } = useSearch<NewsInterface>('news', 20);
    const { lastDataElementRef } = useInfiniteScroll(amount, hasMore, loading, page, LIMIT_NEWS, setPage);

    const items = useCallback(() => {
        return data.map((i, index) => {
            if (data.length === index + 1) return <NewsItem key={i.id} refference={lastDataElementRef} news={i} />;
            return <NewsItem key={i.id} news={i} />;
        })
    }, [data, lastDataElementRef]);

    return (
        <main className="main news">
            <ShowFormButton model="NEWS" refresh={refresh} />
            <Search handleSearch={handleSearchPhraseChange} value={searchPhrase} />
            {loading ? <Loading /> : <section className="section">
                <List items={items()} limit={LIMIT_NEWS} />
            </section>}
        </main>
    );
};