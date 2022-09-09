import { StringFormProps } from "../../react-types/form-types";

export const ShopLinkForm = ({ value, dispatch }: StringFormProps) => {
    return (
        <div className="form__section">
            <h3 className="form__title">Link do sklepu:</h3>
            <input type="text" name="shopLink" value={value} onChange={(e) => dispatch({ type: "SHOP_LINK_CHANGE", payload: e.target.value })} placeholder="Link do sklepu" className="form__inp" />
        </div>
    );
};