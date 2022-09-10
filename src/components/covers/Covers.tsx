import { useCallback, useRef, useState } from "react";

import { CoverInterface } from "types";

import { List } from "../common/List";

import { useSearch } from "../../hooks/useSearch";
import { Loading } from "../common/Loading";
import { ShowFormButton } from "../common/ShowFormButton";
import { CoverItem } from "./CoverItem";

export const Covers = () => {

    const [refreshData, setRefreshData] = useState(false);

    const { amount, data, loading, hasMore, page, setPage } = useSearch<CoverInterface>('cover', 10, refreshData);

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
            if (data.length === index + 1) return <CoverItem key={i.id} refference={lastDataElementRef} cover={i} refresh={refresh} />;
            return <CoverItem key={i.id} cover={i} refresh={refresh} />;
        })
    }, [data, lastDataElementRef]);

    return (
        <main className="main covers">
            <ShowFormButton model="COVER" refresh={refresh} />
            {loading ? <Loading /> : <section className="list">
                <List items={items()} limit={50} />
            </section>}
        </main>
    );
};