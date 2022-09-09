import { MouseEvent, ReactNode } from "react";
import { usePopup } from "../../contexts/popupContext";

interface Props {
    className?: string;
    question: string;
    onlyIcon?: boolean;
    handler?: () => void;
    children: ReactNode;
}

export const DeleteButton = ({ children, className, question, onlyIcon, handler }: Props) => {

    const { setConfirmPopup } = usePopup();

    const closeConfirmPopup = () => {
        setConfirmPopup({ open: false, question: '', acceptHandler: () => { }, declineHandler: () => { } });
    }

    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        if (handler) {
            setConfirmPopup({ open: true, question, acceptHandler: handler, declineHandler: closeConfirmPopup })
        }
    };

    return (
        <button className={`btn${onlyIcon ? ' btn--delete-icon' : ' btn--delete'}${className ? ' ' + className : ''}`} onClick={handleClick}>{children}</button>
    );
};