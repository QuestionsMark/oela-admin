import { Dispatch, FC, useEffect, useRef, useState } from "react";
import { fetchApiTool } from "../../utils/fetchUtils";
import { FormAction } from "../../reducers/formReducer";
import { OptionItemForm } from "./OptionItemForm";
import { ProductTypeInterface } from "types";
import { usePopup } from "../../contexts/popupContext";

interface ChooseProductTypeFormProps {
    value: string;
    dispatch: Dispatch<FormAction>;
}

export const ChooseProductTypeForm: FC<ChooseProductTypeFormProps> = ({ value, dispatch }) => {

    const { setResponsePopup } = usePopup();

    const componentRef = useRef(null);

    const [productTypes, setProductTypes] = useState<ProductTypeInterface[] | null>(null);

    const optionList = () => {
        if (!productTypes) return null;
        return productTypes.map(p => <OptionItemForm key={p.id} value={p.name} />);
    };

    const getHashtags = async () => {
        const response = await fetchApiTool('product-types');
        if (!componentRef.current) return;
        if (!response.status) return setResponsePopup({ message: response.message, open: true, status: response.status });
        setProductTypes(response.results as ProductTypeInterface[]);
    };

    useEffect(() => {
        getHashtags();
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