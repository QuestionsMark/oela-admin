import { ResponsePopup } from "./ResponsePopup";
import { ConfirmPopup } from "./ConfirmPopup";

import { useAuthorization } from "../contexts/authorizationContext";
import { AuthorizationPanel } from "./AuthorizationPanel";
import { RegisterScreen } from "./RegisterScreen";
import { Loading } from "./common/Loading";
import { Route, Routes } from "react-router-dom";
import { LoginScreen } from "./LoginScreen";

export const App = () => {
  const { isAccount } = useAuthorization();

  return (
    <div className="wrapper">
      <div className="background" />
      <Routes>
        <Route path="/*" element={isAccount === null ? <Loading /> : isAccount ? <AuthorizationPanel /> : <RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
      <ResponsePopup />
      <ConfirmPopup />
    </div>
  );
};
