import { useEffect, useState } from "react";
import { CircularProgress, CssBaseline, Box } from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "../store/store";
import { getCart } from "../features/cart/cartSlice";
import { getUser } from "../features/account/accountSlice";
import Header from "./Header";

function App() {

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = async () => {
    try {
      await dispatch(getUser()).unwrap();
    } catch (error) {
      console.error("Failed to get user:", error);
    }
    try {
      await dispatch(getCart()).unwrap();
    } catch (error) {
      console.error("Failed to get cart:", error);
    }
  }

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, []);

  if (loading) return (
    <Box sx={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh",
      background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
    }}>
      <CircularProgress 
        size={60} 
        sx={{ 
          color: "#D4AF37",
          "& .MuiCircularProgress-circle": {
            strokeLinecap: "round"
          }
        }} 
      />
    </Box>
  )

  return (
    <>
      <ToastContainer 
        position="bottom-right" 
        hideProgressBar 
        theme="colored"
        toastStyle={{
          backgroundColor: "#2d2d2d",
          color: "white",
          border: "1px solid #D4AF37"
        }}
      />

      <CssBaseline />
      <Header />
      <Box sx={{ minHeight: "calc(100vh - 64px)", backgroundColor: "#fafafa" }}>
        <Outlet />
      </Box>
    </>
  )
}

export default App
