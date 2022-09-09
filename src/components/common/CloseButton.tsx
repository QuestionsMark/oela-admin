import { MouseEvent, ReactNode } from "react";

interface Props {
    handler?: () => void;
    children: ReactNode;
}

export const CloseButton = ({ children, handler }: Props) => {

    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        if (handler) {
            handler();
        }
    };

    return (
        <button className="btn btn--close" onClick={handleClick}>{children}</button>
    );
};