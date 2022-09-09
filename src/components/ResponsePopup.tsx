import Popup from "reactjs-popup";
import { usePopup } from "../contexts/popupContext";

export const ResponsePopup = () => {

    const { responsePopup, setResponsePopup } = usePopup();
    const { message, open, status } = responsePopup;

    const closePopup = () => {
        setResponsePopup({ message: '', open: false, status: false });
    }

    return (
        <Popup
            open={open}
            modal
            className="modal-popup modal-popup--response"
            onClose={closePopup}
        >
            <div className="popup__response" style={{
                backgroundColor: `${status ? 'rgba(0, 161, 86, 0.3)' : 'rgba(207, 91, 91, 0.3)'}`,
                boxShadow: `${status ? '0 0 0 20px rgba(0, 161, 86, 0.3)' : '0 0 0 20px rgba(207, 91, 91, 0.3)'}`,
            }}>
                {message}
            </div>
        </Popup>
    );
};