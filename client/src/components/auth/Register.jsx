/* eslint-disable react-hooks/rules-of-hooks */
import { DataContext } from "../../data/DataContext";
import { useContext } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signup } from "../../api/userApiCalls";
import styles from "./Register.module.scss";

const Register = () => {
  const { usersDispatch, isUserLoggedIn } = useContext(DataContext);

  if (isUserLoggedIn) {
    return <Navigate to="/preferences" replace />;
  }

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await signup(usersDispatch, data);

      if (res.statusCode < 400) {
        return navigate("/preferences");
      }
    } catch (err) {
      console.error("err ->", err);
    }
  };

  return (
    <div className={styles.register_container}>
      <div className={styles.register}>
        <h1>Unlock Your Potential</h1>
        <p>Join the Realm of Champions</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.input}>
            <input
              name="username"
            placeholder="Username"
              {...register("username", {
                required: "Enter your username",
              })}
            />
            
            <label htmlFor="username">Username</label>
          </div>

          <div className={styles.error_message}>{errors.username && <span>{errors.username.message}</span>}</div>
          <div className={styles.input}>
            <input
              placeholder="Email"
              name="email"
              {...register("email", {
                required: "Enter your email",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email is invalid. Please fix",
                },
              })}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className={styles.error_message}>{errors.email && <span>{errors.email.message}</span>}</div>
          <div className={styles.input}>
            <input
              name="password"
              type="password"
            placeholder="Password"
              {...register("password", {
                required: "Enter your password",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters",
                },
              })}
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className={styles.error_message}>{errors.password && <span>{errors.password.message}</span>}</div>

          <div className={styles.submit}>
            <input type="submit" value="Sign Up" />
          </div>
        </form>
        <div className={styles.connect}>
          <div className={styles.icons}></div>
        </div>
        <div className={styles.login}>
          <p>
            Already have an account? <Link className={styles.link} to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
