import { useCallback, useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";

import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  applyEdgeChanges,
  applyNodeChanges,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useReactFlow,
  useStoreApi,
  Handle,
  Position,
} from "reactflow";
import DownloadButton from "./DownloadButton";
import "./styles.css";

import { isEqual } from "lodash";

import { auth, firestore } from "./config/firebase"; // Import your Firebase auth and firestore instances
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { signOut } from "firebase/auth";

import CustomNode from "./customNode";

import ContextNode from "./contextNode";

import BiDirectionalEdge from "./BiDirectionalEdge.tsx";
import CustomBound from "./customBound";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import { FaList, FaRegHeart } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiChevronsRight,
  FiChevronsLeft,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { CgLogOut } from "react-icons/cg";
import { BiCog, BiLeaf, BiHelpCircle } from "react-icons/bi";
import { GiWaterDivinerStick, GiTreeBranch, GiSquirrel } from "react-icons/gi";
import { IoOptionsSharp } from "react-icons/io5";
import { BsBoxArrowLeft } from "react-icons/bs";
import { SiBuymeacoffee } from "react-icons/si";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
const edgeTypes = {
  bidirectional: BiDirectionalEdge,
};
const nodeTypes = {
  custom: CustomNode,
  bound: CustomBound,
  context: ContextNode,
};

