import { useState } from "react";

const rows = 6;
const columns = 7;

function App() {
  // to show selected by user
  const [selectedByUser, setSelectedByUser] = useState([]);
  // to show selected by bot
  const [selectedByBot, setSelectedByBot] = useState([]);

  const [currActive, setCurrActive] = useState("user");
  const [winner, setWinner] = useState(null);

  function handleCellClick(id) {
    if (currActive === "user") {
      setSelectedByUser((prev) => {
        const newValues = [...prev, id];
        validateWinLogic("user", newValues);
        return newValues;
      });

      setCurrActive("bot");
    } else {
      setSelectedByBot((prev) => {
        const newValues = [...prev, id];
        validateWinLogic("bot", newValues);
        return [...prev, id];
      });

      setCurrActive("user");
    }
  }

  function validateWinLogic(player, values) {
    if (values.length < 4) {
      return;
    }
    const res1 = checkVerticalLineMade(values);

    const res2 = checkHorizontalLineMade(values);

    if (res1 || res2) {
      setWinner(player);
    }
  }

  function checkHorizontalLineMade(values) {
    if (values.length < 4) {
      return false;
    }

    for (let i = 0; i < values.length; i++) {
      const first = values[i].split("-");
      // row-1-col-0
      const currRow = Number(first[1]);
      const currCol = Number(first[3]);

      // case 1
      if (
        values.includes(`row-${currRow}-col-${currCol + 1}`) &&
        values.includes(`row-${currRow}-col-${currCol + 2}`) &&
        values.includes(`row-${currRow}-col-${currCol + 3}`)
      ) {
        return true;
      }

      // case 2
      if (
        values.includes(`row-${currRow}-col-${currCol + 1}`) &&
        values.includes(`row-${currRow}-col-${currCol + 2}`) &&
        values.includes(`row-${currRow}-col-${currCol - 1}`)
      ) {
        return true;
      }

      // case 3
      if (
        values.includes(`row-${currRow}-col-${currCol + 1}`) &&
        values.includes(`row-${currRow}-col-${currCol - 2}`) &&
        values.includes(`row-${currRow}-col-${currCol - 1}`)
      ) {
        return true;
      }

      // case 4
      if (
        values.includes(`row-${currRow}-col-${currCol - 3}`) &&
        values.includes(`row-${currRow}-col-${currCol - 2}`) &&
        values.includes(`row-${currRow}-col-${currCol - 1}`)
      ) {
        return true;
      }
    }

    return false;
  }

  function checkVerticalLineMade(values) {
    if (values.length < 4) {
      return false;
    }

    for (let i = 0; i < values.length; i++) {
      const first = values[i].split("-");
      // row-1-col-0
      const currRow = Number(first[1]);
      const currCol = Number(first[3]);

      // case 1
      if (
        values.includes(`row-${currRow + 1}-col-${currCol}`) &&
        values.includes(`row-${currRow + 2}-col-${currCol}`) &&
        values.includes(`row-${currRow + 3}-col-${currCol}`)
      ) {
        return true;
      }

      // case 2
      if (
        values.includes(`row-${currRow + 1}-col-${currCol}`) &&
        values.includes(`row-${currRow + 2}-col-${currCol}`) &&
        values.includes(`row-${currRow - 1}-col-${currCol}`)
      ) {
        return true;
      }

      // case 3
      if (
        values.includes(`row-${currRow + 1}-col-${currCol}`) &&
        values.includes(`row-${currRow - 2}-col-${currCol}`) &&
        values.includes(`row-${currRow - 1}-col-${currCol}`)
      ) {
        return true;
      }

      // case 4
      if (
        values.includes(`row-${currRow - 3}-col-${currCol}`) &&
        values.includes(`row-${currRow - 2}-col-${currCol}`) &&
        values.includes(`row-${currRow - 1}-col-${currCol}`)
      ) {
        return true;
      }
    }
  }

  return (
    <div>
      <div>Header - todo add timer here</div>
      <table>
        <tbody>
          {Array(rows)
            .fill(0)
            .map((_, pidx) => {
              return (
                <tr key={`row-${pidx}`}>
                  {Array(columns)
                    .fill(0)
                    .map((_, cidx) => {
                      return (
                        <td key={`col-${cidx}`}>
                          <button
                            onClick={() => {
                              handleCellClick(`row-${pidx}-col-${cidx}`);
                            }}
                            disabled={
                              [...selectedByBot, ...selectedByUser].includes(
                                `row-${pidx}-col-${cidx}`
                              ) || winner !== null
                            }
                          >
                            {selectedByUser.includes(
                              `row-${pidx}-col-${cidx}`
                            ) && "User"}

                            {selectedByBot.includes(
                              `row-${pidx}-col-${cidx}`
                            ) && "Bot"}
                          </button>
                        </td>
                      );
                    })}
                </tr>
              );
            })}
        </tbody>
      </table>
      {winner && <h1> {winner} won</h1>}
    </div>
  );
}

export default App;
