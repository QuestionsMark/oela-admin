import { useCallback } from "react";

import { Search } from "../common/Search";
import { List } from "../common/List";
import { ProductTypeItem } from "./ProductTypeItem";

import { useSearch } from "../../hooks/useSearch";
import { ProductTypeInterface } from "types";
import { Loading } from "../common/Loading";
import { ShowFormButton } from "../common/ShowFormButton";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { LIMIT_PRODUCT_TYPE } from "../../utils/limitData";

export const ProductTypes = () => {
    const { amount, data, loading, hasMore, searchPhrase, page, handleSearchPhraseChange, setPage, refresh } = useSearch<ProductTypeInterface>('product-type', 50);
    const { lastDataElementRef } = useInfiniteScroll(amount, hasMore, loading, page, LIMIT_PRODUCT_TYPE, setPage);
    
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
                <List items={items()} limit={LIMIT_PRODUCT_TYPE} />
            </section>}
        </main>
    );
};