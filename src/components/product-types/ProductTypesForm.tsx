import { Dispatch, FormEvent, useEffect, useReducer, useState } from "react";

import { SubmitButton } from "../common/SubmitButton";
import { ValidationErrorsList } from "../common/ValidationErrorsList";
import { NameForm } from "../form-elements/NameForm";

import { usePopup } from "../../contexts/popupContext";
import { FormAction, formReducer } from "../../reducers/formReducer";
import { fetchTool } from "../../utils/fetchUtils";
import { getServerMessage } from "../../utils/getServerMessage";
import { checkProductTypeValidation } from "../../utils/validation";

interface Props {
    close: () => void;
}

export interface ProductTypeElement {
    name: string;
}

export const defaultProductType: ProductTypeElement = {
    name: '',
}

export const ProductTypesForm = ({ close }: Props) => {

    const { setResponsePopup } = usePopup();

    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [productType, dispatch] = useReducer(formReducer, defaultProductType) as [ProductTypeElement, Dispatch<FormAction>];

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (validationErrors.length !== 0) return;
        setResponsePopup({ message: 'Wysyłanie...', status: true, open: true });
        dispatch({ type: 'NAME_CHANGE', payload: '' });
        const response = await fetchTool('product-type', 'POST', productType);
        if (!response.status) return setResponsePopup({ message: getServerMessage(response.message, response.problems), status: response.status, open: true });
        setResponsePopup({ message: response.message, status: response.status, open: true });
        close();
    };

    useEffect(() => {
        setValidationErrors(checkProductTypeValidation(productType));
    }, [productType]);

    return (
        <form className="form" onSubmit={handleSubmit}>
            <NameForm value={productType.name} dispatch={dispatch} />
            <ValidationErrorsList errors={validationErrors} />
            <SubmitButton errors={validationErrors.length} value="Dodaj nowy typ produktu" />
        </form>
    );
};