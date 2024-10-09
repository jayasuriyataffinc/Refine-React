import React from "react";
import {
  Refine,
  AuthProvider,
  AuthActionResponse,
} from "@refinedev/core";
import "@refinedev/antd/dist/reset.css";
import Login from "./pages/Login/Login";
import { BrowserRouter, redirect, Routes, Route } from "react-router-dom";
import Home from "./pages/Login/Home";
import routerProvider from "@refinedev/react-router-v6";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from "./pages/Login/SignUp";

const authProvider: AuthProvider = {
  login: async ({ username, password }: any): Promise<AuthActionResponse> => {
    if (localStorage.getItem("login")) {
      return {
        success: true,
        redirectTo: "/home",
      };
    }
    
    alert("Login failed");
    return {
      success: false,
      error: {
        message: "Login failed",
        name: "Invalid username or password",
      },
    };
  },

  logout: async (): Promise<AuthActionResponse> => {
    localStorage.removeItem("login");
    localStorage.removeItem("token"); 
    return Promise.resolve({ success: true });
  },

  getPermissions: async () => Promise.resolve(),
  
  check: async () => {
    if (!localStorage.getItem("login")) {
      return { authenticated: false };
    }
    return { authenticated: true };
  },

  onError: function (error: any): Promise<any> {
    console.error(error);
    return Promise.resolve();
  },
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Refine authProvider={authProvider} routerProvider={routerProvider}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};

export default App;
