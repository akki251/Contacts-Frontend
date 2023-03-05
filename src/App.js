import Home from "./components/Home";
import Login from "./components/Login";
import { NextUIProvider } from "@nextui-org/react";
import { useContactStore } from "./store";
import jwtDecode from "jwt-decode";
import { Toaster } from "react-hot-toast";
function App() {
  const logout = useContactStore((state) => state.logout);

  const loggedInProfile = useContactStore((state) => state.loggedInProfile);

  let showContent = <Login />;

  if (loggedInProfile) {
    let token = loggedInProfile.stsTokenManager.accessToken;

    const decoded_data = jwtDecode(token);

    // check token expiry
    if (decoded_data.exp * 1000 < new Date().getTime()) {
      logout();
    } else {
      showContent = <Home />;
    }
  }

  return (
    <>
      <NextUIProvider>
        <Toaster />
        {showContent}
      </NextUIProvider>
    </>
  );
}

export default App;
