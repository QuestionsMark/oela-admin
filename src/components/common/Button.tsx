import { MouseEvent, ReactNode } from "react";

interface Props {
    children: ReactNode;
    className?: string;
    handler?: () => void;
}

export const Button = ({ children, className, handler }: Props) => {

    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        if (handler) {
            handler();
        }
    };

    return (
        <button
            className={`btn${className ? ' ' + className : ''}`}
            onClick={handleClick}
        >
            {children}
        </button>
    );
};