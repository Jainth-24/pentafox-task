import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [stage, setStage] = useState("First");
  const [direction, setDirection] = useState(null);
  const [steps, setSteps] = useState(0);
  const [showBlock, setShowBlock] = useState(false);
  const [blockStage, setBlockStage] = useState("Third");
  const [position, setPosition] = useState({
    top: "0px",
    left: "0px",
    bottom: "auto",
    right: "auto",
  });
  const [blockPosition, setBlockPosition] = useState({
    top: "auto",
    left: "auto",
    bottom: "0px",
    right: "0px",
  });

  useEffect(() => {
    if (blockStage === stage) {
      handleForward();
    }
  }, [blockStage, showBlock]);

  const stages = showBlock
    ? blockStage === "First"
      ? ["Second", "Third", "Fourth"]
      : blockStage === "Second"
      ? ["First", "Third", "Fourth"]
      : blockStage === "Third"
      ? ["First", "Second", "Fourth"]
      : blockStage === "Fourth"
      ? ["First", "Second", "Third"]
      : []
    : ["First", "Second", "Third", "Fourth"];

  const updateBlockPosition = (newStage) => {
    if (newStage === "First") {
      setBlockStage("First");
      setBlockPosition({
        top: "0px",
        left: "0px",
        bottom: "auto",
        right: "auto",
      });
    } else if (newStage === "Second") {
      setBlockStage("Second");
      setBlockPosition({
        top: "0px",
        left: "auto",
        bottom: "auto",
        right: "0px",
      });
    } else if (newStage === "Third") {
      setBlockStage("Third");
      setBlockPosition({
        top: "auto",
        left: "auto",
        bottom: "0px",
        right: "0px",
      });
    } else if (newStage === "Fourth") {
      setBlockStage("Fourth");
      setBlockPosition({
        top: "auto",
        left: "0px",
        bottom: "0px",
        right: "auto",
      });
    }
  };

  const updatePosition = (newStage) => {
    if (newStage === "First") {
      setPosition({ top: "0px", left: "0px", bottom: "auto", right: "auto" });
    } else if (newStage === "Second") {
      setPosition({ top: "0px", left: "auto", bottom: "auto", right: "0px" });
    } else if (newStage === "Third") {
      setPosition({ top: "auto", left: "auto", bottom: "0px", right: "0px" });
    } else if (newStage === "Fourth") {
      setPosition({ top: "auto", left: "0px", bottom: "0px", right: "auto" });
    }
  };

  const handleForward = () => {
    let currentIndex = stages.indexOf(stage);
    let nextIndex = (currentIndex + 1) % stages.length;
    let nextStage = stages[nextIndex];

    setStage(nextStage);
    updatePosition(nextStage);

    if (direction === "backward") {
      setDirection("forward");
      setSteps(1);
    } else {
      setDirection("forward");
      setSteps(steps + 1);
      if (steps + 1 === stages.length) {
        setCount(count + 1);
        setSteps(0);
      }
    }
  };

  const handleBackward = () => {
    let currentIndex = stages.indexOf(stage);
    let prevIndex = (currentIndex - 1 + stages.length) % stages.length;
    let prevStage = stages[prevIndex];

    setStage(prevStage);
    updatePosition(prevStage);

    if (direction === "forward") {
      setDirection("backward");
      setSteps(1);
    } else {
      setDirection("backward");
      setSteps(steps + 1);
      if (steps + 1 === stages.length) {
        setCount(count === 0 ? 0 : count - 1);
        setSteps(0);
      }
    }
  };

  const handleReset = () => {
    setStage("First");
    updatePosition("First");
    setCount(0);
    setDirection(null);
    setSteps(0);
  };

  const toggleBlock = () => {
    setShowBlock((prev) => !prev);
  };

  return (
    <div className="flex items-center lg:justify-between h-screen w-screen max-md:flex-col p-2">
      <div className="relative lg:w-[80%] h-full max-md:h-[80%] max-md:w-[100%]">
        <div
          className="absolute h-12 w-12 bg-red-500 rounded"
          style={{
            position: "absolute",
            ...position,
          }}
        ></div>
        {showBlock && (
          <div
            className="absolute h-12 w-12 bg-black rounded-full"
            style={{
              position: "absolute",
              ...blockPosition,
            }}
          ></div>
        )}
      </div>

      <div className="flex max-md:flex-wrap items-center justify-between gap-5 mt-6 lg:flex-col ">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleForward}
        >
          Forward
        </button>
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleBackward}
        >
          Backward
        </button>
        <button
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={toggleBlock}
        >
          {showBlock ? "Hide Block" : "Show Block"}
        </button>

        {showBlock && (
          <select
            name="Corner"
            className="px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onChange={(e) => {
              updateBlockPosition(e.target.value);
              handleReset();
            }}
            value={blockStage}
          >
            <option value="Third">Right Bottom</option>
            <option value="Second">Right Top</option>
            <option value="First">Left Top</option>
            <option value="Fourth">Left Bottom</option>
          </select>
        )}

        <div className="text-lg font-medium w-full text-center">
          Count: {count}
        </div>
      </div>
    </div>
  );
}

export default App;
