import { Dispatch, FormEvent, useEffect, useMemo, useReducer, useState } from "react";
import { SpecificationInterface } from "types";
import { ImagePreview } from "../../react-types/form-types";

import { ImagesForm } from "../form-elements/ImagesForm";
import { Preview } from "../form-elements/Preview";
import { NameForm } from '../form-elements/NameForm';
import { DescriptionForm } from "../form-elements/DescriptionForm";
import { ShopLinkForm } from "../form-elements/ShopLinkForm";
import { SpecificationsForm } from "../form-elements/SpecificationsForm";
import { ChooseProductTypeForm } from "../form-elements/ChooseProductTypeForm";
import { ValidationErrorsList } from "../common/ValidationErrorsList";
import { SubmitButton } from "../common/SubmitButton";

import { checkProductValidation } from "../../utils/validation";
import { fetchWithFileUpload } from "../../utils/fetchUtils";
import { usePopup } from "../../contexts/popupContext";
import { FormAction, formReducer } from "../../reducers/formReducer";
import { getServerMessage } from "../../utils/getServerMessage";

interface Props {
    close: () => void;
}

export interface ProductElement {
    shopLink: string;
    name: string;
    description: string;
    specifications: SpecificationInterface[];
    productType: string;
    images: File[] | null;
    preview: ImagePreview[];
}

export const defaultProduct: ProductElement = {
    name: '',
    description: '',
    productType: '',
    shopLink: '',
    specifications: [],
    images: null,
    preview: [],
}

export const ProductForm = ({ close }: Props) => {

    const { setResponsePopup } = usePopup();

    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [product, dispatch] = useReducer(formReducer, defaultProduct) as [ProductElement, Dispatch<FormAction>];

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (validationErrors.length !== 0) return;
        const data = new FormData();
        for (const img of product.images as File[]) {
            data.append('img', img);
        }
        data.append('data', JSON.stringify({
            ...product,
            images: product.preview.map(p => ({ alt: p.alt })),
        }));
        setResponsePopup({ message: 'Wysyłanie...', status: true, open: true });
        dispatch({ type: 'FORM_SET', payload: defaultProduct });
        const response = await fetchWithFileUpload('products', 'POST', data);
        if (!response.status) return setResponsePopup({ message: getServerMessage(response.message, response.problems), status: response.status, open: true });
        setResponsePopup({ message: response.message, status: response.status, open: true });
        close();
    };

    const imagesFormComponent = useMemo(() => <ImagesForm dispatch={dispatch} />, []);
    const previewFormComponent = useMemo(() => <Preview preview={product.preview} dispatch={dispatch} />, [product.preview]);
    const nameFormComponent = useMemo(() => <NameForm value={product.name} dispatch={dispatch} />, [product.name]);
    const descriptionFormComponent = useMemo(() => <DescriptionForm value={product.description} dispatch={dispatch} />, [product.description]);
    const shopLinkFormComponent = useMemo(() => <ShopLinkForm value={product.shopLink} dispatch={dispatch} />, [product.shopLink]);
    const productTypeFormComponent = useMemo(() => <ChooseProductTypeForm value={product.productType} dispatch={dispatch} />, [product.productType]);
    const specificationsFormComponent = useMemo(() => <SpecificationsForm value={product.specifications} dispatch={dispatch} />, [product.specifications]);

    useEffect(() => {
        setValidationErrors(checkProductValidation(product));
    }, [product]);

    return (
        <form className="form" onSubmit={handleSubmit}>
            {imagesFormComponent}
            {previewFormComponent}
            {nameFormComponent}
            {descriptionFormComponent}
            {shopLinkFormComponent}
            {productTypeFormComponent}
            {specificationsFormComponent}
            <ValidationErrorsList errors={validationErrors} />
            <SubmitButton errors={validationErrors.length} value="Dodaj produkt" />
        </form>
    );
};