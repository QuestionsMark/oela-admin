interface Props {
    value: string;
}

export const OptionItemForm = ({ value }: Props) => {
    return (
        <option value={value} className="form__option">{value}</option>
    );
};