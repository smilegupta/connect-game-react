import { useState } from "react";

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

    if (res1 || res2 || res3) {
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
