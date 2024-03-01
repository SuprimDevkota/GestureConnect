import { useAppDispatch, useAppSelector } from "../hooks";
import { IRootState } from "../store";

import userService from "../services/user";

import { setUser } from "../reducers/loggedUserReducer";
import { setNotification } from "../reducers/notificationReducer";

import { MdArrowForwardIos } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const loggedUser = useAppSelector((state: IRootState) => state.loggedUser);

  const handleLogout = () => {
    if (!loggedUser) {
      return dispatch(
        setNotification({
          message: "User doesn't exist.",
          type: "error",
        }),
      );
    }

    userService.clearUser();

    dispatch(
      setNotification({
        message: `User ${loggedUser.info.firstName} logged out.`,
        type: "info",
      }),
    );

    dispatch(setUser(null));

    navigate("/");
  };

  return (
    <nav className="bg-gray-900 border-gray-200 text-white">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 md:px-36">
        <Link
          className="flex items-center space-x-3 rtl:space-x-reverse"
          to="/"
        >
          <img src="/logo.png" className="h-12" alt="GestureConnect Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white tracking-wide">
            GestureConnect
          </span>
        </Link>

        {loggedUser ? (
          <button
            className="flex flex-row justify-center items-center gap-2 px-5 py-3 w-18 font-bold tracking-wide rounded-full bg-gray-600 hover:bg-gray-700"
            onClick={handleLogout}
          >
            Log out <MdArrowForwardIos />
          </button>
        ) : (
          location.pathname == "/" && (
            <Link to="/login">
              <button className="flex flex-row justify-center items-center gap-2 px-5 py-3 w-18 font-bold tracking-wide rounded-full bg-blue-600 hover:bg-blue-700">
                Log In <MdArrowForwardIos />
              </button>
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
