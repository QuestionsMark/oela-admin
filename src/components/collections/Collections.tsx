import { useCallback } from "react";

import { Search } from "../common/Search";
import { List } from "../common/List";
import { CollectionItem } from "./CollectionItem";

import { useSearch } from "../../hooks/useSearch";
import { CollectionInterface } from "types";
import { Loading } from "../common/Loading";
import { ShowFormButton } from "../common/ShowFormButton";
import { LIMIT_COLLECTION } from "../../utils/limitData";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

export const Collections = () => {
    const { amount, data, loading, hasMore, searchPhrase, page, handleSearchPhraseChange, setPage, refresh } = useSearch<CollectionInterface>('collection', 20);
    const { lastDataElementRef } = useInfiniteScroll(amount, hasMore, loading, page, LIMIT_COLLECTION, setPage);

    const items = useCallback(() => {
        return data.map((i, index) => {
            if (data.length === index + 1) return <CollectionItem key={i.id} refference={lastDataElementRef} collection={i} />;
            return <CollectionItem key={i.id} collection={i} />;
        })
    }, [data, lastDataElementRef]);

    return (
        <main className="main collections">
            <ShowFormButton model="COLLECTION" refresh={refresh} />
            <Search handleSearch={handleSearchPhraseChange} value={searchPhrase} />
            {loading ? <Loading /> : <section className="section">
                <List items={items()} limit={LIMIT_COLLECTION} />
            </section>}
        </main>
    );
};