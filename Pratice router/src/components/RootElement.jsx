import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const RootElement = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4">
        <Outlet />
      </main>
    </>
  );
};

export default RootElement;
