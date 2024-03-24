import classes from "./filterSection.module.css";
import SelectCategory from "./selectCategory/selectCategory";

export default function FilterSection() {
  return (
    <div className={classes.filterSection}>
      <SelectCategory />
    </div>
  );
}
