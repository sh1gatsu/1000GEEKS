import React, { useState } from "react";
import { Caption } from "../../../components/caption";
import './DatabaseQuery.scss';

import employee from '../img/firsttable.png';
import departments from '../img/secondtable.png';
import result from '../img/resultofjoin.png';
import query from '../img/query.png';

export const DatabaseQuery: React.FC = () => {
  const [copySuccess, setCopySuccess] = useState(false);

  const text = `
  SELECT "DEPARTMENT".name AS department_name, 
  COUNT("EMPLOYEE".id) AS number_of_employees
  FROM "DEPARTMENT"
  LEFT JOIN "EMPLOYEE"
  ON "EMPLOYEE".dept_id = "DEPARTMENT".id
  GROUP BY "DEPARTMENT".name
  ORDER BY number_of_employees DESC, "DEPARTMENT".name ASC;
  `
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
  }

  return (
    <>
      <Caption title="Exercise 3: DATABASE" />

      <div className="database__container">
        <p>
          Created 2 Tables for test, here they are:
        </p>

        <div className="database__container__tables">
          <div className="database__container__title">
            <p>Employee</p>
            <img
              className="database__container__img"
              src={employee}
              alt="employee"
            />
          </div>

          <div className="database__container__title">
            <p>Departments</p>
            <img
              className="database__container__img"
              src={departments}
              alt="departments"
            />
          </div>
        </div>

        <p>Result of query:</p>

        <div>
          <img
            className="database__container__img"
            src={result}
            alt="result"
          />
        </div>

        <p>Written Query:</p>

        <div className="database__container__result">
          <img
            className="database__container__img"
            src={query}
            alt="result"
          />

          <button
            className="database__container__result__button"
            onClick={handleCopy}
          >
            {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
          </button>
        </div>
      </div>
    </>
  )
}
