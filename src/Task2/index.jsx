import React, { useState, useEffect } from "react";

const Task2 = () => {
  const [snake, setSnake] = useState([
    { x: 50, y: 50 }, 
    { x: 60, y: 50 },
    { x: 70, y: 50 },
  ]);
  const [gainBox, setGainBox] = useState({ x: 100, y: 100 });
  const [direction, setDirection] = useState({ x: 10, y: 0 }); 

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          setDirection({ x: 0, y: -10 });
          break;
        case "ArrowDown":
          setDirection({ x: 0, y: 10 });
          break;
        case "ArrowLeft":
          setDirection({ x: -10, y: 0 });
          break;
        case "ArrowRight":
          setDirection({ x: 10, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      moveSnake();
    }, 500);

    return () => clearInterval(interval);
  }, [snake, direction]);

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = newSnake[newSnake.length - 1];
    const newHead = { x: head.x + direction.x, y: head.y + direction.y };
    newSnake.push(newHead);

    if (newHead.x === gainBox.x && newHead.y === gainBox.y) {
      setGainBox({
        x: Math.floor(Math.random() * 40) * 10,
        y: Math.floor(Math.random() * 40) * 10,
      });
    } else {
      
      newSnake.shift();
    }

    setSnake(newSnake);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        backgroundColor: "#000",
      }}
    >
      {snake.map((part, index) => (
        <div
          key={index}
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: "lime",
            position: "absolute",
            top: `${part.y}px`,
            left: `${part.x}px`,
          }}
        ></div>
      ))}

      <div
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: "red",
          position: "absolute",
          top: `${gainBox.y}px`,
          left: `${gainBox.x}px`,
        }}
      ></div>
    </div>
  );
};

export default Task2;
