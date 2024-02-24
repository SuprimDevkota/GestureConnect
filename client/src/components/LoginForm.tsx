import userService from "../services/user";

import { setUser } from "../reducers/loggedUserReducer";
import { setNotification } from "../reducers/notificationReducer";

import { useAppDispatch, useAppSelector } from "../hooks";
import { INotification } from "../types/notification";

import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const notification = useAppSelector((state) => state.notification);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      token: "1234567890",
      firstName: "John",
      lastName: "Doe",
      email,
    };

    const notification: INotification = {
      message: "User successfully logged in!",
      type: "success",
    };

    userService.setUser(user);
    dispatch(setUser(user));
    dispatch(setNotification(notification));

    setEmail("");
    setPassword("");

    navigate("/");
  };

  return (
    <div
      className={`max-w-screen-xl mx-auto px-16 md:px-36 ${notification ? "py-3 md:py-5" : "py-12"} grid grid-cols-1 md:grid-cols-4 gap-16 text-center md:text-left`}
    >
      <div className="md:col-span-2 pt-2">
        <img
          src="/logo.png"
          alt="GestureConnect Logo"
          className="mx-auto max-w-[225px] lg:max-w-[300px]"
        />

        <div className="mt-4 text-center">
          <h3 className="text-2xl font-semibold">GestureConnect</h3>

          <p className="text-gray-500 dark:text-gray-400">
            Bridging the Communication Gap
          </p>
        </div>
      </div>

      <div className="ml-0 text-left my-auto md:col-span-2">
        <h3 className="text-3xl font-semibold mb-2">Log In</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 dark:text-blue-500">
            Sign Up
          </Link>
        </p>

        <form onSubmit={handleLogin}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>

          <div className="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Show password
            </label>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold tracking-wide rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            LOG IN
          </button>
        </form>

        <div className="flex items-center justify-center mt-4">
          <span className="h-px bg-gray-300 w-full"></span>
          <span className="text-gray-500 dark:text-gray-400 px-4">OR</span>
          <span className="h-px bg-gray-300 w-full"></span>
        </div>

        <button className="flex items-center justify-center mt-4 px-3 py-2 border-2 rounded-md w-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-700 focus:border-blue-500 dark:focus:border-blue-600 font-medium">
          <FcGoogle className="w-6 h-6 me-2" />
          Log In with Google
        </button>
      </div>
    </div>
  );
};

export default LoginForm;