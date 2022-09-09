import { createContext, FC, useContext, useState, Dispatch, SetStateAction } from 'react';

interface ResponsePopup {
    open: boolean;
    status: boolean;
    message: string;
}

interface ConfirmPopup {
    open: boolean;
    question: string;
    acceptHandler: () => void;
    declineHandler: () => void;
}

interface PopupContextValue {
    responsePopup: ResponsePopup;
    setResponsePopup: Dispatch<SetStateAction<ResponsePopup>>;
    confirmPopup: ConfirmPopup;
    setConfirmPopup: Dispatch<SetStateAction<ConfirmPopup>>;
}

const defaultResponsePopup: ResponsePopup = {
    open: false,
    status: false,
    message: '',
}

const defaultConfirmPopup: ConfirmPopup = {
    open: false,
    question: '',
    acceptHandler: () => { },
    declineHandler: () => { },
}

const PopupContext = createContext<PopupContextValue>(null!);

export const usePopup = () => useContext(PopupContext);

export const PopupProvider: FC = ({ children }) => {

    const [responsePopup, setResponsePopup] = useState<ResponsePopup>(defaultResponsePopup);
    const [confirmPopup, setConfirmPopup] = useState<ConfirmPopup>(defaultConfirmPopup);

    return (
        <PopupContext.Provider value={{ responsePopup, setResponsePopup, confirmPopup, setConfirmPopup }}>
            {children}
        </PopupContext.Provider>
    );
};