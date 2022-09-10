import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { PopupForm } from "./PopupForm";
import { Model } from "types";

interface Props {
    model: Model;
    refresh: () => void;
}

export const ShowFormButton = ({ model, refresh }: Props) => {
    return <PopupForm refresh={refresh} model={model} trigger={<FontAwesomeIcon icon={faPlus} className="add-btn show-scale-animation" />} />
};