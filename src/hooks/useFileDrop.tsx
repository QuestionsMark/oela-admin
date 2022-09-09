import { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

export const useFileDrop = (defalutValue: string, fileType: string, multiple: boolean) => {

    const [value, setValue] = useState<string>(defalutValue);
    const [files, setFiles] = useState<File[] | null>(null);

    const getCorrectFormat = () => {
        switch (fileType) {
            case 'image':
                return 'image/*';
            case 'audio':
                return 'audio/*';

            default:
                return 'image/*';
        }
    };

    const resetValue = () => {
        setValue(defalutValue);
    };

    const validation = (type: string) => {
        if (fileType === 'image') {
            if (type === 'image/webp') {
                setValue('Wygląda dobrze');
            } else if (type.indexOf('image/') !== -1) {
                setValue('Szkoda że nie WEBP');
            } else if (!type) {
                setValue('Zobaczymy co da się z tym zrobic');
            } else {
                setValue('Zły format pliku :(');
            }
        } else if (fileType === 'audio') {
            if (type.indexOf('audio/') !== -1) {
                setValue('Wygląda dobrze');
            } else if (!type) {
                setValue('Zobaczymy co da się z tym zrobic');
            } else {
                setValue('Zły format pliku :(');
            }
        }
        return null;
    };

    const {
        getRootProps,
        getInputProps,
        acceptedFiles,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        accept: {
            [getCorrectFormat()]: [],
        },
        multiple,
        validator: (file) => validation(file.type),
    });

    const className = useMemo(() => {
        const classNames = ['filedrop'];
        if (isFocused) {
            classNames.push('filedrop--focus');
        }
        if (isDragAccept) {
            classNames.push('filedrop--accept');
        }
        if (isDragReject) {
            classNames.push('filedrop--reject');
        }
        return classNames.join(' ');
    }, [
        isFocused,
        isDragAccept,
        isDragReject,
    ]);

    useEffect(() => {
        setFiles(acceptedFiles);
    }, [acceptedFiles]);

    return { className, files, value, getInputProps, getRootProps, resetValue };
};