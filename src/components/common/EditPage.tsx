import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePopup } from "../../contexts/popupContext";
import { fetchApiTool, fetchTool } from "../../utils/fetchUtils";
import { DeleteButton } from "../common/DeleteButton";
import { ProductEditForm } from "../products/ProductEditForm";
import { SavedImages } from "../form-elements/SavedImages";
import { Model } from "./PopupForm";
import { getModel } from "../../utils/getModel";
import { CollectionEditForm } from "../collections/CollectionEditForm";
import { NewsEditForm } from "../news/NewsEditForm";
import { Loading } from "./Loading";
import { CollectionInterface, NewsInterface, ProductInterface, ClientResponse } from "types";

interface Props {
    model: Model;
}

type Data = CollectionInterface | NewsInterface | ProductInterface;

export const EditPage = ({ model }: Props) => {

    const { id } = useParams();
    const navigation = useNavigate();
    const { setResponsePopup } = usePopup();

    const componentRef = useRef<HTMLDivElement>(null);

    const [data, setData] = useState<Data | undefined>(undefined)

    const getButtonValue = () => {
        switch (model) {
            case 'CARD':
                return 'Usuń kartkę';

            case 'COLLECTION':
                return 'Usuń kolekcję';

            case 'NEWS':
                return 'Usuń nowość';

            case 'PICTURE':
                return 'Usuń obraz';

            case 'PRODUCT':
                return 'Usuń produkt';
        }
    };

    const getForm = () => {
        switch (model) {
            case 'COLLECTION':
                return <CollectionEditForm data={data as CollectionInterface} id={id as string} refresh={getData} />;

            case 'NEWS':
                return <NewsEditForm data={data as NewsInterface} id={id as string} refresh={getData} />;

            case 'PRODUCT':
                return <ProductEditForm data={data as ProductInterface} id={id as string} refresh={getData} />;
        }
    };

    const getQuestion = (): string => {
        switch (model) {
            case 'COLLECTION':
                return 'Czy na pewno chcesz usunąć kolekcję?';

            case 'NEWS':
                return 'Czy na pewno chcesz usunąć nowość?';

            case 'PRODUCT':
                return 'Czy na pewno chcesz usunąć produkt?';

            default:
                return '';
        }
    };

    const handleDelete = async () => {
        setResponsePopup({ message: 'Wysyłanie...', status: true, open: true });
        const response = await fetchTool(`${getModel(model)}/${id}`, 'DELETE') as ClientResponse;
        if (!response.status) return setResponsePopup({ message: response.message, open: true, status: response.status });
        const { message, status } = response;
        navigation(`/${getModel(model)}`);
        setResponsePopup({ message, status, open: true });
    };

    const getData = async () => {
        const startTime = new Date().valueOf();
        const data = await fetchApiTool(`${getModel(model)}/${id}`);
        const endTime = new Date().valueOf();
        setTimeout(() => {
            if (!componentRef.current || !data) return;
            if (!data.status) return setResponsePopup({ message: data.message, open: true, status: data.status });
            setData(data.results as Data);
        }, endTime - startTime < 500 ? 500 - (endTime - startTime) : 0);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="edit" ref={componentRef}>
            {data ? <>
                <SavedImages images={data.images} model={model} id={id as string} refresh={getData} />
                <div className="edit__section section-animation">
                    {getForm()}
                </div>
                <div className="edit__section section-animation">
                    <DeleteButton handler={handleDelete} question={getQuestion()}>
                        {getButtonValue()}
                    </DeleteButton>
                </div>
            </> : <Loading />}
        </div>
    );
};