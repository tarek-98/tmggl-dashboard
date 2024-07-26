import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./featured.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "./ChangingProgressProvider";

const Featured = () => {
  return (
    <div className="featured h-100">
      <div className="top">
        <h1 className="title">اجمالي الارباح</h1>
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <ChangingProgressProvider
            values={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          >
            {(percentage) => (
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                  pathTransitionDuration: 0.95,
                  trailColor: "#82ca9d",
                  pathColor: "#210876",
                  textColor: "#210876",
                })}
              />
            )}
          </ChangingProgressProvider>
        </div>
        <p className="title">اجمالي المبيعات اليوم</p>
        <p className="amount">$2042.50K</p>
        <p className="desc">المعاملات السابقة</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">التارجت</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount ">$19.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">اخر اسبوع</div>
            <div className="itemResult positive">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">$60.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">اسبوع</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">$73.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
