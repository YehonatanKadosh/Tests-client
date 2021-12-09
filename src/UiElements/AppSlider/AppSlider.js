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
    <div className="Slider">
      <div className="row">
        <div className="col">
          {index > 0 && (
            <Arrow
              direction="left"
              clickFunction={() => onArrowClick("left")}
            />
          )}
        </div>
        <div className="col">
          <Slide in={slideIn} direction={slideDirection}>
            <div>{items[index]}</div>
          </Slide>
        </div>
        <div className="col">
          {index < numSlides - 1 && (
            <Arrow
              direction="right"
              clickFunction={() => onArrowClick("right")}
            />
          )}
        </div>
      </div>
      <Stepper sx={{ mt: 3 }} nonLinear activeStep={index} alternativeLabel>
        {[...Array(numSlides)].map((V, i) => (
          <Step onClick={() => setIndex(i)} key={i}>
            <StepButton>
              {i === 0 ? "Intro" : i === numSlides - 1 ? "Finish" : `${i}st`}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default AppSlider;
