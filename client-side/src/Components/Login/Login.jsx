import React, { useState } from "react";
import "./Login.css";
import "./Login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";

const validationSchema = Yup.object({
  email: Yup.string().email().required("Please Enter your Email"),
  password: Yup.string().required("Please Enter your password"),
  fullname: Yup.string().required("Please Enter your fullname"),
});

function Login() {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fullname: "",
      budget: 20000,
      autoBid: false,
      notifyAt: "50%",
    },
    onSubmit: (values) => {
      setLoading(true);
      localStorage.setItem("user", JSON.stringify(values));
      setLoading(false);
      window.location.replace("/");
    },
    validationSchema,
  });

  return (
    <div className="login-Container">
      <h1 className="login-title">Login with dummy credentials</h1>
      <div className="login-Wrapper">
        <form className="login-Form" onSubmit={formik.handleSubmit}>
          <div className="login-Items">
            <input
              type="text"
              placeholder="Enter your Fullname"
              id="fullname"
              name="fullname"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.fullname}
            />
            {formik.touched.fullname && formik.errors.fullname ? (
              <div className="error">{formik.errors.fullname}</div>
            ) : null}
          </div>
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
            {loading ? (
              <CircularProgress
                color="success"
                style={{ backgroundColor: "transparent" }}
              />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
