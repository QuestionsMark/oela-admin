import { ValidationErrorsElement } from "./ValidationErrorsElement";

interface Props {
    errors: string[];
}

export const ValidationErrorsList = ({ errors }: Props) => {

    const errorsList = () => {
        return errors.map((e, i) => <ValidationErrorsElement key={String(i)} error={e} />);
    };

    return (
        <ul className="form__validation-list">
            {errorsList()}
        </ul>
    );
};