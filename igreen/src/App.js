import "./App.css";
import { useState } from "react";
import ToyRobot from "./Components/ToyRobot";

function App() {
  const [commandsInput, setCommandsInput] = useState(""); // State to store user input commands
  const [executedCommands, setExecutedCommands] = useState([]); // State to store executed commands
  const placehol =
    "Please enter comments line by line-example \nPLACE 1,2,SOUTH \nleft \nREPORT";
  const handleInputChange = (event) => {
    setCommandsInput(event.target.value); // Update the commands input state
  };

  const handleExecuteClick = () => {
    // Split user input by lines and filter out empty lines
    const commandsArray = commandsInput
      .split("\n")
      .filter((command) => command.trim() !== "");
    console.log("in app", commandsArray);
    setExecutedCommands(commandsArray); // Update the executed commands state
  };

  return (
    <div className="App">
      <h1>Toy Robot Simulator</h1>
      <div>
        <textarea
          rows={5}
          cols={50}
          value={commandsInput}
          onChange={handleInputChange}
          placeholder={placehol}
        />
      </div>
      <div>
        <button onClick={handleExecuteClick} disabled={commandsInput === ""}>
          Execute Commands
        </button>
      </div>
      <div>
        {/* Render the RobotSimulator component and pass the executed commands as props */}
        <ToyRobot commands={executedCommands} />
      </div>
    </div>
  );
}

export default App;
