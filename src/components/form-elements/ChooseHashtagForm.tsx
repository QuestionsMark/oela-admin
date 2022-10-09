import { Dispatch, useEffect, useRef, useState } from "react";
import { fetchApiTool } from "../../utils/fetchUtils";
import { HashtagInterface } from "types";
import { FormAction } from "../../reducers/formReducer";
import { Checkbox } from "./Checkbox";
import { usePopup } from "../../contexts/popupContext";

interface Props {
    value: string[];
    dispatch: Dispatch<FormAction>;
}

export const ChooseHashtagForm = ({ value, dispatch }: Props) => {

    const { setResponsePopup } = usePopup();

    const componentRef = useRef<HTMLUListElement>(null);

    const [hashtags, setHashtags] = useState<HashtagInterface[] | null>(null);

    const getHashtags = async () => {
        const response = await fetchApiTool('hashtag/form');
        if (!componentRef.current) return;
        if (!response.status) return setResponsePopup({ message: response.message, open: true, status: response.status });
        setHashtags(response.results as HashtagInterface[]);
    };

    const checkIsChecked = (id: string) => {
        return value.findIndex(h => h === id) !== -1;
    };

    const checkboxesList = () => {
        if (!hashtags) return null;
        return hashtags.map(h => <Checkbox key={h.id} actionType="HASHTAGS_CHANGE" checked={checkIsChecked(h.id)} option={h.name} value={h.id} dispatch={dispatch} />);
    };

    useEffect(() => {
        getHashtags();
    }, []);

    return (
        <div className="form__section">
            <h3 className="form__title">Hashtagi:</h3>
            <ul ref={componentRef} className="form__list form__checkbox-list">
                {checkboxesList() || 'Loading...'}
                {hashtags && hashtags.length === 0 && 'Brak hashtagów.'}
            </ul>
        </div>
    );
};