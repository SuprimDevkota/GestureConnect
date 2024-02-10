import Notification from "./Notification";
import { INotification } from "../types/notification";

import Webcam from "react-webcam";
import { useRef, useState, useCallback } from "react";

interface WebcamStreamCaptureProps {
  setIsCapturing: React.Dispatch<React.SetStateAction<boolean>>;
  isCapturing: boolean;
}

const WebcamStreamCapture: React.FC<WebcamStreamCaptureProps> = ({
  setIsCapturing,
  isCapturing,
}) => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  const [notification, setNotification] = useState<INotification | null>(null);

  const handleDataAvailable = useCallback(({ data }: { data: Blob }) => {
    if (data.size > 0) {
      setRecordedChunks([...recordedChunks, data]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWebcamCapture = useCallback(() => {
    if (!webcamRef || !webcamRef.current || !webcamRef.current.stream) {
      return;
    }

    setIsCapturing(true);
    setNotification(null);

    const options = { mimeType: "video/webm" };
    try {
      mediaRecorderRef.current = new MediaRecorder(
        webcamRef.current.stream,
        options,
      );
    } catch (e) {
      console.error("Exception while creating MediaRecorder:", e);
      return;
    }

    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable,
    );
    mediaRecorderRef.current.start();
  }, [handleDataAvailable, setIsCapturing]);

  // This is called when the media stream is successfully loaded
  const onUserMedia = useCallback(() => {
    handleWebcamCapture();
  }, [handleWebcamCapture]);

  const onUserMediaError = useCallback(() => {
    setIsCapturing(false);

    console.log("onUserMediaError");

    const notification: INotification = {
      message:
        "Webcam access was denied. Please allow camera access to use this feature.",
      type: "error",
    };

    setNotification(notification);
  }, [setIsCapturing]);

  return (
    <>
      {notification && <Notification _notification={notification} />}

      <Webcam
        audio={false}
        ref={webcamRef}
        onUserMedia={onUserMedia} // Execute handleWebcamCapture when stream is successfully loaded
        onUserMediaError={onUserMediaError} // Handle errors, including permission denied
      />

      {isCapturing && (
        <div className="flex items-center justify-center mt-4 px-3 py-2 border-2 rounded-md w-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-700 focus:border-blue-500 dark:focus:border-blue-600 font-medium">
          How you doin'? 🤔
        </div>
      )}
    </>
  );
};

export default WebcamStreamCapture;
