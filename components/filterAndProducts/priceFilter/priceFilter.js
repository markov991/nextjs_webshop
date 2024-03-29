import { useState, useEffect } from "react";
import classes from "./priceFilter.module.css";
import ReactSlider from "react-slider";

export default function PriceFilter({ minPrice, maxPrice }) {
  const [expandPriceRangeFilter, setExpandPriceRangeFilter] = useState(false);
  // const [minPrice, setMinPrice] = useState();
  // const [maxPrice, setMaxPrice] = useState();
  const [value, setValue] = useState([minPrice, maxPrice]);
  useEffect(() => {
    setValue([minPrice, maxPrice]);
    console.log(value);
  }, [minPrice, maxPrice]);
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
      {/* <div className={""}>
        <label htmlFor="min_price">Min price</label>
        <input
          onChange={(event) => {
            setMinPrice(event.target.value);
          }}
          id="min_price"
          type="range"
          min={9}
          max={240}
        />
        <span>{minPrice}</span>
      </div> */}
      {/* <div>
        <span>max</span>
        <input
          onChange={(event) => {
            setMaxPrice(event.target.value);
          }}
          className={classes.max_price_input}
          id="max_price"
          type="range"
          min={9}
          max={240}
        />
        <label htmlFor="max_price">{maxPrice}</label>
      </div> */}
    </div>
  );
}
