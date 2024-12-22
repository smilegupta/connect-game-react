import { useState, useEffect } from "react";

const rows = 6;
const columns = 7;

function App() {
  const [selectedByUser, setSelectedByUser] = useState([]);
  const [selectedByBot, setSelectedByBot] = useState([]);
  const [currActive, setCurrActive] = useState("user");
  const [winner, setWinner] = useState(null);

  function handleCellClick(id) {
    const updateState =
      currActive === "user" ? setSelectedByUser : setSelectedByBot;

    updateState((prev) => {
      const newValues = [...prev, id];
      validateWinLogic(currActive, newValues);
      setCurrActive(currActive === "user" ? "bot" : "user");
      return newValues;
    });
  }

  function validateWinLogic(player, values) {
    if (values.length < 4) return;

    const res1 = checkLineMade(values, 0, 1);
    const res2 = checkLineMade(values, 1, 0);
    const res3 = checkLineMade(values, 1, 1);
    const res4 = checkLineMade(values, 1, -1);

    if (res1 || res2 || res3 || res4) {
      setWinner(player);
    }
  }

  function checkLineMade(values, deltaRow, deltaCol) {
    const valueSet = new Set(values);

    for (const cell of values) {
      const [, row, , col] = cell.split("-");
      const currRow = Number(row);
      const currCol = Number(col);

      let count = 1;

      for (let step = 1; step < 4; step++) {
        if (
          valueSet.has(
            `row-${currRow + deltaRow * step}-col-${currCol + deltaCol * step}`
          )
        ) {
          count++;
        } else {
          break;
        }
      }

      for (let step = 1; step < 4; step++) {
        if (
          valueSet.has(
            `row-${currRow - deltaRow * step}-col-${currCol - deltaCol * step}`
          )
        ) {
          count++;
        } else {
          break;
        }
      }

      if (count >= 4) {
        return true;
      }
    }

    return false;
  }

  function getAvailableCells() {
    const allCells = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const cellId = `row-${row}-col-${col}`;
        if (
          !selectedByUser.includes(cellId) &&
          !selectedByBot.includes(cellId)
        ) {
          allCells.push(cellId);
        }
      }
    }
    return allCells;
  }

  function botMove() {
    const availableCells = getAvailableCells();

    for (const cell of availableCells) {
      const simulatedBotMoves = [...selectedByBot, cell];
      if (
        checkLineMade(simulatedBotMoves, 0, 1) ||
        checkLineMade(simulatedBotMoves, 1, 0) ||
        checkLineMade(simulatedBotMoves, 1, 1) ||
        checkLineMade(simulatedBotMoves, 1, -1)
      ) {
        setSelectedByBot((prev) => [...prev, cell]);
        validateWinLogic("bot", simulatedBotMoves);
        setCurrActive("user");
        return;
      }
    }

    for (const cell of availableCells) {
      const simulatedUserMoves = [...selectedByUser, cell];
      if (
        checkLineMade(simulatedUserMoves, 0, 1) ||
        checkLineMade(simulatedUserMoves, 1, 0) ||
        checkLineMade(simulatedUserMoves, 1, 1) ||
        checkLineMade(simulatedUserMoves, 1, -1)
      ) {
        setSelectedByBot((prev) => [...prev, cell]);
        setCurrActive("user");
        return;
      }
    }

    if (availableCells.length > 0) {
      const randomCell =
        availableCells[Math.floor(Math.random() * availableCells.length)];
      setSelectedByBot((prev) => [...prev, randomCell]);
      setCurrActive("user");
    }
  }

  useEffect(() => {
    if (currActive === "bot" && !winner) {
      botMove();
    }
  }, [currActive]);

  return (
    <div className="container">
      <header>
        <h1>Connect-4 Game</h1>
        {winner ? (
          <h2 className="winner">🎉 Winner: {winner} 🎉</h2>
        ) : (
          <h2>Turn: {currActive}</h2>
        )}
      </header>
      <table>
        <tbody>
          {Array(rows)
            .fill(0)
            .map((_, rowIdx) => (
              <tr key={`row-${rowIdx}`}>
                {Array(columns)
                  .fill(0)
                  .map((_, colIdx) => {
                    const cellId = `row-${rowIdx}-col-${colIdx}`;
                    return (
                      <td key={cellId}>
                        <button
                          className={`cell ${
                            selectedByUser.includes(cellId)
                              ? "user"
                              : selectedByBot.includes(cellId)
                              ? "bot"
                              : ""
                          }`}
                          onClick={() => handleCellClick(cellId)}
                          disabled={
                            [...selectedByUser, ...selectedByBot].includes(
                              cellId
                            ) || winner !== null
                          }
                        >
                          {selectedByUser.includes(cellId)
                            ? "U"
                            : selectedByBot.includes(cellId)
                            ? "B"
                            : ""}
                        </button>
                      </td>
                    );
                  })}
              </tr>
            ))}
        </tbody>
      </table>
      <button
        className="reset"
        onClick={() => {
          setSelectedByBot([]);
          setSelectedByUser([]);
          setCurrActive(winner);
          setWinner(null);
        }}
      >
        Reset Game
      </button>
    </div>
  );
}

export default App;
