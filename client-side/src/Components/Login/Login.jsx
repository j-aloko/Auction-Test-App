import React, { useState } from "react";
import "./Login.css";
import "./Login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";

const validationSchema = Yup.object({
  email: Yup.string().email().required("Please Enter your Email"),
  password: Yup.string().required("Please Enter your password"),
});

function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {},
    validationSchema,
  });

  return (
    <div className="login-Container">
      <div className="login-Wrapper">
        <form className="login-Form" onSubmit={formik.handleSubmit}>
          <div className="login-Items">
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="login-Items">
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>
          <button className="login-Button" type="submit">
            Login
          </button>
        </form>
        <div className="forgot-Password-Create">
          <span className="forgot">Forgot Password?</span>
          <button className="create-New-Account">Create a new account</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
