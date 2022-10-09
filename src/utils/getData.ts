import { Dispatch, RefObject, SetStateAction } from "react";
import { fetchApiTool } from "./fetchUtils";

export const getData = async (path: string, setState: Dispatch<SetStateAction<any>>, ref: RefObject<HTMLElement>) => {
    const startTime = new Date().valueOf();
    const response = await fetchApiTool(path);
    if (!response.status || !ref.current) return;
    const endTime = new Date().valueOf();
    setTimeout(() => {
        if (!ref.current) return;
        setState(response.results);
    }, endTime - startTime < 500 ? 500 - (endTime - startTime) : 0);
};