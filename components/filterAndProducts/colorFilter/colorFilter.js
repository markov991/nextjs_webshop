import { useState, useEffect } from "react";
import classes from "./colorFilter.module.css";

export default function ColorFilter({ colors }) {
  const [expended, setExpended] = useState(false);

  return (
    <div>
      <div className={classes.filterName}>
        <legend>Color</legend>
        <button onClick={() => setExpended(!expended)}>
          {expended ? "-" : "+"}
        </button>
      </div>
      {expended && (
        <ul className={classes.listStyling}>
          {colors.map((color) => (
            <li key={color}>
              <input name={color} id={color} type="checkbox" />
              <label htmlFor={color}>{color}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
