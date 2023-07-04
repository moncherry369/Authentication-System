import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useLocation } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");

  const [isLoginFormActive, setIsLoginFormActive] = useState(true);

  const handleFormChange = (loginForm) => {
    setIsLoginFormActive(loginForm);
  };

  const handleSubmit = (ev, islogin = true) => {
    ev.preventDefault();
    console.table([{ email: email, password: password, name: name }]);
    if (islogin) {
      actions.login(email, password).then(() => {
        if (store.token) {
          navigate("/");
        }
      });
    } else {
      actions
        .sign_up(email, password, name)
        .then(() => {
          setIsLoginFormActive(true);
        })
        .catch((err) => {
          console.error(err);
          if (!store.user) {
            setMsg(store.msg);
          }
        });
    }
  };

  return (
    <>
      <div className="modal-container">
        <div className="form-switch-container">
          <button
            id="login-frm-btn"
            className={`login-form-btn ${isLoginFormActive ? "active" : ""}`}
            onClick={() => handleFormChange(true)}
          >
            Sign In
          </button>
          <button
            id="signup-frm-btn"
            className={`register-form-btn ${isLoginFormActive ? "" : "active"}`}
            onClick={() => handleFormChange(false)}
          >
            Register
          </button>
        </div>
        <div className="form-content">
          {/* LOGIN FORM */}
          <form
            id={isLoginFormActive ? "login-form" : "signup-form"}
            onSubmit={(ev) => handleSubmit(ev, isLoginFormActive)}
          >
            {isLoginFormActive ? (
              ""
            ) : (
              <input
                type="text"
                placeholder="Full Name"
                required
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            {store.msg}
            <div id="submit-frm-btn-container">
              <button
                type="submit"
                onClick={(ev) => handleSubmit(ev, isLoginFormActive)}
              >
                {isLoginFormActive ? "Sign In" : "Register"}
              </button>
            </div>
          </form>
          <style>
            {`
            body{
              text-align: center;
            }
            .login-form-btn:active {
              color: rgb(252, 98, 56);
            }
            .register-form-btn:active {
              color: rgb(252, 98, 56);
            }
            #login-frm-btn {
              background-color: #ffd872;
              margin: 3px;
              font-size: 13px;
              border:dotted 1px;
            }
            #signup-frm-btn {
              background-color: #ffd872;
              margin: 3px;
              border: dotted 1px ;
              font-size: 13px;
            }
            .form-content {
              border-radius: 10px;
              text-align: center;

            }
            form input{
              margin: 5px;
            }
            #submit-frm-btn-container button {
              background-color: rgb(255, 216, 114);
              color: rgb(252, 98, 56);
              margin-top: 5px;
              margin: auto;
              font-size: 13px;
            }
            #submit-frm-btn-container button:hover {
              color: rgb(11, 9, 9);
            }
            `}
          </style>
        </div>
      </div>
    </>
  );
};
