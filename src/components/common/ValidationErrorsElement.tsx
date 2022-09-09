interface Props {
    error: string;
}

export const ValidationErrorsElement = ({ error }: Props) => {
    return (
        <li className="form__validation-item">
            <small className="form__validation-info">{error}</small>
        </li>
    );
};