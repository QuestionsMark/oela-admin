import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Model } from 'types';

import { CloseButton } from "./CloseButton";
import { CollectionForm } from "../collections/CollectionForm";
import { ProductTypesForm } from "../product-types/ProductTypesForm";
import { HashtagForm } from "../hashtags/HashtagForm";
import { NewsForm } from "../news/NewsForm";
import { ProductForm } from "../products/ProductForm";
import { CoverForm } from "../covers/CoverForm";

interface Props {
    trigger: JSX.Element;
    model: Model;
    refresh: () => void;
}

export const PopupForm = ({ model, trigger, refresh }: Props) => {

    const getForm = (close: () => void) => {
        switch (model) {
            case 'COVER':
                return <CoverForm close={close} />;

            case 'COLLECTION':
                return <CollectionForm close={close} />;

            case 'HASHTAG':
                return <HashtagForm close={close} />;

            case 'NEWS':
                return <NewsForm close={close} />;

            case 'PRODUCT':
                return <ProductForm close={close} />;

            case 'PRODUCT_TYPE':
                return <ProductTypesForm close={close} />;

            default:
                break;
        }
    };

    const closePopupForm = (close: () => void) => {
        refresh();
        close();
    };

    return (
        <Popup modal trigger={trigger} closeOnDocumentClick={false} className="modal-popup modal-popup--form">
            {(close: () => void) => (
                <div className="popup__form">
                    <CloseButton handler={close}>
                        <FontAwesomeIcon icon={faXmark} className="btn--close-icon" />
                    </CloseButton>
                    <div className="popup__content">
                        {getForm(() => closePopupForm(close))}
                    </div>
                </div>
            )}
        </Popup>
    );
};