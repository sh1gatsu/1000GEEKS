import React from "react";
import { Caption } from "../../components/caption";
import './FlexibleGrid.scss';

export const FlexibleGrid: React.FC = () => (
  <>
    <Caption title="Exercise 2: CSS" />

    <div>
      <div className="parrent">
        <div className="parrent__children parrent__children--1">1</div>
        <div className="parrent__children parrent__children--2">2</div>
        <div className="parrent__children parrent__children--3">3</div>
        <div className="parrent__children parrent__children--4">4</div>
      </div>
    </div>
  </>
)
