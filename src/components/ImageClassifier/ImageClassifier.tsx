import React, { useEffect, useRef } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';

const ImageClassifier = () => {
  const netRef = useRef(null);
  const camera = useRef(null);
  const figures = useRef(null);

  const run = async () => {
    const net = await mobilenet.load();
    netRef.current = net;

    if (camera.current) {
      const webcam = await tf.data.webcam(camera.current, {
        resizeWidth: 220,
        resizeHeight: 227,
      });

      const classifyImage = async () => {
        if (!netRef.current) return;

        const img = await webcam.capture();
        const result = await netRef.current.classify(img);

        if (figures.current) {
          figures.current.innerText = `Prediction: ${result[0].className}\nProbability: ${result[0].probability.toFixed(2)}`;
        }

        img.dispose();

        // Request next frame for classification
        requestAnimationFrame(classifyImage);
      };

      // Start the classification
      classifyImage();
    }
  };
  
  useEffect(() => {
    run();
  }, []);

  return (
    <>
      <div ref={figures}></div>
      <video
        autoPlay
        playsInline
        muted
        ref={camera}
        width="870"
        height="534"
      />
    </>
  );
};

export default ImageClassifier;
