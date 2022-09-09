import { StringFormProps } from "../../react-types/form-types";

export const NameForm = ({ value, dispatch }: StringFormProps) => {
    return (
        <div className="form__section">
            <h3 className="form__title">Nazwa:</h3>
            <input type="text" name="name" value={value} onChange={(e) => dispatch({ type: "NAME_CHANGE", payload: e.target.value })} placeholder="Nazwa" className="form__inp" />
        </div>
    );
};