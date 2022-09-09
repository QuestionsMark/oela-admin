import { StringFormProps } from "../../react-types/form-types";

export const DescriptionForm = ({ value, dispatch }: StringFormProps) => {
    return (
        <div className="form__section">
            <h3 className="form__title">Opis:</h3>
            <textarea name="description" value={value} onChange={(e) => dispatch({ type: "DESCRIPTION_CHANGE", payload: e.target.value })} placeholder="Opis" className="form__textarea" />
        </div>
    );
};