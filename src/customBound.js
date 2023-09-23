import React, { memo, useRef, useEffect, useState } from "react";
import { Handle, NodeProps, Position } from "reactflow";

const CustomBound = ({ data }) => {
  const [isEditVisible2, setIsEditVisible2] = useState(false);
  const [isArrowVisible, setIsArrowVisible] = useState(false);
  const [inputText2, setInputText2] = useState(data.boundText);

  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectStart = () => {
    setIsConnecting(true);
  };

  const handleConnectStop = () => {
    setIsConnecting(false);
  };

  const handleInput2 = (e) => {
    const newText = e.target.value;
    setInputText2(newText);
    data.boundText = newText;
  };

  const [nodeBgE2, setNodeBgE2] = useState(data.backgroundColorB);

  const toggleEditVisibility2 = () => {
    setIsEditVisible2(!isEditVisible2);
  };
  const [borderS2, setBorderS2] = useState(data.border);
  const isDivVisible = () => {
    // Show "arrow4"
    setIsArrowVisible(true);

    // Hide "arrow4" after 5 seconds
    setTimeout(() => {
      setIsArrowVisible(false);
    }, 5000);
    if (borderS2 === "") {
      setBorderS2("3px solid yellow");
      data.border = "3px solid yellow"; // Update data.border
    } else {
      setBorderS2("");
      data.border = ""; // Update data.border
    }
  };

  const handleEditButtonClick = (e) => {
    e.stopPropagation(); // Stop the click event from propagating to the parent div
    toggleEditVisibility2();
  };

  const handleNodeBackgroundEdit2 = (event) => {
    if (event.target.value === "option12E") {
      setNodeBgE2("#B0C4DE");
    } else if (event.target.value === "option11E") {
      setNodeBgE2("white");
    } else if (event.target.value === "option13E") {
      setNodeBgE2("#FFEBCD");
    } else if (event.target.value === "option14E") {
      setNodeBgE2("#E6E6FA");
    } else if (event.target.value === "option15E") {
      setNodeBgE2("#C8E4B2");
    } else if (event.target.value === "option16E") {
      setNodeBgE2("#B4E4FF");
    } else if (event.target.value === "option17E") {
      setNodeBgE2("#F7C8E0");
    } else if (event.target.value === "option18E") {
      setNodeBgE2("#FFF6BD");
    } else if (event.target.value === "option19E") {
      setNodeBgE2("#FFD580");
    } else if (event.target.value === "option20E") {
      setNodeBgE2("#AFFDE6");
    }
  };
  data.backgroundColorB = nodeBgE2;
  data.boundText = inputText2;
  return (
    <div
      className="customNode2"
      style={{
        backgroundColor: nodeBgE2,
        color: "black",
        padding: 10,
        zIndex: 20,
        shape: "circle",
        borderRadius: "100px",
        minWidth: "45px",
        border: data.border,
      }}
      onClick={isDivVisible}
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

      <Handle
        className={`custom-handle ${isConnecting ? "connecting" : ""} ${
          data.isConnectable ? "" : "non-connectable"
        }`}
        type="target"
        position={Position.Right}
        id="rightD"
      />
      <div className="nodeLayout">
        <p className="mediumB">{data.boundText}</p>

        <p
          id="arrow4"
          className={`editTag ${isArrowVisible ? "visible" : ""}`}
          onClick={handleEditButtonClick}
        >
          Edit{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 16 16"
            className={isEditVisible2 ? "rotate180" : ""}
          >
            <path
              fill="currentColor"
              d="M8 14.586 1.707 8.293a1 1 0 0 1 1.414-1.414L8 11.172l4.879-4.879a1 1 0 0 1 1.414 1.414L8 14.586z"
            />
          </svg>
        </p>
        <div className={`moreInfo  ${isEditVisible2 ? "slideDown2" : ""}`}>
          <p className="label">Background color:</p>
          <select
            className="dropdownNodeBackground"
            onChange={handleNodeBackgroundEdit2}
            onClick={(e) => e.stopPropagation()}
          >
            <option id="divback11" value="option11E">
              Default (White)
            </option>
            <option id="divback12" value="option12E">
              Light Grey
            </option>
            <option id="divback13" value="option13E">
              Light Brown
            </option>
            <option id="divback14" value="option14E">
              Light Purple
            </option>
            <option id="divback15" value="option15E">
              Light Green
            </option>
            <option id="divback16" value="option16E">
              Light Blue
            </option>
            <option id="divback17" value="option17E">
              Light Red
            </option>
            <option id="divback18" value="option18E">
              Light Yellow
            </option>
            <option id="divback19" value="option19E">
              Light Orange
            </option>
            <option id="divback19" value="option20E">
              Light Aquamarine
            </option>
          </select>

          <p>
            Edit name: <span />
            <input
              type="text"
              className="inputCreate"
              value={inputText2} // Bind input value to the state variable
              onChange={handleInput2} // Bind input change event to handler
              onClick={(e) => e.stopPropagation()}
            />
          </p>
        </div>
      </div>
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
export default memo(CustomBound);
