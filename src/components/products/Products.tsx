import { useCallback } from "react";

import { Search } from "../common/Search";
import { List } from "../common/List";
import { ProductItem } from "./ProductItem";

import { useSearch } from "../../hooks/useSearch";
import { ProductInterface } from "types";
import { Loading } from "../common/Loading";
import { ShowFormButton } from "../common/ShowFormButton";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { LIMIT_PRODUCT } from "../../utils/limitData";

export const Products = () => {
    const { amount, data, loading, hasMore, searchPhrase, page, setPage, handleSearchPhraseChange, refresh } = useSearch<ProductInterface>('product', 20);
    const { lastDataElementRef } = useInfiniteScroll(amount, hasMore, loading, page, LIMIT_PRODUCT, setPage);

    const items = useCallback(() => {
        return data.map((i, index) => {
            if (data.length === index + 1) return <ProductItem key={i.id} refference={lastDataElementRef} product={i} />;
            return <ProductItem key={i.id} product={i} />;
        })
    }, [data, lastDataElementRef]);

    return (
        <main className="main products">
            <ShowFormButton model="PRODUCT" refresh={refresh} />
            <Search handleSearch={handleSearchPhraseChange} value={searchPhrase} />
            {loading ? <Loading /> : <section className="section">
                <List items={items()} limit={LIMIT_PRODUCT} />
            </section>}
        </main>
    );
};