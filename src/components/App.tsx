import { AdminPanel } from "./AdminPanel";
import { LoginScreen } from "./LoginScreen";
import { ResponsePopup } from "./ResponsePopup";
import { ConfirmPopup } from "./ConfirmPopup";

import { useAuthorization } from "../contexts/authorizationContext";
import { PopupProvider } from "../contexts/popupContext";

export const App = () => {

  const { authorization } = useAuthorization();

  return (
    <PopupProvider>
      <div className="wrapper">
        <div className="background" />
        {authorization ? <AdminPanel /> : <LoginScreen />}
        <ResponsePopup />
        <ConfirmPopup />
      </div>
    </PopupProvider>
  );
};
