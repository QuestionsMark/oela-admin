import { Dispatch } from "react";
import Popup from "reactjs-popup";
import { HOST_ADDRESS } from "../../config";
import { ProductInterface } from "types";
import { FormAction } from "../../reducers/formReducer";
import { Image } from "../common/Image";

interface Props {
    value: ProductInterface;
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
                    onClick={() => dispatch({ type: "CARDS_CHANGE", payload: id })}
                >
                    <Image alt={images[0].alt} src={images[0].id} />
                </li>
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