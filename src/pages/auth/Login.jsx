import React, { useState } from "react";
import styles from "./Login.module.css";
import { IconButton, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

const Login = () => {
  //   const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (!email) tempErrors.email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      tempErrors.email = "Enter a valid email";
    if (!password) tempErrors.password = "Password is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // try {
    //   const res = await axios.post("/api/auth/login", { email, password });
    //   const token = res.data.token;
    //   if (rememberMe) localStorage.setItem("jwtToken", token);
    //   else sessionStorage.setItem("jwtToken", token);

    //   navigate("/dashboard");
    // } catch (err) {
    //   setErrors({
    //     form: err.response?.data?.message || "Something went wrong. Try again.",
    //   });
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Log In</h2>

        {errors.form && <div className={styles.formError}>{errors.form}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${styles.input} ${
                errors.email ? styles.errorInput : ""
              }`}
            />
            {errors.email && (
              <div className={styles.errorMsg}>{errors.email}</div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${styles.input} ${
                  errors.password ? styles.errorInput : ""
                }`}
              />
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                className={styles.eyeIcon}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
            {errors.password && (
              <div className={styles.errorMsg}>{errors.password}</div>
            )}
          </div>

          <div className={styles.flexBetween}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />{" "}
              Remember Me
            </label>
            <a href="/forgot-password" className={styles.forgotLink}>
              Forgot Password?
            </a>
          </div>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? (
              <CircularProgress size={24} style={{ color: "#fff" }} />
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <p className={styles.signupText}>
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
