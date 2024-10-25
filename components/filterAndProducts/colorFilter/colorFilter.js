import { useState, useEffect } from "react";
import classes from "./colorFilter.module.css";
import { filterSliceActions } from "@/store/filtersSlice";
import { useDispatch } from "react-redux";

export default function ColorFilter({ colors }) {
  const dispatch = useDispatch();
  const [expended, setExpended] = useState(false);

  const [checkedColors, setCheckedColors] = useState([]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    console.log(name, checked);
    if (checked) {
      setCheckedColors([...checkedColors, name]);
    }
    if (!checked) {
      setCheckedColors(checkedColors.filter((colors) => colors !== name));
    }
  };

  useEffect(() => {
    dispatch(
      filterSliceActions.changeColorFilterParams({ pickedColor: checkedColors })
    );
    console.log(checkedColors);
  }, [checkedColors]);

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
            <li className={classes.colorList} key={color}>
              <input
                name={color}
                id={color}
                type="checkbox"
                onChange={handleCheckboxChange}
              />
              <label htmlFor={color}>{color}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
