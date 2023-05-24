import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Navigate, Link } from "react-router-dom";

import { DataContext } from "../../data/DataContext";
import { login } from "../../api/userApiCalls";
import styles from "./Login.module.scss";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { usersDispatch, isUserLoggedIn, setError, setLoading } = useContext(DataContext);
  const navigate = useNavigate();

  if (isUserLoggedIn) return <Navigate to="/dashboard" replace />;

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await login(usersDispatch, data);
        if (res.statusCode < 400) {
            setLoading(false);
            return navigate("/dashboard");
        }
      setLoading(false);
      setError(res);
    } catch (err) {
      console.error("err ->", err);
      setLoading(false);
      setError(err);
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.img_container}>
       
      </div>
      <div className={styles.login}>
        <h1>Please login </h1>
        <p>Welcome back</p>
        <div className={styles.login_form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputs}>
              <input
                name="email"
                placeholder="Email"
                {...register("email", {
                  required: "Enter your email.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email is invalid.",
                  },
                })}
              />
              <div className={styles.error_message}>{errors.email && <span>{errors.email.message}</span>}</div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Enter your password",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              <div className={styles.error_message}>{errors.password && <span>{errors.password.message}</span>}</div>
            </div>

            <div className={styles.submit}>
              <input type="submit" value="Login" />
            </div>
          </form>
          <div className={styles.connect}>
            <p>
              <span>-</span> or login with <span>-</span>
            </p>
            <div className={styles.icons}>
             
            </div>
          </div>
          <div className={styles.register}>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
