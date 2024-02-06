import React, { useEffect, useState } from "react";

const ToyRobot = ({ commands }) => {
  console.log("=>", commands);
  const tableWidth = 5;
  const tableHeight = 5;
  const directions = ["NORTH", "EAST", "SOUTH", "WEST"];
  let robotDirection = 0;
  let robotX = 0;
  let robotY = 0;
  let robotPlaced = false;
  let tokens = [];

  const [finalreport, setreport] = useState([]);
  useEffect(() => {
    parseCommands();
  }, [commands]);

  const parseCommands = () => {
    commands.forEach((command) => {
      // console.log("in toy", command);
      let commandSplit = command.toUpperCase().split(" ");
      // console.log("slpit", commandSplit);
      if (commandSplit.length === 2) {
        commandSplit[1] = commandSplit[1].split(",");
        console.log("after split", commandSplit[1]);
      } else {
        commandSplit[1] = [];
      }
      console.log("final push", commandSplit);
      tokens.push(commandSplit);
    });
    // console.log("Token", tokens);

    tokens.forEach((item) => {
      switch (item[0]) {
        case "PLACE":
          place(item);
          break;
        case "LEFT":
        case "RIGHT":
          robotPlaced ? rotate(item[0]) : invalidCommand(item);
          break;
        case "MOVE":
          robotPlaced && canMove() ? move() : invalidCommand(item);
          break;
        case "REPORT":
          robotPlaced ? report() : invalidCommand(item);
          break;
        default:
          invalidCommand(item);
          break;
      }
    });
  };

  const place = (item) => {
    console.log("place", item);
    if (checkPlaceParams(item[1])) {
      robotX = +item[1][0];
      robotY = +item[1][1];
      robotDirection = whichDirection(item[1][2]);
      robotPlaced = true;
    }
  };

  const rotate = (turn) => {
    let newDir = (robotDirection + (turn === "LEFT" ? 3 : 1)) % 4;
    robotDirection = newDir;
  };

  const canMove = () => {
    console.log("inside move");
    switch (robotDirection) {
      case 0: // North
        return !isBeyondTableLimit(robotY + 1, tableHeight);
      case 1: // East
        return !isBeyondTableLimit(robotX + 1, tableWidth);
      case 2: // South
        return !isBelowZero(robotY - 1);
      case 3: // West
        return !isBelowZero(robotX - 1);
      default:
        return false;
    }
  };

  const move = () => {
    if (robotDirection % 2 === 1) {
      robotDirection === 1 ? robotX++ : robotX--;
    } else {
      robotDirection === 0 ? robotY++ : robotY--;
    }
    report();
  };

  const report = () => {
    const finalarray = [robotX, robotY, directions[robotDirection]].join(",");
    setreport(finalarray);
  };

  const invalidCommand = (item) => {
    console.log(">> INVALID COMMAND: '" + item.join(" ") + "' IGNORED");
    setreport([-1]);
  };

  const isBelowZero = (val) => val < 0;

  const isBeyondTableLimit = (val, limit) => val >= limit;

  const isPosInteger = (str) => {
    var n = Math.floor(Number(str));
    console.log("is", n);
    return n !== Infinity && n >= 0;
  };

  const isDirection = (str) => !!~directions.indexOf(str);

  const whichDirection = (str) => directions.indexOf(str);

  const checkPlaceParams = (arr) =>
    arr.length !== 0 &&
    arr.length === 3 &&
    isPosInteger(arr[0]) &&
    isPosInteger(arr[1]) &&
    typeof arr[2] === "string" &&
    isDirection(arr[2]) &&
    !isBelowZero(+arr[0]) &&
    !isBelowZero(+arr[1]) &&
    !isBeyondTableLimit(+arr[0], tableWidth) &&
    !isBeyondTableLimit(+arr[1], tableHeight);

  return (
    <div className="report">
      {finalreport != -1 ? (
        <h3>Report {finalreport}</h3>
      ) : (
        <h3>Invalid command</h3>
      )}
    </div>
  );
};

export default ToyRobot;
