import React from "react";
import './caption.scss';

interface Props {
  title: string,
}

export const Caption: React.FC<Props> = ({title}) => (
  <div className="capture">
    {title}
  </div>
)
