import React, { useEffect, useState } from "react";
import "./Bg1.css"

function MovingShapes() {
  const [shapes, setShapes] = useState([]);

  // Function to create a new shape
  function createMovingShape() {
    if (shapes.length > 9) return;

    const newShape = {
      id: shapes.length + 1,
      width: Math.floor(Math.random() * (300 - 50 + 1)) + 50,
      right:
        Math.floor(Math.random() * (window.innerWidth * 0.9 - -50 + 1)) + -50,
      duration: Math.floor(Math.random() * (8 - 2 + 1)) + 2,
      backgroundColor: `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
      )},${Math.floor(Math.random() * 256)})`,
    };

    setShapes((prevShapes) => [...prevShapes, newShape]);
  }

  useEffect(() => {
    createMovingShape();
    const interval = setInterval(createMovingShape, 4000);

    return () => clearInterval(interval);
  }, [shapes]);

  const handleAnimationEnd = (id) => {
    setShapes((prevShapes) => prevShapes.filter((shape) => shape.id !== id));
  };

  return (
    <>
      {shapes.map((shape, index) => (
        <div
          key={index}
          className="moving-shape"
          style={{
            width: shape.width,
            right: shape.right,
            animationDuration: `${shape.duration}s`,
            backgroundColor: shape.backgroundColor,
          }}
          onAnimationEnd={() => handleAnimationEnd(shape.id)}
        />
      ))}
    </>
  );
}

export default MovingShapes;
