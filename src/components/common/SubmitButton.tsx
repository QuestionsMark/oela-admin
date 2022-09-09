interface Props {
    errors: number;
    value: string;
    className?: string;
}

export const SubmitButton = ({ errors, value, className }: Props) => {
    return <input type="submit" className={`form__submit${className ? ' ' + className : ''}`} value={value} disabled={errors !== 0} />;
};