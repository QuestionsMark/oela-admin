import { Dispatch } from "react";
import { FormAction } from "../reducers/formReducer";

export interface ImagePreview {
    src: string;
    size: number;
    alt: string;
}

export interface StringFormProps {
    value: string;
    dispatch: Dispatch<FormAction>;
}