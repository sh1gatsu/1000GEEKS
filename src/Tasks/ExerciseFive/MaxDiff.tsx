import React, { useState } from "react";
import classNames from 'classnames';
import './MaxDiff.scss';
import { Caption } from "../../components/caption";

export const MaxDiff: React.FC = () => {
  const [allNumbers, setAllNumbers] = useState<number[]>([]);
  const [inputNumber, setInputNumber] = useState('');
  const [maxDiff, setMaxDiff] = useState('');

  const getMaxDiff = (numbers: number[]) => {
    let minNumber = numbers[0];
    let maxDifferent = 0;

    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] < minNumber) {
        minNumber = numbers[i];
      } else {
        maxDifferent = Math.max(maxDifferent, numbers[i] - minNumber);
      }
    }

    return maxDifferent;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputNumber === '') {
      return;
    }

    const newNumbers = [...allNumbers, Number(inputNumber)];

    setAllNumbers(newNumbers);
    setInputNumber('');
  }

  const handleMaxDiff = () => {
    if (allNumbers.length <= 0) {
      return;
    }

    const result = getMaxDiff(allNumbers)

    if (result === 0) {
      return;
    }

    setMaxDiff(`${result}`)
  }

  return (
    <>
      <Caption title="Exercise 5: Min max"/>

      <div className="maxdiff">
        <form className="maxdiff__form" onSubmit={handleSubmit}>
          <input
            type="number"
            className="maxdiff__form__input"
            value={inputNumber}
            onChange={(event) => setInputNumber(event.target.value)}
          />

          <button
            className="maxdiff__form__button"
          >
            Add to array
          </button>
        </form>

        {allNumbers.length > 0
          ? (
            <div className="maxdiff__numbers">
              {allNumbers.join(', ')}
            </div>
          )
          : (
            <div className="maxdiff__numbers">
              {`Add some numbers for test ;)`}
            </div>
          )
        }

        <button
          className={classNames('maxdiff__form__button', {
            'maxdiff__form__button--hidden': allNumbers.length <= 0,
          })}
          onClick={handleMaxDiff}
        >
          Calculate Max diff between numbers
        </button>

        <p className="maxdiff__numbers maxdiff__numbers-last">
          {maxDiff}
        </p>
      </div>
    </>
  )
};
