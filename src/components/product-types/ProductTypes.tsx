import { useCallback, useRef, useState } from "react";

import { Search } from "../common/Search";
import { List } from "../common/List";
import { ProductTypeItem } from "./ProductTypeItem";

import { useSearch } from "../../hooks/useSearch";
import { ProductTypeInterface } from "types";
import { Loading } from "../common/Loading";
import { ShowFormButton } from "../common/ShowFormButton";

export const ProductTypes = () => {

    const [refreshData, setRefreshData] = useState(false);

    const { amount, data, loading, hasMore, searchPhrase, page, handleSearchPhraseChange, setPage } = useSearch<ProductTypeInterface>('product-types', 50, refreshData);

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
            if (data.length === index + 1) return <ProductTypeItem key={i.id} refference={lastDataElementRef} productType={i} refresh={refresh} />;
            return <ProductTypeItem key={i.id} productType={i} refresh={refresh} />;
        })
    }, [data, lastDataElementRef]);

    return (
        <main className="main product-types">
            <ShowFormButton model="PRODUCT_TYPE" refresh={refresh} />
            <Search handleSearch={handleSearchPhraseChange} value={searchPhrase} />
            {loading ? <Loading /> : <section className="section">
                <List items={items()} limit={50} />
            </section>}
        </main>
    );
};