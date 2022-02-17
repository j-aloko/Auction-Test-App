import React, { useState } from "react";
import "./Register.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";

const validationSchema = Yup.object({
  username: Yup.string().required("Please Enter a username"),
  email: Yup.string().email().required("Please Enter your Email"),
  password: Yup.string().required("Please Enter your password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

function Register() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {},
    validationSchema,
  });

  return (
    <div className="register-Container">
      <div className="register-Wrapper">
        <form className="register-Form" onSubmit={formik.handleSubmit}>
          <div className="register-Items">
            <input
              type="text"
              placeholder="Username"
              id="username"
              name="username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="error">{formik.errors.username}</div>
            ) : null}
          </div>
          <div className="register-Items">
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
          <div className="register-Items">
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
          <div className="register-Items">
            <input
              type="password"
              placeholder="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.Confirmpassword}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>
          <button className="signup-Button" type="submit">
            Sign Up
          </button>
        </form>
        <div className="alreadyHaveAnAccount">
          <span className="aleady">Already have an account?</span>
          <button className="logintoAccount">Login</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
