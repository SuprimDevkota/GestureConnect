import { MdArrowForwardIos } from "react-icons/md";

const LandingPage = () => {
  return (
    <div className="flex flex-col md:flex-row px-16 py-8 md:py-16 items-center text-center justify-center">
      <img
        src="/landing_page.png"
        alt="GestureConnect Landing Page Image"
        className="mb-8 md:mb-0 w-[400px] md:w-[325px] lg:w-[500px]"
      />

      <div className="ml-0 md:ml-16 text-left my-auto">
        <div className="flex flex-col gap-2 text-4xl md:text-5xl font-semibold mb-4">
          <div>Translate</div>
          <div>Sign Language</div>
          <div>In Real-Time</div>
        </div>

        <div className="flex flex-col text-lg md:text-xl">
          <div>
            Use our<span className="font-medium"> AI-powered Assistant </span>to
            <br />
            <span className="font-medium"> Bridge the Communication Gap</span>
          </div>

          <button className="flex flex-row justify-center items-center gap-2 mt-5 px-5 py-3 w-18 text-white font-bold tracking-wide rounded-full bg-[#11253e] hover:bg-gray-900">
            Get Started <MdArrowForwardIos />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
