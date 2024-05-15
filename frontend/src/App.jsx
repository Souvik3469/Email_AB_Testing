import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";

import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";
import Loading from "./Components/Loading";

import CreateExperimentForm from "./Components/CreateExperimentForm"
import CreateVariantForm from "./Components/CreateVariantForm"


import Home from "./Components/Home";


function App() {
  const showToast = (message, type = 'error') => {
    toast[type](message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  function isJWTValid() {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    }
    return false;
  }
  useEffect(() => {
    if (!isJWTValid()) {
      let val = localStorage.getItem("token");
      if (val !== null) {
       
          showToast('Session Expired! Please Login', 'error');
      }
      if (val === null) {
     
        showToast('Please Login!', 'success');
      }
    }
  }, []);

 
  return (
    <div className="App">
      
        <Routes>
          <Route path="/">
            {/* <Route path="/" element={<Landing/>} /> */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
             <Route path="/home" element={<Home/>} />
              
               <Route path="/create-experiment" element={<CreateExperimentForm />} />
               <Route path="/create-variant" element={<CreateVariantForm />} />
               
               {/* <Route path="/updatetender/:tenderId" element={<UpdateTender />} /> */}
               <Route path="/loading" element={<Loading />} />
          </Route>
        </Routes>
          <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        </div>
  );
}

export default App;
