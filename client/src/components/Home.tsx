import WebcamStreamCapture from "./WebcamVideo";

import { useState } from "react";

const Home = () => {
  const [isCapturing, setIsCapturing] = useState<boolean>(false);

  return (
    <div
      className={`flex flex-col justify-center mx-auto max-w-screen-lg ${isCapturing ? "w-[85%] sm:w-[70%] md:w-[55%] lg:w-[39%]" : ""} py-5`}
    >
      <WebcamStreamCapture setIsCapturing={setIsCapturing} />
    </div>
  );
};

export default Home;
