import React from "react";
import { Route, Routes } from "react-router-dom";
import Nowhome from "./pages/Nowhome.jsx";
import ProfilePage from "./pages/profilepage.jsx";
import UploadPrescription from "./pages/uploadprescription.jsx";
import EditProfile from "./pages/editprofile.jsx";
import ShowPrescriptions from "./pages/showprescriptions.jsx";
import SignIn from "./pages/Login.jsx";
import SignUp from "./pages/signup.jsx";
import Chatbox from "./pages/ChatBox.jsx";
import AboutUs from "./pages/About_Us.jsx";
import AdminInventory from "./pages/AdminInventory.jsx";
import Shop from "./pages/shop.jsx";
import Cart from "./pages/Cart.jsx";
import StripeCheckout from "./components/StripeCheckout.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import AdminDashboard from "./components/admiin/AdminDashboard.jsx";
function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/" element={<Nowhome />} />
      <Route path="/profilepage" element={<ProfilePage />} />
      <Route path="/uploadprescription" element={<UploadPrescription />} />
      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="/showprescriptions" element={<ShowPrescriptions />} />
      <Route path="/chatbot" element={<Chatbox />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/admin_inventory" element={<AdminInventory />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<StripeCheckout />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
