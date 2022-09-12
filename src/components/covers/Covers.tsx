import { useCallback } from "react";

import { CoverInterface } from "types";

import { List } from "../common/List";

import { useSearch } from "../../hooks/useSearch";
import { Loading } from "../common/Loading";
import { ShowFormButton } from "../common/ShowFormButton";
import { CoverItem } from "./CoverItem";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { LIMIT_COVER } from "../../utils/limitData";

export const Covers = () => {
    const { amount, data, loading, hasMore, page, setPage, refresh } = useSearch<CoverInterface>('cover', LIMIT_COVER);
    const { lastDataElementRef } = useInfiniteScroll(amount, hasMore, loading, page, LIMIT_COVER, setPage);

    const items = useCallback(() => {
        return data.map((i, index) => {
            if (data.length === index + 1) return <CoverItem key={i.id} refference={lastDataElementRef} cover={i} refresh={refresh} />;
            return <CoverItem key={i.id} cover={i} refresh={refresh} />;
        })
    }, [data, lastDataElementRef]);

    return (
        <main className="main covers">
            <ShowFormButton model="COVER" refresh={refresh} />
            {loading ? <Loading /> : <section className="list">
                <List items={items()} limit={LIMIT_COVER} />
            </section>}
        </main>
    );
};