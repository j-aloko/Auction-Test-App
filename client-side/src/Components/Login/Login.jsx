import React, { useState } from "react";
import "./Login.css";
import "./Login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";

const validationSchema = Yup.object({
  password: Yup.string().required("Please Enter your password"),
  fullname: Yup.string().required("Please Enter your fullname"),
});

function Login() {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      fullname: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      localStorage.setItem("user", JSON.stringify(values));
      setLoading(false);
      window.location.replace("/");
    },
    validationSchema,
  });

  //handling optional login

  const handleOptionalLogin = (type) => {
    if (type === "jon") {
      const values = {
        fullname: "Jon Snow",
        password: 43421,
        img: "/assets/jon.png",
      };
      localStorage.setItem("user", JSON.stringify(values));
      window.location.replace("/");
    } else {
      const values = {
        fullname: "Jane Doe",
        password: 43421,
        img: "/assets/jane.jpg",
      };
      localStorage.setItem("user", JSON.stringify(values));
      window.location.replace("/");
    }
  };

  return (
    <div className="login-Container">
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
              type="password"
              placeholder="Dummy password"
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
        <h2 className="or">OR</h2>
        <div className="optional-login-buttons">
          <span
            className="optional-button"
            onClick={() => handleOptionalLogin("jon")}
          >
            Login as Jon Snow
          </span>
          <span
            className="optional-button"
            onClick={() => handleOptionalLogin("jane")}
          >
            Login as Jane Doe
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
