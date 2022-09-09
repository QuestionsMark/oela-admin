import { Dispatch } from "react";
import { SpecificationInterface } from "types";

import { Button } from "../common/Button";
import { SpecificationItemForm } from "./SpecificationItemForm";

import { FormAction } from "../../reducers/formReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface Props {
    value: SpecificationInterface[];
    dispatch: Dispatch<FormAction>;
}

export const SpecificationsForm = ({ value, dispatch }: Props) => {

    const specificationsList = () => {
        return value.map((s, i) => <SpecificationItemForm key={String(i)} index={i} specification={s} dispatch={dispatch} />);
    };

    return (
        <div className="form__section">
            <h3 className="form__title">Specyfikacje:</h3>
            <ul className="form__specifications-list" >
                {specificationsList()}
                <Button handler={() => dispatch({ type: "SPECIFICATIONS_ADD" })}><FontAwesomeIcon icon={faPlus} className="form__specifications-add-btn" /></Button>
            </ul>
        </div>
    );
};