import { ChangeEvent } from "react";

interface Props {
    value: string;
    onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ProductTypeForm = ({ value, onChangeHandler }: Props) => {
    return (
        <div className="form__section">
            <h3 className="form__title">Nowy typ produktu:</h3>
            <input type="text" name="productType" value={value} onChange={onChangeHandler} placeholder="Typ produktu" className="form__inp" />
        </div>
    );
};