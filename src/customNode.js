import React, { memo, useRef, useEffect, useState } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { storage, storageRef, auth } from "./config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const CustomNode = ({ data }) => {
  const [inputText, setInputText] = useState(data.text);
  const [inputTextB, setInputTextB] = useState(data.birth);
  const [inputTextD, setInputTextD] = useState(data.death);
  const [inputTextF, setInputTextF] = useState(data.family);
  const [nodeBgE, setNodeBgE] = useState(data.backgroundColor);
  const [genderE, setGenderE] = useState(data.gender);
  const [borderS, setBorderS] = useState(data.border);
  const [isConnecting, setIsConnecting] = useState(false);

  const [user, setUser] = useState(null);
  const [checker, setChecker] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [imgDisplay, setImgDisplay] = useState("");
  const [canChange, setCanChange] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const [imgUpload, setImageUpload] = useState(null);

  let userId = auth?.currentUser?.uid;

  const uploadImage = () => {
    if (imgUpload === null) return;
    const imageRef = ref(storage, `images/${userId}/${imgUpload.name + v4()}`);
    uploadBytes(imageRef, imgUpload).then(() => {
      getDownloadURL(imageRef).then((url) => {
        // place for changing url to blob url
        console.log(`Message sent to database: ${url}`);
        setImgUrl(url);
        setImgDisplay(url);
        alert("Image uploaded");
      });
    });
  };

  const handleConnectStart = () => {
    setIsConnecting(true);
  };

  const handleConnectStop = () => {
    setIsConnecting(false);
  };
  const [isEditVisible, setIsEditVisible] = useState(false);
  const handleInput = (e) => {
    const newText = e.target.value;
    setInputText(newText);
    data.text = newText;
  };

  const handleInputB = (e) => {
    const newTextb = e.target.value;
    setInputTextB(newTextb);
    data.birth = newTextb;
  };

  const handleInputD = (e) => {
    const newTextd = e.target.value;
    setInputTextD(newTextd);
    data.death = newTextd;
  };

  const handleInputF = (e) => {
    const newTextf = e.target.value;
    setInputTextF(newTextf);
    data.family = newTextf;
  };

  const handleNodeBackgroundEdit = (event) => {
    if (event.target.value === "option12E") {
      setNodeBgE("#B0C4DE");
    } else if (event.target.value === "option11E") {
      setNodeBgE("white");
    } else if (event.target.value === "option13E") {
      setNodeBgE("#FFEBCD");
    } else if (event.target.value === "option14E") {
      setNodeBgE("#E6E6FA");
    } else if (event.target.value === "option15E") {
      setNodeBgE("#C8E4B2");
    } else if (event.target.value === "option16E") {
      setNodeBgE("#B4E4FF");
    } else if (event.target.value === "option17E") {
      setNodeBgE("#F7C8E0");
    } else if (event.target.value === "option18E") {
      setNodeBgE("#FFF6BD");
    } else if (event.target.value === "option19E") {
      setNodeBgE("#FFD580");
    } else if (event.target.value === "option20E") {
      setNodeBgE("#AFFDE6");
    }
  };

  const handleSelectChangeGender = (event) => {
    if (event.target.value === "option22") {
      setGenderE("Male");
    } else if (event.target.value === "option23") {
      setGenderE("Female");
    } else if (event.target.value === "option21") {
      setGenderE("");
    }
  };
  const toggleEditVisibility = () => {
    setIsEditVisible(!isEditVisible);
    setIsArrowVisible2(false);
  };
  const [isArrowVisible2, setIsArrowVisible2] = useState(false);
  const handleNodeClick = () => {
    if (!isEditVisible) {
      setIsArrowVisible2(true);
    }
    // Hide "arrow4" after 5 seconds
    setTimeout(() => {
      setIsArrowVisible2(false);
    }, 5000);
    // Toggle the border style on a normal click
    if (borderS === "") {
      setBorderS("5px solid blue");
      data.border = "5px solid blue"; // Update data.border
    } else {
      setBorderS("");
      data.border = ""; // Update data.border
    }
  };

  const handleEditButtonClick = (e) => {
    e.stopPropagation(); // Stop the click event from propagating to the parent div
    toggleEditVisibility();
  };

  // Call the onClick callback to notify the parent component about the click event.
  data.backgroundColor = nodeBgE;
  data.gender = genderE;

  const [leftWidth, setLeftWidth] = useState(null);
  const [rightWidth, setRightWidth] = useState(null);
  const [maxHeight, setMaxHeight] = useState(null);

  useEffect(() => {
    // Calculate the width of the left and right <p> elements
    const leftElement = document.querySelector(".left");
    const rightElement = document.querySelector(".right");

    if (leftElement) {
      const leftWidth = leftElement.offsetWidth;
      setLeftWidth(leftWidth);
    }

    if (rightElement) {
      const rightWidth = rightElement.offsetWidth;
      setRightWidth(rightWidth);
    }

    // Determine the maximum height based on data
    if (data.birth === "" && data.death === "") {
      setMaxHeight("0px");
    } else {
      setMaxHeight(null); // Reset maxHeight to null if either birth or death has content
    }

    // Determine the image source based on data.gender

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const fetchData = async () => {
      // Delay for 3000ms (3 seconds)
      await delay(200);

      // Check if data.imgSrc does not include the word "firebase"
      if (!data.imgSrc.includes("firebase")) {
        data.imgSrc = imgDisplay;

        if (data.gender === "Male" && !data.imgSrc.includes("firebase")) {
          setImgDisplay(
            "https://cdn-icons-png.flaticon.com/512/149/149995.png?ga=GA1.1.1113440362.1695732305",
          );
        } else if (
          data.gender === "Female" &&
          !data.imgSrc.includes("firebase")
        ) {
          setImgDisplay(
            "https://cdn-icons-png.flaticon.com/512/149/149994.png?ga=GA1.1.1113440362.1695732305",
          );
        } else if (!data.imgSrc.includes("firebase")) {
          setImgDisplay(
            "https://cdn-icons-png.flaticon.com/512/4526/4526838.png?ga=GA1.1.1113440362.1695732305",
          );
        }
      } else {
        setImgDisplay(data.imgSrc);
      }
    };

    fetchData();
  }, [data.birth, data.death, data.gender, data.imgSrc, imgUrl]);

  // Check if both data.birth and data.death are empty
  const isBothEmpty = !data.birth && !data.death;

  const imageSize = "40px";

  // Determine the maximum width
  const calculateMaxWidth = () => {
    if (!data.birth && !data.death) {
      return "0px"; // If both birth and death are empty, set max width to 0px
    }

    const birthElement = document.querySelector(".left");
    const deathElement = document.querySelector(".right");

    if (birthElement && deathElement) {
      const birthWidth = birthElement.offsetWidth;
      const deathWidth = deathElement.offsetWidth;
      return Math.max(birthWidth, deathWidth) + "px";
    }

    return "auto"; // Default width if elements are not found
  };

  const maxWidth = calculateMaxWidth();
  return (
    <div
      className="customNode"
      style={{
        backgroundColor: nodeBgE,
        padding: 10,
        zIndex: 20,
        border: data.border,
        borderRadius: "5px",
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

      <div className="nodeLayout">
        <div className="topRow">
          <p className="left" style={{ minWidth: maxWidth, maxHeight }}>
            {data.birth}
          </p>
          <p className="profile">
            <img
              src={imgDisplay}
              alt="Gender"
              style={{ width: imageSize, height: imageSize }}
            />
          </p>
          <p className="right" style={{ minWidth: maxWidth, maxHeight }}>
            {data.death}
          </p>
        </div>
        <p className="center big">{data.text}</p>

        {data.family.length > 0 && (
          <p className="center medium">({data.family})</p>
        )}
        <p className="center small">{data.gender}</p>

        <p
          id="arrow4"
          onClick={handleEditButtonClick}
          className={`editTag ${isArrowVisible2 ? "visible" : ""}`}
        >
          Edit{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 16 16"
            className={isEditVisible ? "rotate180" : ""}
          >
            <path
              fill="currentColor"
              d="M8 14.586 1.707 8.293a1 1 0 0 1 1.414-1.414L8 11.172l4.879-4.879a1 1 0 0 1 1.414 1.414L8 14.586z"
            />
          </svg>
        </p>

        {/* edit custom node */}
        <div className={`moreInfo  ${isEditVisible ? "slideDown2" : ""}`}>
          <p id="arrow4" onClick={handleEditButtonClick}>
            Edit{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 16 16"
              className={isEditVisible ? "rotate180" : ""}
            >
              <path
                fill="currentColor"
                d="M8 14.586 1.707 8.293a1 1 0 0 1 1.414-1.414L8 11.172l4.879-4.879a1 1 0 0 1 1.414 1.414L8 14.586z"
              />
            </svg>
          </p>
          <p>
            Edit name: <span />
            <input
              type="text"
              className="inputCreate"
              value={inputText} // Bind input value to the state variable
              onChange={handleInput} // Bind input change event to handler
              onClick={(e) => e.stopPropagation()}
            />
          </p>
          <p>
            Edit date of birth: <span />
            <input
              type="text"
              className="inputCreate"
              value={inputTextB} // Bind input value to the state variable
              onChange={handleInputB} // Bind input change event to handler
              onClick={(e) => e.stopPropagation()}
            />
          </p>
          <p>
            Edit date of death: <span />
            <input
              type="text"
              className="inputCreate"
              value={inputTextD} // Bind input value to the state variable
              onChange={handleInputD} // Bind input change event to handler
              onClick={(e) => e.stopPropagation()}
            />
          </p>
          <p>
            Edit family name: <span />
            <input
              type="text"
              className="inputCreate"
              value={inputTextF} // Bind input value to the state variable
              onChange={handleInputF} // Bind input change event to handler
              onClick={(e) => e.stopPropagation()}
            />
          </p>
          <p className="label">Background color:</p>
          <select
            className="dropdownNodeBackground"
            onChange={handleNodeBackgroundEdit}
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
          <p className="label">Gender:</p>
          <select
            className="dropdownNodeBackground"
            onChange={handleSelectChangeGender}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="option21">-</option>
            <option id="gender2" value="option22">
              Male
            </option>
            <option id="gender3" value="option23">
              Female
            </option>
          </select>
          <p className="label"> Upload Picture: </p>
          <div className="imgUp">
            <input
              className="inputImg"
              type="file"
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
            />
            <button className="submitImg" onClick={uploadImage}>
              Submit Image
            </button>
          </div>
        </div>
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
export default memo(CustomNode);
