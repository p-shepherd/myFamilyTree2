import React, { memo, useRef, useEffect, useState } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { storage, storageRef, auth } from "./config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const ContextNode = ({ data }) => {
  const [inputText, setInputText] = useState(data.text);
  const [borderS, setBorderS] = useState(data.border);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isNodeClicked, setIsNodeClicked] = useState(false);
  const handleConnectStart = () => {
    setIsConnecting(true);
  };

  const handleConnectStop = () => {
    setIsConnecting(false);
  };

  const handleInput = (e) => {
    const newText = e.target.value;
    setInputText(newText);
    data.text = newText;
  };

  const formatTextWithLineBreaks = (text) => {
    if (text) {
      const chunkSize = 20;
      const regex = new RegExp(`.{1,${chunkSize}}`, "g");
      const chunks = text.match(regex);
      if (chunks) {
        return chunks.join("<br />");
      }
    }
    return "";
  };

  const handleNodeClick = () => {
    // Hide "arrow4" after 5 seconds

    // Toggle the border style on a normal click
    if (borderS === "") {
      setIsNodeClicked(!isNodeClicked);
      setBorderS("5px solid blue");
      data.border = "5px solid blue"; // Update data.border
    } else {
      setBorderS("");
      data.border = ""; // Update data.border
    }
  };

  return (
    <div
      className="customNode"
      style={{
        backgroundColor: "white",
        padding: 10,
        zIndex: 20,
        border: data.border,
        borderRadius: "2px",
        height: "auto",
      }}
      onClick={handleNodeClick} // Attach the click event handler to the node's div
    >
      <Handle
        className={`custom-handle ${isConnecting ? "connecting" : ""} ${
          data.isConnectable ? "" : "non-connectable"
        }`}
        type="source"
        position={Position.Left}
        id="leftA"
      />
      <Handle
        className={`custom-handle ${isConnecting ? "connecting" : ""} ${
          data.isConnectable ? "" : "non-connectable"
        }`}
        type="target"
        position={Position.Left}
        id="leftB"
      />
      <Handle
        className={`custom-handle ${isConnecting ? "connecting" : ""} ${
          data.isConnectable ? "" : "non-connectable"
        }`}
        type="source"
        position={Position.Right}
        id="rightC"
      />

      <div className="context-box">
        Context
        <div
          className="context-text"
          dangerouslySetInnerHTML={{
            __html: formatTextWithLineBreaks(inputText),
          }}
        ></div>
        {isNodeClicked && ( // Render the textarea only when the node is clicked
          <textarea
            value={inputText}
            onChange={handleInput}
            placeholder="Type here..."
            className="context-area"
          />
        )}
      </div>
      <Handle
        className={`custom-handle ${isConnecting ? "connecting" : ""} ${
          data.isConnectable ? "" : "non-connectable"
        }`}
        type="target"
        position={Position.Right}
        id="rightD"
      />
      <Handle
        className={`custom-handle ${isConnecting ? "connecting" : ""} ${
          data.isConnectable ? "" : "non-connectable"
        }`}
        type="source"
        position={Position.Top}
        id="topT"
      />
      <Handle
        className={`custom-handle ${isConnecting ? "connecting" : ""} ${
          data.isConnectable ? "" : "non-connectable"
        }`}
        type="target"
        position={Position.Top}
        id="topY"
      />
      <Handle
        className={`custom-handle ${isConnecting ? "connecting" : ""} ${
          data.isConnectable ? "" : "non-connectable"
        }`}
        type="source"
        position={Position.Bottom}
        id="bottomW"
      />
      <Handle
        className={`custom-handle ${isConnecting ? "connecting" : ""} ${
          data.isConnectable ? "" : "non-connectable"
        }`}
        type="target"
        position={Position.Bottom}
        id="bottomZ"
      />
    </div>
  );
};
export default memo(ContextNode);
