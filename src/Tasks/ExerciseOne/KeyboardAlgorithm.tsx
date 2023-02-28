import React, { useState } from "react";
import { Caption } from "../../components/caption";
import './KeyboardAlgorithm.scss';
import { ErrorMessages } from "./types/ErrorMessages";


export const KeyboardAlgorithm: React.FC = () => {
  const [passwordInput, setPasswordInput] = useState('');
  const [keypadInput, setKeypadInput] = useState('');
  const [timeOfTyping, setTimeOfTyping] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessages>(ErrorMessages.Default);

  const entryTime = (s: string, keypad: string) => {
    const keypadArray = [];
    const container = [];
    let totalTime = 0;

    for (let i = 0; i < keypad.length; i++) {
      container.push(keypad[i])

      if ((i + 1) % 3 === 0) {
        let containerToPush = [...container];

        keypadArray.push(containerToPush);

        container.length = 0;
      }
    }

    let currRow = 0;

    let currCol = 0;

    for (let i = 0; i < keypadArray.length; i++) {
      let idx = keypadArray[i].indexOf(s[0]);

      if (idx !== -1) {
        currRow = i;

        currCol = idx;
      }
    }

    for (let i = 1; i < s.length; i++) {
      let nextRow = 0;

      let nextCol = 0;

      for (let j = 0; j < keypadArray.length; j++) {
        let idx = keypadArray[j].indexOf(s[i]);

        if (idx !== -1) {
          nextRow = j;

          nextCol = idx;
        }
      }

      let time = Math.max(Math.abs(nextRow - currRow), Math.abs(nextCol - currCol));

      totalTime += time;

      currRow = nextRow;

      currCol = nextCol;
    }

    return totalTime;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (passwordInput.length < 6) {
      setIsError(true);
      setErrorMessage(ErrorMessages.Password);
      return;
    }

    if (keypadInput.length !== 9) {
      setIsError(true);
      setErrorMessage(ErrorMessages.Keypad);
      return;
    }

    setIsError(false);
    setErrorMessage(ErrorMessages.Default);

    const result = entryTime(passwordInput, keypadInput)

    setTimeOfTyping(`${result}`);
  }

  return (
    <>
      <Caption title="Exercise 1: Keyboard algorithm" />

      <form className="keyboardform" onSubmit={handleSubmit}>
        <div className="keyboardform__container">
          <label>
            <p>Enter password pattern</p>

            <input
              required
              placeholder="Enter min 6 numbers"
              value={passwordInput}
              onChange={(event) => setPasswordInput(event.target.value)}
              className="keyboardform__input"
              type="number"
            />
          </label>

          <label>
            <p>Enter keypad pattern</p>

            <input
              required
              placeholder="Enter 9 numbers"
              value={keypadInput}
              onChange={(event) => setKeypadInput(event.target.value)}
              className="keyboardform__input"
              type="number"
            />
          </label>
        </div>

        <button className="keyboardform__button">
          Calculate time
        </button>

        {isError ? (
          <p className="keyboardform__output keyboardform__error">
            {errorMessage}
          </p>
        ) : (
          <p className="keyboardform__output">
            {timeOfTyping.length
              ? `To enter your password you will need ${timeOfTyping} seconds`
              : ''}
          </p>
        )}
      </form>
    </>
  )
}
