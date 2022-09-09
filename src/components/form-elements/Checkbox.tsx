import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";

type ActionType = 'CARDS_CHANGE' | 'HASHTAGS_CHANGE';

interface Props {
    value: string;
    checked: boolean;
    dispatch: Dispatch<FormAction>;
    actionType: ActionType;
}

export const Checkbox = ({ actionType, checked, value, dispatch }: Props) => {
    return (
        <li className="form__checkbox-item">
            <label className="form__checkbox-label">
                <input id="checkbox" type="checkbox" value={value} checked={checked} onChange={(e) => dispatch({ type: actionType, payload: e.target.value })} className="form__checkbox" />
                <div className="checkbox">{checked ? <FontAwesomeIcon icon={faSquareCheck} className="checkbox__icon" /> : null}</div>
                {value}
            </label>
        </li>
    );
};