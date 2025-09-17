import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Notes from "./pages/Notes.jsx";
import Upgrade from "./pages/Upgrade.jsx";
import Navbar from "./components/Navbar.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import TenantProvider from "./context/TenantContext.jsx";
import User from "./pages/User.jsx";
import Admin from "./pages/admin.jsx";
import { useContext } from "react";
import Home from "./pages/Home.jsx";
import Member from "./pages/Members.jsx";

export default function App() {
  const {isLogin}=useContext(AuthContext)
  return (
    
      <TenantProvider>
        <BrowserRouter>
          
          <Routes>
            <Route path="/" element={isLogin?<Home/>:<Login />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/user" element={<User/>} />
            <Route path="/admin" element={<Admin/>} />

            <Route path="/upgrade/:slug" element={<Upgrade />} />
            <Route path="/members/:slug" element={<Member />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </BrowserRouter>
      </TenantProvider>
    
  );
}


