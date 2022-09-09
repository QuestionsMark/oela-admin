import { Dispatch } from "react";
import Popup from "reactjs-popup";
import { HOST_ADDRESS } from "../../config";
import { FilteredProductInterface } from "types";
import { FormAction } from "../../reducers/formReducer";

interface Props {
    value: FilteredProductInterface;
    checked: boolean;
    dispatch: Dispatch<FormAction>;
}

export const ChooseCardItem = ({ checked, value, dispatch }: Props) => {

    const { id, images, name } = value;

    return (
        <Popup
            trigger={
                <li
                    className={`form__card-item${checked ? ' active' : ''}`}
                    style={{ backgroundImage: `url(${HOST_ADDRESS}/images/${images[0].id})` }}
                    onClick={() => dispatch({ type: "CARDS_CHANGE", payload: id })}
                />
            }
            mouseEnterDelay={0}
            mouseLeaveDelay={0}
            on="hover"
            position="top center"
            className="normal-popup"
        >
            {name}
        </Popup>
    );
};