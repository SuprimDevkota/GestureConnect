import { MdArrowForwardIos } from "react-icons/md";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 border-gray-200 text-white">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 md:px-36">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logo.png" className="h-12" alt="GestureConnect Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white tracking-wide">
            GestureConnect
          </span>
        </a>

        <button className="flex flex-row justify-center items-center gap-2 px-5 py-3 w-18 font-bold tracking-wide rounded-full bg-blue-600 hover:bg-blue-700">
          Log In <MdArrowForwardIos />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
