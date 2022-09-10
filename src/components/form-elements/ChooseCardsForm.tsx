import { Dispatch, useEffect, useRef, useState } from "react";
import { fetchApiTool } from "../../utils/fetchUtils";
import { FormAction } from "../../reducers/formReducer";
import { FilteredProductInterface, ProductInterface } from "types";
import { ChooseCardItem } from "./ChooseCardItem";
import { usePopup } from "../../contexts/popupContext";
import { useSearch } from "../../hooks/useSearch";

interface Props {
    value: string[];
    dispatch: Dispatch<FormAction>;
}

export const ChooseCardsForm = ({ value, dispatch }: Props) => {

    const { setResponsePopup } = usePopup();

    const componentRef = useRef<HTMLUListElement>(null);

    const { amount, data, handleSearchPhraseChange, hasMore, loading, page, searchPhrase, setPage } = useSearch<ProductInterface>('product', 20, false);

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
            <ul ref={componentRef} className="firm__list form__card-list">
                {cardsList() || 'Loading...'}
            </ul>
        </div>
    );
};