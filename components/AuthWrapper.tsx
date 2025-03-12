"use client";
import React from "react";
import { useSelector } from "react-redux";
import Login from "@/components/Login";
import { RootState } from "@/redux/store";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  console.log("AuthWrapper - Current user:", user);

  return user ? <>{children}</> : <Login />;
};

export default AuthWrapper;