const App = () => {
  const [user, setUser] = useState(null);

  // Use useEffect to subscribe to the Firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const navigate = useNavigate(); // Create a history object

  const tutorial = () => {
    navigate("/tutorial");
  };
  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let timer;

    if (!user || !user.email) {
      // Set a timer to logout after 10 seconds
      timer = setTimeout(() => {
        logout(); // Call the logout function after the delay
      }, 5000); // 10000 milliseconds = 10 seconds
    }

    // Clear the timer if the component unmounts or if user becomes logged in
    return () => {
      clearTimeout(timer);
    };
  }, [user, logout]);

  //nodes and edges
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  //node values
  const [inputValue, setInputValue] = useState("");
  const [inputBirth, setInputBirth] = useState("");
  const [inputDeath, setInputDeath] = useState("");
  const [inputFamily, setInputFamily] = useState("");

  const [nodeBg, setNodeBg] = useState("white");
  const [nodeBgB, setNodeBgB] = useState("white");
  const [gender, setGender] = useState("");
  //lines options
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [isContainerVisible, setIsContainerVisible] = useState(false);
  const [strokeType, setStrokeType] = useState("default");
  const [strokeColor, setStrokeColor] = useState("default");
  const [strokeDashed, setStrokeDashed] = useState("default");
  const [activeButton, setActiveButton] = useState(null);
  const [inputValue2, setInputValue2] = useState("");
  const [isChecked, setIsChecked] = useState(0);

  //select and drag

  const [toggleSwitch, setToggleSwitch] = useState(false);

  const [toggleSwitch2, setToggleSwitch2] = useState(false);

  const handleToggleSwitch2 = () => {
    setToggleSwitch2(!toggleSwitch2);
  };

  const [toggleSwitch3, setToggleSwitch3] = useState(false);
  const handleToggleSwitch3 = () => {
    setToggleSwitch3(!toggleSwitch3);
  };

  useEffect(() => {
    // Check if any node has a non-empty data.border
    const hasNonEmptyBorder = nodes.some((node) => node.data.border !== "");

    // Update the toggle switch state based on the presence of non-empty borders
    setToggleSwitch(hasNonEmptyBorder);
  }, [nodes]);

  //delete nodes button
  const handleDeleteNodes = () => {
    const filteredNodes = nodes.filter((node) => node.data.border === "");
    setNodes(filteredNodes);
  };

  // Function to handle manual toggle switch changes
  const handleToggleSwitch = () => {
    // Only allow toggling off if the switch is enabled
    if (toggleSwitch) {
      setToggleSwitch(false);

      // Update the data.border property for all nodes
      const updatedNodes = nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          border: "",
        },
      }));
      setNodes(updatedNodes);
    }
  };

  for (const node of nodes) {
    // Check if the data.border property is not an empty string
    if (node.data.border !== "") {
      // If not empty, set node.selected to true
      node.selected = true;
    } else if (node.data.border === "") {
      node.selected = false;
    }
  }

  const onEdgeClick = (event, edge) => {
    setSelectedEdge({
      ...edge,
      position: {
        x: event.clientX,
        y: event.clientY,
      },
    });
    const newState = { nodes, edges };
    const newActionHistory = [
      ...actionHistory.slice(0, historyIndex + 1),
      newState,
    ];

    setActionHistory(newActionHistory);
    setHistoryIndex(newActionHistory.length - 1);
  };
  //slide
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
  const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(true);
  const [isIconVisible2, setIsIconVisible2] = useState(true);
  const [isIconVisible3, setIsIconVisible3] = useState(true);
  const [isIconVisible4, setIsIconVisible4] = useState(true);
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [isSlideVisible, setIsSlideVisible] = useState(false);

  const toggleSlideVisibility = () => {
    setIsSlideVisible(!isSlideVisible);
  };

  const toggleDropdownS1 = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsIconVisible(!isIconVisible);
  };
  const toggleDropdownS2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
    setIsIconVisible2(!isIconVisible2);
  };
  const toggleDropdownS3 = () => {
    setIsDropdownOpen3(!isDropdownOpen3);
    setIsIconVisible3(!isIconVisible3);
  };
  const toggleDropdownS4 = () => {
    setIsDropdownOpen4(!isDropdownOpen4);
    setIsIconVisible4(!isIconVisible4);
  };

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    setIsDropdownOpen(false);
    setIsDropdownOpen2(false);
    setIsDropdownOpen3(false);
    setIsDropdownOpen4(false);
    setIsIconVisible(true);
    setIsIconVisible2(true);
    setIsIconVisible3(true);
    setIsIconVisible4(true);
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked ? 1 : 0);
  };

  //bound creation
  const [inputValueB, setInputValueB] = useState("");

  //node changes

  //undo and redo doesnt work the best but works somehow for now
  const [actionHistory, setActionHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Function to listen to changes in nodes and update history

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const previousState = actionHistory[newIndex];
      setNodes(previousState.nodes);
      setEdges(previousState.edges);
      console.log("Undo action performed:", previousState);
    }
  };

  const handleRedo = () => {
    if (historyIndex < actionHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const nextState = actionHistory[newIndex];
      setNodes(nextState.nodes);
      setEdges(nextState.edges);
    }
  };

  //save and restore

  const handleSave = async () => {
    if (nodes.length < 1000) {
      try {
        const user = auth.currentUser;

        if (!user) {
          alert("You are not logged in. Please log in to save your data.");
          return;
        }

        // Create a Firestore document reference for the user's data
        const userRef = doc(firestore, "users", user.uid);

        // Update the user's data with the current nodes and edges
        await updateDoc(userRef, {
          "data.nodes": nodes,
          "data.edges": edges,
        });

        // Show a confirmation message
        alert("Flow state saved successfully!");
        console.log(nodes);
      } catch (error) {
        console.error("Error saving flow state:", error);
      }
    } else {
      alert(
        "Amount of members You've created exceeds 1000, contact me if you need to add more.",
      );
    }
  };
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Delay the execution by 1 second
    const timeoutId = setTimeout(async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          alert("You are not logged in. Please log in to restore your data.");
          return;
        }

        // Create a Firestore document reference for the user's data
        const userRef = doc(firestore, "users", user.uid);

        // Get the user's data from Firestore
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();

          if (userData.data) {
            // Update the state with the saved state data
            setNodes(userData.data.nodes);
            setEdges(userData.data.edges);

            // Show a confirmation message
            alert("Flow state restored successfully!");
            console.log(nodes);
          } else {
            alert("No flow state data found for the user.");
          }
        } else {
          alert("No user data found.");
        }

        // Set initialized to true after the data restoration
        setInitialized(true);
      } catch (error) {
        console.error("Error restoring flow state:", error);
      }
    }, 2000); // 1000 milliseconds = 1 second

    // Cleanup the timeout if the component unmounts or if initialized changes
    return () => clearTimeout(timeoutId);
  }, []);
  const handleRestore = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("You are not logged in. Please log in to restore your data.");
        return;
      }

      // Create a Firestore document reference for the user's data
      const userRef = doc(firestore, "users", user.uid);

      // Get the user's data from Firestore
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();

        if (userData.data) {
          // Update the state with the saved state data
          setNodes(userData.data.nodes);
          setEdges(userData.data.edges);

          // Show a confirmation message
          alert("Flow state restored successfully!");
        } else {
          alert("No flow state data found for the user.");
        }
      } else {
        alert("No user data found.");
      }
    } catch (error) {
      console.error("Error restoring flow state:", error);
    }
  };

  // Use useEffect to log nodes after it has been updated

  const handleSelectChange = (event) => {
    if (event.target.value === "option1") {
      setStrokeColor("green");
    } else if (event.target.value === "option2") {
      setStrokeColor("blue");
    } else if (event.target.value === "option3") {
      setStrokeColor("orange");
    } else if (event.target.value === "option4") {
      setStrokeColor("red");
    } else if (event.target.value === "option5") {
      setStrokeColor("purple");
    } else if (event.target.value === "option6") {
      setStrokeColor("black");
    }
  };

  const toggleContainerVisibility = () => {
    setIsContainerVisible(!isContainerVisible);
  };
  let strokeW = 2.5;
  //edge style
  let strokeThings = {
    stroke: strokeColor,
    strokeDasharray: strokeDashed,
    strokeWidth: strokeW,
  };

  const handleChangeStyle1 = () => {
    setStrokeType("default");
    setStrokeDashed("0");
  };
  const handleChangeStyle2 = () => {
    setStrokeType("smoothstep");
    setStrokeDashed("0");
  };
  const handleChangeStyle3 = () => {
    setStrokeType("default");
    setStrokeDashed("5");
  };
  const handleChangeStyle4 = () => {
    setStrokeType("smoothstep");
    setStrokeDashed("5");
  };

  const handleChangeStyle5 = () => {
    setStrokeType("straight");
    setStrokeDashed("0");
  };

  const handleChangeStyle6 = () => {
    setStrokeType("straight");
    setStrokeDashed("5");
  };

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
    if (buttonId === "button1") {
      handleChangeStyle1();
    } else if (buttonId === "button2") {
      handleChangeStyle2();
      console.log("type of stroke has been set to smoothstep");
    } else if (buttonId === "button3") {
      handleChangeStyle3();
    } else if (buttonId === "button4") {
      handleChangeStyle4();
    } else if (buttonId === "button5") {
      handleChangeStyle5();
    } else if (buttonId === "button6") {
      handleChangeStyle6();
    }
  };
  const randomEdge = edges.length + 1;

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      const newEdges = edges.map((edge) =>
        edge.id === oldEdge.id ? { ...edge, ...newConnection } : edge,
      );
      setEdges(newEdges);

      const newState = { nodes, edges };
      const newActionHistory = [
        ...actionHistory.slice(0, historyIndex + 1),
        newState,
      ];

      setActionHistory(newActionHistory);
      setHistoryIndex(newActionHistory.length - 1);
    },
    [
      setEdges,
      nodes,
      edges,
      actionHistory,
      historyIndex,
      setActionHistory,
      setHistoryIndex,
    ],
  );

  const onConnect = useCallback((connection) => {
    console.log("Connected:", connection);

    const newEdge = {
      id: randomEdge,
      ...connection,
      style: strokeThings,
      type: strokeType,
      label: inputValue2,
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelStyle: { fontSize: "20px" },
      labelBgStyle: {
        fill: "orange",
        color: "black",
        fillOpacity: 0.9,
        fontSize: "15px",
      },
    }; // Add style property with desired color
    setEdges((prevEdges) => [...prevEdges, newEdge]);
    console.log(newEdge);
    console.log(edges);
    const newState = { nodes, edges };
    const newActionHistory = [
      ...actionHistory.slice(0, historyIndex + 1),
      newState,
    ];

    setActionHistory(newActionHistory);
    setHistoryIndex(newActionHistory.length - 1);

    [
      setEdges,
      nodes,
      edges,
      inputValue2,
      strokeThings,
      strokeType,
      randomEdge,
      actionHistory,
      historyIndex,
      setActionHistory,
      setHistoryIndex,
    ];
  });

  const onNodesChange = useCallback(
    (changes) => setNodes((prevNodes) => applyNodeChanges(changes, prevNodes)),

    [setNodes],
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((prevEdges) => applyEdgeChanges(changes, prevEdges)),
    [setEdges],
  );
  const handleSelectChangeGender = (event) => {
    if (event.target.value === "option23" && isChecked > 0) {
      setGender("Female");

      setNodeBg("#F7C8E0");
    } else if (event.target.value === "option22" && isChecked > 0) {
      setGender("Male");
      setNodeBg("#B4E4FF");
    } else if (event.target.value === "option22") {
      setGender("Male");
    } else if (event.target.value === "option23") {
      setGender("Female");
    } else if (event.target.value === "option21") {
      setNodeBg("white");
      setGender("");
    }
  };

  const handleBoundBackground = (event) => {
    if (event.target.value === "option12") {
      setNodeBgB("#B0C4DE");
    } else if (event.target.value === "option11") {
      setNodeBgB("white");
    } else if (event.target.value === "option13") {
      setNodeBgB("#FFEBCD");
    } else if (event.target.value === "option14") {
      setNodeBgB("#E6E6FA");
    } else if (event.target.value === "option15") {
      setNodeBgB("#C8E4B2");
    } else if (event.target.value === "option16") {
      setNodeBgB("#B4E4FF");
    } else if (event.target.value === "option17") {
      setNodeBgB("#F7C8E0");
    } else if (event.target.value === "option18") {
      setNodeBgB("#FFF6BD");
    } else if (event.target.value === "option19") {
      setNodeBgB("#FFD580");
    } else if (event.target.value === "option20") {
      setNodeBgB("#AFFDE6");
    }
  };
  const handleNodeBackground = (event) => {
    if (event.target.value === "option12") {
      setNodeBg("#B0C4DE");
    } else if (event.target.value === "option11") {
      setNodeBg("white");
    } else if (event.target.value === "option13") {
      setNodeBg("#FFEBCD");
    } else if (event.target.value === "option14") {
      setNodeBg("#E6E6FA");
    } else if (event.target.value === "option15") {
      setNodeBg("#C8E4B2");
    } else if (event.target.value === "option16") {
      setNodeBg("#B4E4FF");
    } else if (event.target.value === "option17") {
      setNodeBg("#F7C8E0");
    } else if (event.target.value === "option18") {
      setNodeBg("#FFF6BD");
    } else if (event.target.value === "option19") {
      setNodeBg("#FFD580");
    } else if (event.target.value === "option20") {
      setNodeBg("#AFFDE6");
    }
  };

  const handleBound = (event) => {
    // Use inputValue to create a custom node
    const position = calculateNodePosition();

    const newNode = {
      id: uuidv4() + uuidv4(),
      type: "bound",
      data: {
        boundText: inputValueB,
        border: "",
        backgroundColorB: nodeBgB,
      },
      position: {
        x: position.x, // Adjust as needed to position the node
        y: position.y, // Adjust as needed to position the node
      },
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
    setInputValueB(""); // Clear the input field after creating the node

    const newState = { nodes, edges };
    const newActionHistory = [
      ...actionHistory.slice(0, historyIndex + 1),
      newState,
    ];

    setActionHistory(newActionHistory);
    setHistoryIndex(newActionHistory.length - 1);
  };

  const store = useStoreApi();

  let currentOverlapOffset = 0;
  const OVERLAP_OFFSET = 10;
  const NODE_WIDTH = 116;
  const NODE_HEIGHT = 28;

  const redirectToWebsite = () => {
    // Replace 'https://example.com' with the URL you want to open in a new tab.
    const newTab = window.open(
      "https://www.buymeacoffee.com/paulpetershepherd",
      "_blank",
    );
    if (newTab) {
      newTab.focus();
    }
  };

  const calculateNodePosition = () => {
    const {
      height,
      width,
      transform: [transformX, transformY, zoomLevel],
    } = store.getState();
    const zoomMultiplier = 1 / zoomLevel;
    const centerX = -transformX * zoomMultiplier + (width * zoomMultiplier) / 2;
    const centerY =
      -transformY * zoomMultiplier + (height * zoomMultiplier) / 2;
    const nodeWidthOffset = NODE_WIDTH / 2;
    const nodeHeightOffset = NODE_HEIGHT / 2;

    return {
      x: centerX - nodeWidthOffset + currentOverlapOffset,
      y: centerY - nodeHeightOffset + currentOverlapOffset,
    };
  };

  const createContext = () => {
    // Use inputValue to create a custom node

    // Calculate the position of the new node based on the viewport dimensions and scroll position
    const position = calculateNodePosition();

    const newNode = {
      id: uuidv4(),
      type: "context",
      data: {
        text: "Add context here",
      },
      position: {
        x: position.x,
        y: position.y,
      },
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);

    const newState = { nodes, edges };
    const newActionHistory = [
      ...actionHistory.slice(0, historyIndex + 1),
      newState,
    ];

    setActionHistory(newActionHistory);
    setHistoryIndex(newActionHistory.length - 1);
  };
  // Update your handleCreate function to use the calculated position
  const handleCreate = () => {
    // Use inputValue to create a custom node

    // Calculate the position of the new node based on the viewport dimensions and scroll position
    const position = calculateNodePosition();

    const newNode = {
      id: uuidv4(),
      type: "custom",
      data: {
        text: inputValue,
        birth: inputBirth,
        death: inputDeath,
        family: inputFamily,
        backgroundColor: nodeBg,
        gender: gender,
        border: "",
        imgSrc: "",
      },
      position: {
        x: position.x,
        y: position.y,
      },
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
    setInputValue(""); // Clear the input field after creating the node

    const newState = { nodes, edges };
    const newActionHistory = [
      ...actionHistory.slice(0, historyIndex + 1),
      newState,
    ];

    setActionHistory(newActionHistory);
    setHistoryIndex(newActionHistory.length - 1);
  };

  const snapGrid = [20, 20];
  return (
    <div className={toggleSwitch2 ? "enabled" : "disabled"}>
      <div className="App">
        <ReactFlow
          snapToGrid={true}
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onEdgeUpdate={onEdgeUpdate}
          onEdgeClick={onEdgeClick}
          handleSave={handleSave}
          handleRestore={handleRestore}
          snapGrid={snapGrid}
          fitView
        >
          <div id="header">
            {/* collapsed props to change menu size using menucollapse state */}
            <div
              id="sidebar-container"
              className={menuCollapse ? "collapsed" : ""}
            >
              <ProSidebar collapsed={menuCollapse}>
                <div className="logotext2">
                  {/* small and big change using menucollapse state */}
                  <p style={{ padding: 0 }}>
                    {menuCollapse ? (
                      <img
                        src="https://svgur.com/i/xtb.svg"
                        style={{
                          padding: "0px",
                          margin: "0px",
                          width: "60px",
                          display: "flex",
                          alignItem: "center",
                          marginLeft: "5px",
                        }}
                      />
                    ) : (
                      <img
                        src="https://svgur.com/i/xtR.svg"
                        style={{
                          padding: "0px",
                          margin: "0px",
                          width: "90%",
                          display: "flex",
                          alignItem: "center",
                          marginLeft: "5px",
                        }}
                      />
                    )}
                  </p>
                  <hr style={{ padding: 0, margin: 0 }} />
                </div>

                <div className="closemenu" onClick={menuIconClick}>
                  {/* changing menu collapse icon on click */}
                  {menuCollapse ? (
                    <FiChevronsRight />
                  ) : (
                    <FiChevronsLeft style={{ marginTop: "-22px" }} />
                  )}
                </div>

                <Menu iconShape="circle" id="iconhome">
                  <MenuItem
                    icon={
                      isIconVisible && (
                        <BiLeaf
                          className={`opti2 ${
                            menuCollapse ? "unclickable" : ""
                          }`} // Add or remove "unclickable" class based on menuCollapse
                          onClick={menuCollapse ? null : toggleDropdownS1} // Disable onClick when menuCollapse is true
                        />
                      )
                    }
                  >
                    <div id="hi" active={isDropdownOpen}>
                      <div
                        onClick={toggleDropdownS1}
                        className={`diVson ${isDropdownOpen ? "open" : ""}`}
                      >
                        <p
                          style={{ margin: 0, marginLeft: 5 }}
                          onClick={toggleDropdownS1}
                        >
                          Creating Member
                        </p>
                      </div>
                      {isDropdownOpen && (
                        <div className="upAbove">
                          <input
                            id="inputField"
                            type="text"
                            placeholder="Type the name of family member "
                            className="inputCreate"
                            value={inputValue} // Bind input value to the state variable
                            onChange={(e) => setInputValue(e.target.value)} // Bind input change event to handler
                          />
                          <p id="pnone3" onClick={toggleSlideVisibility}>
                            Click to add specific info{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              className={isSlideVisible ? "rotate180" : ""}
                            >
                              <path
                                fill="currentColor"
                                d="M8 14.586 1.707 8.293a1 1 0 0 1 1.414-1.414L8 11.172l4.879-4.879a1 1 0 0 1 1.414 1.414L8 14.586z"
                              />
                            </svg>
                          </p>
                          <div
                            className={`downSlide ${
                              isSlideVisible ? "slideDown" : "slideUp"
                            }`}
                          >
                            <div className="inputContainer">
                              <div>
                                <p className="label">Date of birth:</p>
                                <input
                                  className="dateInput"
                                  type="text"
                                  placeholder="day-month-year"
                                  id="dateInput1"
                                  value={inputBirth}
                                  onChange={(e) =>
                                    setInputBirth(e.target.value)
                                  }
                                />
                              </div>
                              <div>
                                <p className="label">Date of death:</p>
                                <input
                                  className="dateInput"
                                  type="text"
                                  placeholder="day-month-year"
                                  id="dateInput2"
                                  value={inputDeath}
                                  onChange={(e) =>
                                    setInputDeath(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div id="szin">
                              <p className="label">Family Name: </p>
                              <input
                                type="text"
                                placeholder="Enter family name"
                                className="dateInput"
                                id="familyNameInput"
                                value={inputFamily}
                                onChange={(e) => setInputFamily(e.target.value)}
                              />
                            </div>
                            <div id="szin">
                              <p className="label">Background color:</p>
                              <select
                                className="dropdownNodeBackground"
                                onChange={handleNodeBackground}
                              >
                                <option id="divback11" value="option11">
                                  Default (White)
                                </option>
                                <option id="divback12" value="option12">
                                  Light Grey
                                </option>
                                <option id="divback13" value="option13">
                                  Light Brown
                                </option>
                                <option id="divback14" value="option14">
                                  Light Purple
                                </option>
                                <option id="divback15" value="option15">
                                  Light Green
                                </option>
                                <option id="divback16" value="option16">
                                  Light Blue
                                </option>
                                <option id="divback17" value="option17">
                                  Light Red
                                </option>
                                <option id="divback18" value="option18">
                                  Light Yellow
                                </option>
                                <option id="divback19" value="option19">
                                  Light Orange
                                </option>
                                <option id="divback19" value="option20">
                                  Light Aquamarine
                                </option>
                              </select>
                            </div>
                            <div id="szin">
                              <p className="label">Gender:</p>
                              <select
                                onChange={handleSelectChangeGender}
                                className="dropdownNodeBackground"
                              >
                                <option id="gender1" value="option21">
                                  -
                                </option>
                                <option id="gender2" value="option22">
                                  Male
                                </option>
                                <option id="gender3" value="option23">
                                  Female
                                </option>
                              </select>
                            </div>
                          </div>
                          <button onClick={handleCreate} className="Rinko">
                            Click to create a new Member
                          </button>
                        </div>
                      )}
                    </div>
                  </MenuItem>
                  {menuCollapse ? (
                    <hr style={{ border: "1px ridged grey" }} />
                  ) : (
                    <hr />
                  )}
                  <MenuItem
                    active={isDropdownOpen2}
                    icon={
                      isIconVisible2 && (
                        <GiTreeBranch
                          className={`opti2 ${
                            menuCollapse ? "unclickable" : ""
                          }`} // Add or remove "unclickable" class based on menuCollapse
                          onClick={menuCollapse ? null : toggleDropdownS1} // Disable onClick when menuCollapse is true
                        />
                      )
                    }
                  >
                    <div id="hi">
                      <div
                        onClick={toggleDropdownS2}
                        className={`diVson2 ${isDropdownOpen2 ? "open" : ""}`}
                      >
                        <p style={{ margin: 0 }} onClick={toggleDropdownS2}>
                          Creating Bound
                        </p>
                      </div>

                      {isDropdownOpen2 && (
                        <div className="upAboveb">
                          <input
                            id="inputFieldB"
                            type="text"
                            placeholder="Type the name of the bound"
                            className="inputCreateB"
                            value={inputValueB} // Bind input value to the state variable
                            onChange={(e) => setInputValueB(e.target.value)} // Bind input change event to handler
                          />
                          <div id="szin3">
                            <p className="label">Background color:</p>
                            <select
                              className="dropdownNodeBackground"
                              onChange={handleBoundBackground}
                            >
                              <option id="divback11" value="option11">
                                Default (White)
                              </option>
                              <option id="divback12" value="option12">
                                Light Grey
                              </option>
                              <option id="divback13" value="option13">
                                Light Brown
                              </option>
                              <option id="divback14" value="option14">
                                Light Purple
                              </option>
                              <option id="divback15" value="option15">
                                Light Green
                              </option>
                              <option id="divback16" value="option16">
                                Light Blue
                              </option>
                              <option id="divback17" value="option17">
                                Light Red
                              </option>
                              <option id="divback18" value="option18">
                                Light Yellow
                              </option>
                              <option id="divback19" value="option19">
                                Light Orange
                              </option>
                              <option id="divback19" value="option20">
                                Light Aquamarine
                              </option>
                            </select>
                          </div>
                          <button className="Binko" onClick={handleBound}>
                            Click to create a new bound
                          </button>
                        </div>
                      )}
                    </div>
                  </MenuItem>
                  {menuCollapse ? (
                    <hr style={{ border: "1px ridged grey" }} />
                  ) : (
                    <hr />
                  )}
                  <MenuItem
                    active={isDropdownOpen3}
                    icon={
                      isIconVisible3 && (
                        <IoOptionsSharp
                          className={`opti2 ${
                            menuCollapse ? "unclickable" : ""
                          }`} // Add or remove "unclickable" class based on menuCollapse
                          onClick={menuCollapse ? null : toggleDropdownS1} // Disable onClick when menuCollapse is true
                        />
                      )
                    }
                  >
                    <div id="hi">
                      <div
                        onClick={toggleDropdownS3}
                        className={`diVson3 ${isDropdownOpen3 ? "open" : ""}`}
                      >
                        <p style={{ margin: 0 }} onClick={toggleDropdownS3}>
                          Lines Options
                        </p>
                      </div>

                      {isDropdownOpen3 && (
                        <div className="upAboveC">
                          <div className="button-container2">
                            <p>Pick the style of your line</p>
                            <div className="topB">
                              <button
                                id="button1"
                                onClick={() => handleButtonClick("button1")}
                                className={
                                  activeButton === "button1" ? "active" : ""
                                }
                              >
                                Default
                              </button>

                              <button
                                id="button2"
                                onClick={() => handleButtonClick("button2")}
                                className={
                                  activeButton === "button2" ? "active" : ""
                                }
                              >
                                Step
                              </button>
                            </div>
                            <div className="bottomB">
                              <button
                                id="button3"
                                onClick={() => handleButtonClick("button3")}
                                className={
                                  activeButton === "button3" ? "active" : ""
                                }
                              >
                                Dashed
                              </button>

                              <button
                                id="button4"
                                onClick={() => handleButtonClick("button4")}
                                className={
                                  activeButton === "button4" ? "active" : ""
                                }
                              >
                                StepDashed
                              </button>
                            </div>
                            <div className="bottomB">
                              <button
                                id="button5"
                                onClick={() => handleButtonClick("button5")}
                                className={
                                  activeButton === "button5" ? "active" : ""
                                }
                              >
                                Straight
                              </button>

                              <button
                                id="button6"
                                onClick={() => handleButtonClick("button6")}
                                className={
                                  activeButton === "button6" ? "active" : ""
                                }
                              >
                                Straight Dashed
                              </button>
                            </div>
                            <select
                              className="dropdown"
                              onChange={handleSelectChange}
                            >
                              <option disabled selected value="">
                                Pick Line Color
                              </option>
                              <option id="optionygre" value="option1">
                                Green
                              </option>
                              <option id="optionybl" value="option2">
                                Blue
                              </option>
                              <option id="optionory" value="option3">
                                Orange
                              </option>
                              <option id="optionyred" value="option4">
                                Red
                              </option>
                              <option id="optionyrer" value="option5">
                                Purple
                              </option>
                              <option id="optiony23" value="option6">
                                Default Black
                              </option>
                            </select>
                            <p>Input text you want to be on the line</p>
                            <input
                              id="inputFieldc"
                              placeholder="Input text"
                              type="text"
                              value={inputValue2}
                              onChange={(e) => setInputValue2(e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </MenuItem>
                  {menuCollapse ? (
                    <hr style={{ border: "1px ridged grey" }} />
                  ) : (
                    <hr />
                  )}
                  <MenuItem
                    active={isDropdownOpen4}
                    icon={
                      isIconVisible4 && (
                        <GiSquirrel
                          className={`opti2 ${
                            menuCollapse ? "unclickable" : ""
                          }`} // Add or remove "unclickable" class based on menuCollapse
                          onClick={menuCollapse ? null : toggleDropdownS1} // Disable onClick when menuCollapse is true
                        />
                      )
                    }
                  >
                    <div id="hi">
                      <div
                        onClick={toggleDropdownS4}
                        className={`diVson4 ${isDropdownOpen4 ? "open" : ""}`}
                      >
                        <p style={{ margin: 0 }} onClick={toggleDropdownS4}>
                          Helpers
                        </p>
                      </div>

                      {isDropdownOpen4 && (
                        <div className="upAboveD">
                          <div className="checkbox-container">
                            <input
                              id="checkbox1"
                              type="checkbox"
                              checked={isChecked === 1}
                              onChange={handleCheckboxChange}
                            />
                            <label htmlFor="checkbox1">
                              Preset background gender
                            </label>
                          </div>

                          <div className="toggle-switch-container">
                            <input
                              id="toggle-switch"
                              type="checkbox"
                              checked={toggleSwitch}
                              onChange={handleToggleSwitch}
                              disabled={!toggleSwitch}
                            />
                            <label htmlFor="toggle-switch">
                              Select and move members
                            </label>
                          </div>
                          <div className="toggle-switch-container2">
                            <input
                              id="toggle-switch2"
                              type="checkbox"
                              checked={toggleSwitch2}
                              onChange={handleToggleSwitch2}
                            />
                            <label htmlFor="toggle-switch2">
                              Make handles bigger
                            </label>
                          </div>
                          <div>
                            <button className="delnode" onClick={createContext}>
                              Add context
                            </button>
                          </div>
                          <div>
                            <button
                              className="delnode"
                              onClick={handleDeleteNodes}
                            >
                              Delete selected members
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </MenuItem>
                  {menuCollapse ? (
                    <hr style={{ border: "1px ridged grey" }} />
                  ) : (
                    <hr />
                  )}
                  <MenuItem>
                    <div className={`hideit ${menuCollapse ? "hidden" : ""}`}>
                      {user ? (
                        <p style={{ fontWeight: "normal" }}>
                          Hello {user.email}
                        </p>
                      ) : (
                        <p>You are not logged in.</p>
                      )}
                      <p />
                      <p />
                      <p />
                      <button onClick={logout} className="logoutbtn">
                        <CgLogOut
                          style={{ fontSize: "20px", marginLeft: "5px" }}
                        />
                        Click here to logout
                      </button>
                      <button onClick={tutorial} className="tutbtn">
                        <BiHelpCircle
                          style={{ fontSize: "20px", marginLeft: "4px" }}
                        />
                        Click here to see the tutorial
                      </button>
                      <button onClick={redirectToWebsite} className="tutbtn2">
                        <SiBuymeacoffee
                          style={{ fontSize: "18px", marginLeft: "5px" }}
                        />
                        Click here to support me
                      </button>
                    </div>
                  </MenuItem>
                </Menu>

                <SidebarFooter style={{ cursor: "default" }}>
                  <Menu iconShape="circle">
                    <MenuItem>
                      <div style={{ height: "100vh" }}></div>
                    </MenuItem>
                  </Menu>
                </SidebarFooter>
              </ProSidebar>
            </div>
          </div>

          <div className="button-container">
            <button id="buttonSave" onClick={handleSave}>
              Save
            </button>
            <button id="buttonSave" onClick={handleRestore}>
              Restore
            </button>
            <button
              id="buttonUndo"
              onClick={handleUndo}
              disabled={historyIndex <= 0}
            >
              Undo
            </button>
            <button
              id="buttonUndo"
              onClick={handleRedo}
              disabled={historyIndex >= actionHistory.length - 1}
            >
              Redo
            </button>

            <DownloadButton nodes={nodes} />
          </div>
          {selectedEdge && selectedEdge.position && (
            <div>
              <div
                style={{
                  position: "fixed",
                  top: selectedEdge.position.y + 10,
                  left: selectedEdge.position.x + 10,
                  background: "white",
                  padding: "5px",
                  boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
                  zIndex: 4,
                }}
              >
                <button
                  className="rinko"
                  onClick={() => {
                    const confirmed = window.confirm(
                      "Are you sure you want to delete this edge?",
                    );
                    if (confirmed) {
                      const updatedEdges = edges.filter(
                        (e) => e.id !== selectedEdge.id,
                      );

                      setEdges(updatedEdges);
                      console.log(selectedEdge + " selected edge");
                      console.log(selectedEdge.position + " position");
                      console.log(updatedEdges);
                    }
                    setSelectedEdge(null);
                  }}
                >
                  Delete Me
                </button>
              </div>
            </div>
          )}

          <div className="controls-container">
            <Controls
              position="bottom-right"
              style={{ marginBottom: "20px" }}
            />
          </div>
          {toggleSwitch3 ? (
            <MiniMap
              nodeColor={nodeColor}
              nodeStrokeWidth={3}
              zoomable={true}
              pannable={true}
              style={{ marginRight: "50px" }}
            />
          ) : null}
          <Background
            id="1"
            gap={20}
            color="#f1f1f1"
            variant={BackgroundVariant.Lines}
          />
          <Background
            id="2"
            gap={200}
            offset={1}
            color="#ccc"
            variant={BackgroundVariant.Lines}
          />
        </ReactFlow>
      </div>
    </div>
  );
};

const AppWithProvider = () => {
  return (
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  );
};

export default AppWithProvider;
