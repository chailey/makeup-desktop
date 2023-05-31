import { Button, Flex } from "@mantine/core";
import * as tf from "@tensorflow/tfjs";
import * as faceapi from "@vladmandic/face-api";
import { MutableRefObject, useRef, useState } from "react";
const modelPath = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/";
const minScore = 0.2; // minimum score
const maxResults = 5; // maximum number of results to return
let optionsSSDMobileNet: any = null;

interface VideoStreamProps {
  colorHex: string;
}

export const VideoStream = ({ colorHex }: VideoStreamProps) => {
  const refSelfVideo: MutableRefObject<HTMLVideoElement | null> = useRef(null);
  const [connected, setConnected] = useState(false);

  const setupTF = async () => {
    await tf.setBackend("webgl");
    await tf.ready();
    tf.env().registerFlag("CANVAS2D_WILL_READ_FREQUENTLY", () => {
      return true;
    });
    tf.env().registerFlag("WEBGL_EXP_CONV", () => {
      return true;
    });
  };

  async function setupFaceAPI() {
    // load face-api models
    // log('Models loading');
    await faceapi.nets.ssdMobilenetv1.loadFromUri(modelPath);
    await faceapi.nets.faceLandmark68Net.loadFromUri(modelPath);
    optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({
      minConfidence: minScore,
      maxResults,
    });
  }

  function drawFaces(
    canvas: HTMLCanvasElement,
    data: faceapi.WithFaceLandmarks<
      {
        detection: faceapi.FaceDetection;
      },
      faceapi.FaceLandmarks68
    >[]
  ) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw title

    for (const person of data) {
      // draw face points for each face
      ctx.globalAlpha = 1;
      ctx.fillStyle = colorHex;
      const pointSize = 2;
      for (
        let i = person.landmarks.positions.length - 20;
        i < person.landmarks.positions.length;
        i++
      ) {
        ctx.beginPath();
        ctx.arc(
          person.landmarks.positions[i].x,
          person.landmarks.positions[i].y,
          pointSize,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
    }
  }

  async function detectVideo(
    video: HTMLVideoElement,
    canvas: HTMLCanvasElement
  ) {
    if (!video || video.paused) return false;
    const res = await faceapi
      .detectAllFaces(video, optionsSSDMobileNet)
      .withFaceLandmarks();
    drawFaces(canvas, res);
    requestAnimationFrame(() => detectVideo(video, canvas));
    return true;
  }

  const connect = async () => {
    const selfMediaStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });
    await setupTF();
    await setupFaceAPI();

    const canvas: HTMLCanvasElement = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement;
    const video: HTMLVideoElement = document.getElementById(
      "video"
    ) as HTMLVideoElement;

    refSelfVideo.current!.srcObject = selfMediaStream;
    const track = selfMediaStream.getVideoTracks()[0];
    const settings = track.getSettings();
    if (settings.deviceId) delete settings.deviceId;
    if (settings.groupId) delete settings.groupId;
    if (settings.aspectRatio)
      settings.aspectRatio = Math.trunc(100 * settings.aspectRatio) / 100;

    return new Promise((resolve) => {
      video.onloadeddata = async () => {
        if (canvas) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        video.play();
        detectVideo(video, canvas);
        resolve(true);
      };
    });
  };

  const disconnect = async () => {
    const selfMediaStream = refSelfVideo.current!.srcObject as MediaStream;
    selfMediaStream.getTracks().forEach((track) => track.stop());
    refSelfVideo.current!.srcObject = null;
  };

  const toggleConnection = async () => {
    if (connected) {
      await disconnect();
      setConnected(false);
    } else {
      await connect();
      setConnected(true);
    }
  };

  return (
    <Flex justify={"center"} direction={"column"} maw={"400px"}>
      <Button
        variant="outline"
        color="red"
        radius="md"
        size="xl"
        mt={40}
        onClick={toggleConnection}
      >
        Toggle
      </Button>

      <div className="container" style={{ justifyContent: "center" }}>
        <canvas
          id="canvas"
          className="canvas"
          style={{ position: "absolute" }}
        ></canvas>
        <video
          id="video"
          ref={refSelfVideo}
          autoPlay
          muted
          playsInline
          className="video"
        ></video>
      </div>
    </Flex>
  );
};
