import { HOST_ADDRESS } from "../../config";

interface Props {
    src: string;
    alt: string;
}

export const Image = ({ alt, src }: Props) => {
    return (
        <div className="img-wrapper">
            <img
                src={`${HOST_ADDRESS}/file/${src}`} alt={alt} className="img"
                crossOrigin="anonymous"
            />
        </div>
    );
};