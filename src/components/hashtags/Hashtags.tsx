import { useCallback } from "react";

import { HashtagInterface } from "types";

import { List } from "../common/List";
import { Search } from "../common/Search";
import { HashtagItem } from "./HashtagItem";

import { useSearch } from "../../hooks/useSearch";
import { Loading } from "../common/Loading";
import { ShowFormButton } from "../common/ShowFormButton";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { LIMIT_HASHTAG } from "../../utils/limitData";

export const Hashtags = () => {
    const { amount, data, loading, hasMore, searchPhrase, page, handleSearchPhraseChange, setPage, refresh } = useSearch<HashtagInterface>('hashtag', LIMIT_HASHTAG);
    const { lastDataElementRef } = useInfiniteScroll(amount, hasMore, loading, page, LIMIT_HASHTAG, setPage);

    const items = useCallback(() => {
        return data.map((i, index) => {
            if (data.length === index + 1) return <HashtagItem key={i.id} refference={lastDataElementRef} hashtag={i} refresh={refresh} />;
            return <HashtagItem key={i.id} hashtag={i} refresh={refresh} />;
        })
    }, [data, lastDataElementRef]);

    return (
        <main className="main hashtags">
            <ShowFormButton model="HASHTAG" refresh={refresh} />
            <Search handleSearch={handleSearchPhraseChange} value={searchPhrase} />
            {loading ? <Loading /> : <section className="list">
                <List items={items()} limit={LIMIT_HASHTAG} />
            </section>}
        </main>
    );
};