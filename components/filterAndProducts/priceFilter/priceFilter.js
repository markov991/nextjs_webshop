import { useState, useEffect } from "react";
import classes from "./priceFilter.module.css";
import ReactSlider from "react-slider";
import { filterSliceActions } from "@/store/filtersSlice";
import { useDispatch } from "react-redux";

export default function PriceFilter({ minPrice, maxPrice }) {
  const dispatch = useDispatch();
  const [expandPriceRangeFilter, setExpandPriceRangeFilter] = useState(false);

  const [value, setValue] = useState([minPrice, maxPrice]);
  useEffect(() => {
    setValue([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  useEffect(() => {
    dispatch(
      filterSliceActions.changePriceRangeParams({
        priceRange: value,
      })
    );
  }, [value]);
  return (
    <div className={classes.priceFilterBox}>
      <div className={classes.priceFilterNameBox}>
        <legend>Price range</legend>
        <button
          onClick={() => setExpandPriceRangeFilter(!expandPriceRangeFilter)}
        >
          {expandPriceRangeFilter ? "-" : "+"}
        </button>
      </div>
      {expandPriceRangeFilter && (
        <div>
          <div className={classes.availablePriceRange}>
            <span>{minPrice}$ </span>
            <span>{maxPrice}$</span>
          </div>
          <div className={classes.rangeSliderBox}>
            <ReactSlider
              min={minPrice}
              max={maxPrice}
              value={value}
              onAfterChange={(value, index) => {
                console.log(
                  `onAfterChange: ${JSON.stringify({ value, index })}`
                );
                console.log(value, index);
                setValue(value);
              }}
              className="horizontal-slider"
              // thumbClassName="example-thumb"
              thumbClassName={classes.thumbPriceRange}
              // trackClassName="example-track"
              trackClassName={classes.trackClassPriceRange}
              renderThumb={(props, state) => (
                <div {...props}>{state.valueNow}</div>
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}
