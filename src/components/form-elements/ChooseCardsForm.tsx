import { Dispatch, useRef } from "react";
import { FormAction } from "../../reducers/formReducer";
import { ProductInterface } from "types";
import { ChooseCardItem } from "./ChooseCardItem";
import { useSearch } from "../../hooks/useSearch";
import { LIMIT_PRODUCT_FOR_COLLECTION } from "../../utils/limitData";

interface Props {
    value: string[];
    dispatch: Dispatch<FormAction>;
}

export const ChooseCardsForm = ({ value, dispatch }: Props) => {
    const componentRef = useRef<HTMLUListElement>(null);

    const { data } = useSearch<ProductInterface>('product', LIMIT_PRODUCT_FOR_COLLECTION);

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