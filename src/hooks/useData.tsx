import { RefObject, useEffect, useState } from "react";
import { getData } from "../utils/getData";

export function useData<T>(path: string, ref: RefObject<HTMLElement>, dependencies: any[] = [], reset: boolean = false): { data: T | null, refresh: () => void } {
    const [data, setData] = useState<T | null>(null);
    const [reload, setReload] = useState<boolean | null>(null);

    const refresh = () => {
        setReload(state => state === null ? false : !state);
    };

    useEffect(() => {
        if (reload === false || reload === true) {
            getData(path, setData, ref);
        }
    }, [reload]);

    useEffect(() => {
        if (reset) {
            setData(null);
        }
        getData(path, setData, ref);
    }, [...dependencies]);
    return { data, refresh };
};