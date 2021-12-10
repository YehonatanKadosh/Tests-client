import { Slide, Step, StepButton, Stepper } from "@mui/material";
import React, { useState } from "react";
import "./AppSlider.css";
import Arrow from "../AppArrow/Arrow";

function AppSlider({ items }) {
  const [index, setIndex] = useState(0);
  const [slideIn, setSlideIn] = useState(true);
  const [slideDirection, setSlideDirection] = useState("down");
  const numSlides = items.length;

  const onArrowClick = (direction) => {
    const increment = direction === "left" ? -1 : 1;
    const newIndex = (index + increment + numSlides) % numSlides;
    const oppDirection = direction === "left" ? "right" : "left";

    setSlideDirection(direction);
    setSlideIn(false);
    setTimeout(() => {
      setIndex(newIndex);
      setSlideDirection(oppDirection);
      setSlideIn(true);
    }, 500);
  };

  return (
    <div className="app-slider">
      <div className="queez-slider-main">
        {index > 0 && (
          <Arrow direction="left" clickFunction={() => onArrowClick("left")} />
        )}
        <div className="slider-main">
          <Slide in={slideIn} direction={slideDirection}>
            <div>{items[index]}</div>
          </Slide>
        </div>
        {index < numSlides - 1 && (
          <Arrow
            direction="right"
            clickFunction={() => onArrowClick("right")}
          />
        )}
      </div>
      <div className="queez-stepper">
        <Stepper
          sx={{ mt: 3, width: "100%" }}
          nonLinear
          activeStep={index}
          alternativeLabel
        >
          {[...Array(numSlides)].map((V, i) => (
            <Step onClick={() => setIndex(i)} key={i}>
              <StepButton>
                {i === 0 ? "Intro" : i === numSlides - 1 ? "Finish" : `${i}st`}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  );
}

export default AppSlider;
