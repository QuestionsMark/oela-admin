import { Dispatch } from "react";
import { FormAction } from "../../reducers/formReducer";
import { ImagePreview } from "../../react-types/form-types";
import { PreviewItem } from "./PreviewItem";

interface Props {
    preview: ImagePreview[];
    dispatch: Dispatch<FormAction>;
}

export const Preview = ({ preview, dispatch }: Props) => {

    const previewList = preview.map((p, i) => <PreviewItem key={p.src} preview={p} index={i} dispatch={dispatch} />);

    return (
        <>
            {preview.length !== 0 ? <div className="form__section">
                <h3 className="form__title">Podgląd:</h3>
                <ul className="form__preview image-preview">
                    {previewList}
                </ul>
            </div> : null}
        </>
    );
};