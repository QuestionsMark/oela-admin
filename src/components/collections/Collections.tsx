import { useCallback, useRef, useState } from "react";

import { Search } from "../common/Search";
import { List } from "../common/List";
import { CollectionItem } from "./CollectionItem";

import { useSearch } from "../../hooks/useSearch";
import { CollectionInterface } from "types";
import { Loading } from "../common/Loading";
import { ShowFormButton } from "../common/ShowFormButton";

export const Collections = () => {

    const [refreshData, setRefreshData] = useState(false);

    const { amount, data, loading, hasMore, searchPhrase, page, handleSearchPhraseChange, setPage } = useSearch<CollectionInterface>('collections', 20, refreshData);

    const observer = useRef<IntersectionObserver>();
    const lastDataElementRef = useCallback(node => {
        if (loading || amount < page * 20) return;
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    const items = useCallback(() => {
        return data.map((i, index) => {
            if (data.length === index + 1) return <CollectionItem key={i.id} refference={lastDataElementRef} collection={i} />;
            return <CollectionItem key={i.id} collection={i} />;
        })
    }, [data, lastDataElementRef]);

    const refresh = () => {
        setRefreshData(prev => !prev);
        setPage(1);
    };

    return (
        <main className="main collections">
            <ShowFormButton model="COLLECTION" refresh={refresh} />
            <Search handleSearch={handleSearchPhraseChange} value={searchPhrase} />
            {loading ? <Loading /> : <section className="section">
                <List items={items()} limit={20} />
            </section>}
        </main>
    );
};