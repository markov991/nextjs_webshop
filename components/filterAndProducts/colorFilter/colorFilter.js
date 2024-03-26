import { useState, useEffect } from "react";
import classes from "./colorFilter.module.css";

export default function ColorFilter() {
  const [colorsFilter, setColorsFilter] = useState([]);

  const [expended, setExpended] = useState(false);

  useEffect(() => {
    fetch("/api/getAllFilters")
      .then((response) => response.json())
      .then((data) => {
        setColorsFilter(data.filters.colors);
        console.log("Marko", data.filters.colors);
      });
  }, []);

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
          {colorsFilter.map((color) => (
            <li>
              <input name={color} id={color} type="checkbox" />
              <label htmlFor={color}>{color}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
