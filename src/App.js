import React, { useState } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [operands, setOperands] = useState([]);
  const [operators, setOperators] = useState([]);
  const [array, setArray] = useState([]);

  // Check if input is an operator
  const isOperator = (input) => {
    if (input === "+" || input === "-" || input === "*" || input === "/" || input === "(" || input === ")") {
      return true;
    }
    return false;
  };

  // Check if input is an operand
  const isOperand = (input) => {
    if (typeof input === "string" && input.length > 0) {
      return true;
    }
    return false;
  };

  const createArray = () => {
    const inputArray = input.split("");
    const numCols = 3;
    const numRows = inputArray.length;
    let arr = [];
    let operatorCount = {}; // keep track of operator count
    let operatorsArr = []; // keep track of operators in column 1
    for (let i = 0; i < numRows; i++) {
      let row = [];
      for (let j = 0; j < numCols; j++) {
        row.push("");
      }
      arr.push(row);
    }
    let operand = "";
    for (let i = 0; i < numRows; i++) {
      arr[i][0] = inputArray[i];
      if (isOperator(inputArray[i])) {
        // if operator appears for the first time, append it to the first column
        if (!operatorCount[inputArray[i]]) {
          arr[i][0] = inputArray[i];
          operatorsArr.push(inputArray[i]); // add operator to operatorsArr
          operatorCount[inputArray[i]] = 1;
        } else {
          // if operator appears again, append it with the previous operator to the first column
          let prevOperator = arr[i - 1][0];
          arr[i - 1][0] = prevOperator + inputArray[i];
          operatorCount[inputArray[i]]++;
        }
        arr[i][1] = operatorsArr.join(""); // display all operators in column 1
        if (operand) {
          setOperands([...operands, operand]);
        }
      } else if (isOperand(inputArray[i])) {
        operand += inputArray[i];
        arr[i][2] = operand;
      }
    }
    if (operand) {
      setOperands([...operands, operand]);
    }
    setOperators([...operators, ...operatorsArr]);
    setArray(arr);
  };
  

  return (
    <div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={createArray}>Create Array</button>
      <table>
        <tbody>
          {array.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((col, colIndex) => (
                <td key={colIndex}>{col}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p>Operands: {operands.join(", ")}</p>
      <p>Operators: {operators.join(", ")}</p>
    </div>
  );
};

export default App;
