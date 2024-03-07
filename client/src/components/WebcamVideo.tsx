import StickyNotification from "./StickyNotification";
import { INotification } from "../types/notification";

import Webcam from "react-webcam";
import { useRef, useState, useCallback } from "react";

interface WebcamStreamCaptureProps {
  setIsCapturing: React.Dispatch<React.SetStateAction<boolean>>;
}

const WebcamStreamCapture = () => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

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

    mediaRecorderRef.current.start();
  }, [setIsCapturing]);

  // This is called when the media stream is successfully loaded
  const onUserMedia = useCallback(() => {
    handleWebcamCapture();
  }, [handleWebcamCapture]);

  const onUserMediaError = useCallback(() => {
    setIsCapturing(false);

    const notification: INotification = {
      message:
        "Webcam access was denied. Please allow camera access to use GestureConnect.",
      type: "error",
    };

    setNotification(notification);
  }, [setIsCapturing]);

  return (
    <>
      {notification && <StickyNotification notification={notification} />}

      <Webcam
        audio={false}
        ref={webcamRef}
        onUserMedia={onUserMedia} // Execute handleWebcamCapture when stream is successfully loaded
        onUserMediaError={onUserMediaError} // Handle errors, including permission denied
      />

    </>
  );
};

export default WebcamStreamCapture;
