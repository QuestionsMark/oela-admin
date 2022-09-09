import { HOST_ADDRESS } from "../config";
import { Img } from "types";
import { ImagePreview } from "../react-types/form-types";

export function setPreviewForFiles(files: File[]): ImagePreview[] {
    return files.map(f => ({
        alt: '',
        size: f.size,
        src: URL.createObjectURL(f),
    }));
}

export function setPreviewForData(images: Img[]): ImagePreview[] {
    return images.map(i => ({
        alt: i.alt || '',
        size: 0,
        src: `${HOST_ADDRESS}/file/${i.id}`,
    }));
}