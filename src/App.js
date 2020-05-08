import React, { useState, useEffect } from "react";
import SignInSingUp from "./page/SignInSingUp";
import { ToastContainer } from "react-toastify";
import { isUserLogedApi } from "./api/auth";

import { AuthContext } from "./utils/contexts";
import Routing from "./routes/Routing";

export default function App() {
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refresCheckLogin, setRefresCheckLogin] = useState(false);

  useEffect(() => {
    setUser(isUserLogedApi());
    setRefresCheckLogin(false);
    setLoadUser(true);
  }, [refresCheckLogin]);

  if (!loadUser) return null;

  return (
    <AuthContext.Provider value={user}>
      {user ? (
        <Routing setRefresCheckLogin={setRefresCheckLogin} />
      ) : (
        <SignInSingUp setRefresCheckLogin={setRefresCheckLogin} />
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );
}
