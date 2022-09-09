import { useCallback, useRef, useState } from "react";

import { HashtagInterface } from "types";

import { List } from "../common/List";
import { Search } from "../common/Search";
import { HashtagItem } from "./HashtagItem";

import { useSearch } from "../../hooks/useSearch";
import { Loading } from "../common/Loading";
import { ShowFormButton } from "../common/ShowFormButton";

export const Hashtags = () => {

    const [refreshData, setRefreshData] = useState(false);

    const { amount, data, loading, hasMore, searchPhrase, page, handleSearchPhraseChange, setPage } = useSearch<HashtagInterface>('hashtags', 50, refreshData);

    const observer = useRef<IntersectionObserver>();
    const lastDataElementRef = useCallback(node => {
        if (loading || amount < page * 50) return;
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    const refresh = () => {
        setPage(1);
        setRefreshData(prev => !prev);
    };

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
                <List items={items()} limit={50} />
            </section>}
        </main>
    );
};