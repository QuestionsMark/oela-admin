import { Img, Model } from "types";
import { SavedImageItem } from "./SavedImageItem";

interface Props {
    id: string;
    images: Img[];
    model: Model;
    refresh: () => Promise<void>;
}

export const SavedImages = ({ id, images, model, refresh }: Props) => {

    const imagesList = () => {
        return images.map(i => <SavedImageItem key={i.id} id={id} image={i} model={model} refresh={refresh} />);
    };

    return (
        <div className="edit__section saved-images section-animation">
            <h3 className="form__title saved-images__title">Obecne grafiki:</h3>
            <ul className="saved-images__list">
                {imagesList()}
            </ul>
        </div>
    );
};