import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch } from "react";
import { SpecificationInterface } from "types";
import { FormAction } from "../../reducers/formReducer";

import { Button } from '../common/Button';

interface Props {
    index: number;
    specification: SpecificationInterface;
    dispatch: Dispatch<FormAction>;
}

export const SpecificationItemForm = ({ index, specification, dispatch }: Props) => {

    const { name, value } = specification;

    return (
        <li className="form__specifications-item">
            <input type="text" name="specificationName" value={name} onChange={(e) => dispatch({ type: "SPECIFICATIONS_CHANGE", payload: { index, type: "NAME", value: e.target.value } })} placeholder="Właściwość" className="form__inp" />
            <input type="text" name="specificationDescription" value={value} onChange={(e) => dispatch({ type: "SPECIFICATIONS_CHANGE", payload: { index, type: "DESCRIPTION", value: e.target.value } })} placeholder="Wartość" className="form__inp" />
            <Button handler={() => dispatch({ type: "SPECIFICATIONS_DELETE", payload: index })}>
                <FontAwesomeIcon icon={faMinus} className="form__specifications-delete-btn" />
            </Button>
        </li>
    );
};