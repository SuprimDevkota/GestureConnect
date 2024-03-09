import axios from "axios";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const sendRequest = async () => {
      // send request to api/opencam
      const response = await axios.post("/api/opencam/", {
        msg: "Open the camera",
      });
      console.log(response.data);
    };

    sendRequest();
  }, []);

  return (
    <div
      className={`flex flex-col justify-center mx-auto max-w-screen-lg py-4`}
    >
      Welcome to GestureConnect
    </div>
  );
};

export default Home;
