interface Props {
    option: string;
    value: string;
}

export const OptionItemForm = ({ option, value }: Props) => {
    return (
        <option value={value} className="form__option">{option}</option>
    );
};