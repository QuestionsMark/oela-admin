import { Dispatch, FormEvent, useEffect, useMemo, useReducer, useState } from "react";
import { ProductInterface } from "types";

import { ImagesForm } from "../form-elements/ImagesForm";
import { Preview } from "../form-elements/Preview";
import { NameForm } from '../form-elements/NameForm';
import { DescriptionForm } from "../form-elements/DescriptionForm";
import { ShopLinkForm } from "../form-elements/ShopLinkForm";
import { SpecificationsForm } from "../form-elements/SpecificationsForm";
import { ChooseProductTypeForm } from "../form-elements/ChooseProductTypeForm";
import { ValidationErrorsList } from "../common/ValidationErrorsList";
import { SubmitButton } from "../common/SubmitButton";

import { fetchWithFileUpload } from "../../utils/fetchUtils";
import { checkEditProductValidation } from "../../utils/validation";
import { getServerMessage } from "../../utils/getServerMessage";
import { usePopup } from "../../contexts/popupContext";
import { FormAction, formReducer } from "../../reducers/formReducer";
import { defaultProduct, ProductElement } from "./ProductForm";
import { ChooseHashtagForm } from "../form-elements/ChooseHashtagForm";

interface Props {
    data: ProductInterface;
    id: string;
    refresh: () => Promise<void>;
}

export const ProductEditForm = ({ data, id, refresh }: Props) => {

    const { setResponsePopup } = usePopup();

    const [product, dispatch] = useReducer(formReducer, defaultProduct) as [ProductElement, Dispatch<FormAction>];
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (validationErrors.length !== 0) return;
        const data = new FormData();
        if (product.images) {
            for (const img of product.images as File[]) {
                data.append('image', img);
            }
        }
        data.append('data', JSON.stringify((({ images, ...o }) => o)({
            ...product,
            preview: product.preview.map(p => ({ alt: p.alt })),
        })));
        setResponsePopup({ message: 'Wysyłanie...', status: true, open: true });
        const response = await fetchWithFileUpload(`product/${id}`, 'PUT', data);
        if (!response.status) return setResponsePopup({ message: getServerMessage(response.message, response.problems), status: response.status, open: true });
        setResponsePopup({ message: response.message, status: response.status, open: true });
        dispatch({ type: "IMAGES_CHANGE", payload: null });
        refresh();
    };

    const imagesFormComponent = useMemo(() => <ImagesForm dispatch={dispatch} />, []);
    const previewFormComponent = useMemo(() => <Preview preview={product.preview} dispatch={dispatch} />, [product.preview]);
    const nameFormComponent = useMemo(() => <NameForm value={product.name} dispatch={dispatch} />, [product.name]);
    const descriptionFormComponent = useMemo(() => <DescriptionForm value={product.description} dispatch={dispatch} />, [product.description]);
    const shopLinkFormComponent = useMemo(() => <ShopLinkForm value={product.shopLink} dispatch={dispatch} />, [product.shopLink]);
    const productTypeFormComponent = useMemo(() => <ChooseProductTypeForm value={product.productType} dispatch={dispatch} />, [product.productType]);
    const chooseHashtagFormComponent = useMemo(() => <ChooseHashtagForm value={product.hashtags} dispatch={dispatch} />, [product.hashtags]);
    const specificationsFormComponent = useMemo(() => <SpecificationsForm value={product.specifications} dispatch={dispatch} />, [product.specifications]);

    useEffect(() => {
        setValidationErrors(checkEditProductValidation(product, { ...data, specifications: data.specifications.map(({ value, name }) => ({ value, name, id: '' })) }));
    }, [product, data]);

    useEffect(() => {
        if (!data) return;
        dispatch({
            type: "FORM_SET",
            payload: (({ id, ...o }) => o)({
                ...data,
                images: null,
                preview: [],
                specifications: data.specifications.map(({ value, name }) => ({ value, name })),
                hashtags: data.hashtags.map(h => h.id),
                productType: data.productType.id,
            }),
        });
    }, [data]);

    return (
        <form className="form" onSubmit={handleSubmit}>
            {imagesFormComponent}
            {previewFormComponent}
            {nameFormComponent}
            {descriptionFormComponent}
            {shopLinkFormComponent}
            {productTypeFormComponent}
            {chooseHashtagFormComponent}
            {specificationsFormComponent}
            <ValidationErrorsList errors={validationErrors} />
            <SubmitButton errors={validationErrors.length} value={'Aktualizuj produkt'} />
        </form>
    );
};