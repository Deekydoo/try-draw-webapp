import logo from './logo.svg';
import './App.css';
import { useLayoutEffect, useState } from 'react';
import rough from 'roughjs/bundled/rough.esm'

const generator = rough.generator();

function createElement(x1, y1, x2, y2, type) {
  const roughElement =
    type === "line"
      ? generator.line(x1, y1, x2, y2)
      : generator.rectangle(x1, y1, x2 - x1, y2 - y1);
  return { x1, y1, x2, y2, roughElement };
}


function App() {

  const [elements, setElements] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [elementType, setElementType] = useState("line");

  useLayoutEffect(() => {
    const myCanvas = document.getElementById("myCanvas");
    const context = myCanvas.getContext("2d");

    context.clearRect(0, 0, myCanvas.width, myCanvas.height);

    const roughCanvas = rough.canvas(myCanvas);

    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));



  }, [elements]);

  const handleMouseDown = (event) => {
    setDrawing(true);

    const { clientX, clientY } = event;

    const element = createElement(clientX, clientY, clientX, clientY, elementType);
    setElements(prevState => [...prevState, element]);
  }

  const handleMouseMove = (event) => {
    if (!drawing) return;

    const { clientX, clientY } = event;
    const index = elements.length - 1;
    const { x1, y1 } = elements[index];
    const updatedElement = createElement(x1, y1, clientX, clientY, elementType);

    const elementsCopy = [...elements];
    elementsCopy[index] = updatedElement;
    setElements(elementsCopy);


    console.log(clientX, clientY);
  }

  const handleMouseUp = (event) => {
    setDrawing(false);
  }

  return (
    <div className="App">
      <div style={{ position: "fixed" }}>
        <input
          type="radio"
          id="line"
          checked={elementType === "line"}
          onChange={() => setElementType("line")}
        />
        <label htmlFor='line'>line</label>
        <input
          type="radio"
          id="rectangle"
          checked={elementType === "rectangle"}
          onChange={() => setElementType("rectangle")}
        />
        <label htmlFor='rectangle'>Rectangle</label>
      </div>
      <canvas id='myCanvas'
        style={{ backgroundColor: 'lightblue' }}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}>
        canvas
      </canvas>
      <p>What up sonn!</p>
    </div>
  );
}

export default App;
