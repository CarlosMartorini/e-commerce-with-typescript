import GlobalStyles from './global/styles';
import React from "react";
import Route from "./routes";
import Header from "./components/header/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Header/>
      <Route/>
      <GlobalStyles/>
    </>
  );
}

export default App;
