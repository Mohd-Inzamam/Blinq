// src/pages/auth/Login.jsx
import { useState } from "react";
import styles from "./Login.module.css";
import {
  TextField,
  Button,
  IconButton,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // comes from AuthContext

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
    setErrors({});

    try {
      const response = await fetch(
        "https://blinq-url-shortener.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Login failed");
      }

      const data = await response.json();
      const token = data.token;

      // Save token in storage (localStorage or sessionStorage)
      if (rememberMe) {
        localStorage.setItem("blinq_token", token);
      } else {
        sessionStorage.setItem("blinq_token", token);
      }

      // Call AuthContext login to update state
      await login(token);

      navigate("/dashboard");
    } catch (err) {
      setErrors({
        form: err.message || "Something went wrong. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Log In</h2>

        {errors.form && <div className={styles.formError}>{errors.form}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            className={styles.input}
          />

          <div className={styles.passwordWrapper}>
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              className={styles.input}
            />
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              className={styles.eyeIcon}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>

          <div className={styles.flexBetween}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                  size="small"
                />
              }
              label="Remember Me"
            />
            <a href="/forgot-password" className={styles.forgotLink}>
              Forgot Password?
            </a>
          </div>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            className={styles.button}>
            {loading ? (
              <CircularProgress size={24} style={{ color: "#fff" }} />
            ) : (
              "Log In"
            )}
          </Button>
        </form>

        <p className={styles.signupText}>
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
