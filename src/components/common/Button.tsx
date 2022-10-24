import { MouseEvent, ReactNode } from "react";

interface Props {
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    handler?: () => void;
}

export const Button = ({ children, className, disabled, handler }: Props) => {

    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        if (handler) {
            handler();
        }
    };

    return (
        <button
            className={`btn${className ? ' ' + className : ''}`}
            disabled={disabled}
            onClick={handleClick}
        >
            {children}
        </button>
    );
};