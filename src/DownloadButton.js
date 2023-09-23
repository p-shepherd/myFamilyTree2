import React from "react";
import {
  Panel,
  useReactFlow,
  getRectOfNodes,
  getTransformForBounds,
} from "reactflow";
import { toSvg, toPdf } from "html-to-image";
import AppWithProvider from "./App";

import "./styles.css";

function downloadImage(dataUrl) {
  const a = document.createElement("a");

  a.setAttribute("download", "myFamilyTree.svg");
  a.setAttribute("href", dataUrl);
  a.click();
}

const imageWidth = 4096;
const imageHeight = 3072;

function DownloadButton() {
  const { getNodes } = useReactFlow();
  const onClick = () => {
    // we calculate a transform for the nodes so that all nodes are visible
    // we then overwrite the transform of the `.react-flow__viewport` element
    // with the style option of the html-to-image library
    const nodesBounds = getRectOfNodes(getNodes());
    const transform = getTransformForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2,
    );

    toSvg(document.querySelector(".react-flow__viewport"), {
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    })
      .then(downloadImage)
      .catch((error) => {
        console.error(error); // Log the error to the console
        // You can add additional error handling code here if needed
      });
  };

  return (
    <button className="download-btn" onClick={onClick}>
      Download Image
    </button>
  );
}

export default DownloadButton;
