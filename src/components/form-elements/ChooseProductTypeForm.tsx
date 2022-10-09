import { Dispatch, useEffect, useRef, useState } from "react";
import { fetchApiTool } from "../../utils/fetchUtils";
import { FormAction } from "../../reducers/formReducer";
import { OptionItemForm } from "./OptionItemForm";
import { ProductTypeInterface } from "types";
import { usePopup } from "../../contexts/popupContext";

interface Props {
    value: string;
    dispatch: Dispatch<FormAction>;
}

export const ChooseProductTypeForm = ({ value, dispatch }: Props) => {

    const { setResponsePopup } = usePopup();

    const componentRef = useRef(null);

    const [productTypes, setProductTypes] = useState<ProductTypeInterface[] | null>(null);

    const optionList = () => {
        if (!productTypes) return null;
        return productTypes.map(p => <OptionItemForm key={p.id} option={p.name} value={p.id} />);
    };

    const getProductTypes = async () => {
        const response = await fetchApiTool<ProductTypeInterface[]>('product-type/form');
        if (!componentRef.current) return;
        if (!response.status) return setResponsePopup({ message: response.message, open: true, status: response.status });
        setProductTypes(response.results);
    };

    useEffect(() => {
        getProductTypes();
    }, []);

    return (
        <div className="form__section">
            <h3 className="form__title">Typ produktu:</h3>
            <select ref={componentRef} name="productType" value={value} onChange={(e) => dispatch({ type: "PRODUCT_TYPE_CHANGE", payload: e.target.value })} placeholder="Typ produktu" className="form__select">
                {optionList()}
                <option value='' className="form__option">brak</option>
            </select>
        </div>
    );
};