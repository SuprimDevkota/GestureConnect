import WebcamStreamCapture from "./WebcamVideo";

import { useState } from "react";

const Home = () => {
  const [isCapturing, setIsCapturing] = useState(false);

  return (
    <div
      className={`flex flex-col justify-center mx-auto max-w-screen-lg ${isCapturing ? "w-[80%] sm:w-[65%] md:w-[50%] lg:w-[35%]" : ""} py-12`}
    >
      <WebcamStreamCapture
        isCapturing={isCapturing}
        setIsCapturing={setIsCapturing}
      />
    </div>
  );
};

export default Home;
