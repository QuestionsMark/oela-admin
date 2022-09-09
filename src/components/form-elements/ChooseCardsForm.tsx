import { Dispatch, useEffect, useRef, useState } from "react";
import { fetchApiTool } from "../../utils/fetchUtils";
import { FormAction } from "../../reducers/formReducer";
import { FilteredProductInterface } from "types";
import { ChooseCardItem } from "./ChooseCardItem";
import { usePopup } from "../../contexts/popupContext";

interface Props {
    value: string[];
    dispatch: Dispatch<FormAction>;
}

export const ChooseCardsForm = ({ value, dispatch }: Props) => {

    const { setResponsePopup } = usePopup();

    const componentRef = useRef<HTMLUListElement>(null);

    const [cards, setCards] = useState<FilteredProductInterface[] | null>(null);
    const getCards = async () => {
        const response = await fetchApiTool('cards');
        if (!componentRef.current) return;
        if (!response.status) return setResponsePopup({ message: response.message, open: true, status: response.status });
        setCards(response.results as FilteredProductInterface[]);
    };

    const checkIsChecked = (id: string) => {
        return value.findIndex(c => c === id) !== -1;
    };

    const cardsList = () => {
        if (!cards) return;
        return cards.map(c => <ChooseCardItem key={c.id} checked={checkIsChecked(c.id)} value={c} dispatch={dispatch} />);
    };

    useEffect(() => {
        getCards();
    }, []);

    return (
        <div className="form__section">
            <h3 className="form__title">Kartki:</h3>
            <ul ref={componentRef} className="firm__list form__card-list">
                {cardsList() || 'Loading...'}
            </ul>
        </div>
    );
};