import React from "react";

// Card wrapper (default export)
const Card = ({ children }) => (
  <div className="bg-white shadow rounded p-4">{children}</div>
);

// CardContent wrapper (named export)
export const CardContent = ({ children }) => (
  <div className="p-2">{children}</div>
);

export default Card;
