import StickyNotification from "./StickyNotification";
import { INotification } from "../types/notification";

import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";

import { useRef, useState, useCallback, useEffect } from "react";

interface WebcamStreamCaptureProps {
  setIsCapturing: React.Dispatch<React.SetStateAction<boolean>>;
}

const WebcamStreamCapture: React.FC<WebcamStreamCaptureProps> = ({
  setIsCapturing,
}) => {
  const webcamRef = useRef<Webcam>(null);
  const requestRef = useRef<number>();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const translatedTextRef = useRef<string>("");

  const [translatedText, setTranslatedText] = useState<string>("");
  const [modelLoaded, setModelLoaded] = useState<boolean>(false);
  const [notification, setNotification] = useState<INotification | null>(null);

  const runModel = useCallback(
    async (model: tf.GraphModel) => {
      if (
        !webcamRef.current ||
        !webcamRef.current.video ||
        webcamRef.current.video.readyState !== 4 // HTMLMediaElement.HAVE_ENOUGH_DATA
      ) {
        return;
      }
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width and height
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      const img = tf.browser.fromPixels(video);
      const resized = tf.image.resizeBilinear(img, [640, 640]);
      const casted = resized.cast("float32");
      const expanded = casted.expandDims(0);
      const obj = (await model.executeAsync(expanded)) as tf.Tensor[];

      const boxes = (obj[0].arraySync() as number[][][])[0];
      const scores = (obj[1].arraySync() as number[][])[0];
      const classes = (obj[2].arraySync() as number[][])[0];

      let updatedTranslatedText = translatedTextRef.current;

      for (let i = 0; i < boxes.length; i++) {
        if (boxes[i] && classes[i] && scores[i] > 0.95) {
          const character = String.fromCharCode(classes[i] + 97).toUpperCase();

          if (
            updatedTranslatedText[updatedTranslatedText.length - 1] !==
            character
          ) {
            // Only add character if it's not repetitive
            updatedTranslatedText += " " + character;
          }
        }
      }

      setTranslatedText(updatedTranslatedText);

      translatedTextRef.current = updatedTranslatedText;

      // Dispose tensors to free memory
      img.dispose();
      resized.dispose();
      casted.dispose();
      expanded.dispose();
      obj.forEach((tensor) => tensor.dispose());

      requestRef.current = requestAnimationFrame(() => runModel(model));
    },
    [translatedTextRef],
  );

  useEffect(() => {
    // Update the state with the translated text stored in the ref
    setTranslatedText(translatedTextRef.current);
  }, [translatedTextRef]);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const model = await tf.loadGraphModel(
          "https://storage.googleapis.com/gestureconnect-web-model-bucket/model.json",
        );
        setModelLoaded(true);
        requestRef.current = requestAnimationFrame(() => runModel(model));

        console.log("Model loaded");
      } catch (error) {
        console.error("Error loading TensorFlow.js model:", error);

        const notification: INotification = {
          message:
            "An error occurred while loading the TensorFlow.js model. Please try refreshing the page.",
          type: "error",
        };

        setNotification(notification);
      }
    };

    if (!modelLoaded) {
      loadModel();
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }

      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
    };
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

      mediaRecorderRef.current.start();
    } catch (e) {
      console.error("Exception while creating MediaRecorder:", e);

      setNotification({
        message:
          "An error occurred while starting video recording. Please try again.",
        type: "error",
      });
    }
  }, [setIsCapturing]);

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
        onUserMedia={handleWebcamCapture} // Execute handleWebcamCapture when stream is successfully loaded
        onUserMediaError={onUserMediaError} // Handle errors, including permission denied
      />

      {translatedText && (
        <div className="flex items-center justify-center mt-4 px-3 py-2 border-2 rounded-md w-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-700 focus:border-blue-500 dark:focus:border-blue-600 font-medium text-2xl break-all">
          {translatedText}
        </div>
      )}
    </>
  );
};

export default WebcamStreamCapture;
