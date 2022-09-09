import { useEffect } from "react";
import { useFileDrop } from "../../hooks/useFileDrop";

type FileType = 'image' | 'audio';

interface Props {
    defaultValue: string;
    fileType: FileType;
    multiple?: boolean;
    handler: (files: File[] | null) => void;
}

export const FileDrop = ({ defaultValue, fileType, multiple = false, handler }: Props) => {

    const { className, files, value, getInputProps, getRootProps, resetValue } = useFileDrop(defaultValue, fileType, multiple);

    useEffect(() => {
        if (!files) return;
        handler(files);
        resetValue();
    }, [files]);

    return (
        <div {...getRootProps({ className, onDragLeave: resetValue })}>
            <input {...getInputProps()} />
            {value}
        </div>
    );
};