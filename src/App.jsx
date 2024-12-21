import { useState, useEffect } from "react";

const rows = 6;
const columns = 7;

function App() {
  // to show selected by user
  const [selectedByUser, setSelectedByUser] = useState([]);
  // to show selected by bot
  const [selectedByBot, setSelectedByBot] = useState([]);

  const [currActive, setCurrActive] = useState("user");
  const [nextActive, setNextActive] = useState("bot");
  const [winner, setWinner] = useState(null);

  function handleCellClick(id) {
    if (currActive === "user") {
      setSelectedByUser((prev) => {
        return [...prev, id];
      });

      setNextActive("bot");
    } else {
      setSelectedByBot((prev) => {
        return [...prev, id];
      });

      setNextActive("user");
    }
  }

  function validateWinLogic(player) {
    if (player === "bot") {
      if (selectedByBot.length < 4) {
        return;
      } else {
        const res1 = checkVerticalLineMade(selectedByBot);

        const res2 = checkHorizontalLineMade(selectedByBot);

        if (res1 || res2) {
          setWinner(player);
        }
      }

      setCurrActive("user");
    }

    if (player === "user") {
      if (selectedByUser.length < 4) {
        return;
      } else {
        const res1 = checkVerticalLineMade(selectedByUser);
        const res2 = checkHorizontalLineMade(selectedByUser);

        if (res1 || res2) {
          setWinner(player);
        }
      }

      setCurrActive("bot");
    }
  }

  function checkVerticalLineMade(values) {
    if (values.length < 1) {
      return;
    }

    const first = values[0].split("-");
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

    return false;
  }

  function checkHorizontalLineMade(values) {
    if (values.length < 1) {
      return;
    }

    const first = values[0].split("-");
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

    return false;
  }

  useEffect(() => {
    validateWinLogic(currActive);
  }, [selectedByUser, selectedByBot]);
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
                            disabled={[
                              ...selectedByBot,
                              ...selectedByUser,
                            ].includes(`row-${pidx}-col-${cidx}`)}
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
      {winner && <h1> {currActive} won</h1>}
    </div>
  );
}

export default App;
