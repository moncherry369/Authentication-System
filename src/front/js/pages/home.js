import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Login } from "./login";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>Login/Signup here!</h1>
      <Login />
    </div>
  );
};
