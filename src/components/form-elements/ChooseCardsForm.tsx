import { Dispatch, useRef } from "react";
import { FormAction } from "../../reducers/formReducer";
import { ProductInterface } from "types";
import { ChooseCardItem } from "./ChooseCardItem";
import { useSearch } from "../../hooks/useSearch";
import { LIMIT_PRODUCT_FOR_COLLECTION } from "../../utils/limitData";
import { Search } from "../common/Search";
import { Button } from "../common/Button";
import { Loading } from "../common/Loading";

interface Props {
    value: string[];
    dispatch: Dispatch<FormAction>;
}

export const ChooseCardsForm = ({ value, dispatch }: Props) => {
    const componentRef = useRef<HTMLUListElement>(null);

    const {
        amount,
        data,
        handleSearchPhraseChange,
        loading,
        page,
        searchPhrase,
        setPage,
    } = useSearch<ProductInterface>('product', LIMIT_PRODUCT_FOR_COLLECTION, true);

    const checkIsChecked = (id: string) => {
        return value.findIndex(c => c === id) !== -1;
    };

    const cardsList = () => {
        if (!data) return;
        return data.map(c => <ChooseCardItem key={c.id} checked={checkIsChecked(c.id)} value={c} dispatch={dispatch} />);
    };

    return (
        <div className="form__section">
            <h3 className="form__title">Produkty:</h3>
            <div className="form__card-list-search">
                <Search handleSearch={handleSearchPhraseChange} value={searchPhrase} />
                <Button
                    className="form__card-list-search-btn"
                    disabled={amount - page * LIMIT_PRODUCT_FOR_COLLECTION <= 0 || loading}
                    handler={() => setPage(state => state + 1)}
                >
                    Załaduj więcej
                </Button>
            </div>
            <ul ref={componentRef} className="firm__list form__card-list">
                {cardsList()}
                {loading && <Loading className="loading--green" />}
            </ul>
            <Button
                className="form__more-btn"
                disabled={amount - page * LIMIT_PRODUCT_FOR_COLLECTION <= 0 || loading}
                handler={() => setPage(state => state + 1)}
            >
                Załaduj więcej
            </Button>
        </div>
    );
};