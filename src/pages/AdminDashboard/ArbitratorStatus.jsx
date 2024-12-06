import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";

const ArbitratorStatus = () => {
  const innerCircle = 75; // "Arbitration Completed"
  const middleCircle = 25; // "In Use"
  const outerCircle = 50; // "Free"

  // Color definitions for each status
  const colors = {
    inUse: "#57c3fc",
    free: "#0084ff",
    arbitrationCompleted: "#1a1e4d",
  };

  return (
    <div className="mt-8">
      <h3 className="ml-20 font-semibold">Arbitrator Status</h3>
      <Container className="border-2 border-slate-400 ml-5 md:ml-16 mt-2 rounded-lg h-[360px]">
        <ChartContainer style={{ marginTop: "120px" }}>
          <div className="flex items-center justify-center">
            {/* Outer Circle */}
            <Layer style={{ zIndex: 3, width: "200px", height: "200px" }}>
              <CircularProgressbarWithChildren
                value={outerCircle}
                styles={buildStyles({
                  pathColor: colors.free,
                  trailColor: "#f0f0f0",
                  strokeLinecap: "butt",
                })}
              />
            </Layer>

            {/* Middle Circle */}
            <Layer
              style={{
                zIndex: 2,
                width: "150px",
                height: "150px",
              }}
            >
              <CircularProgressbarWithChildren
                value={middleCircle}
                styles={buildStyles({
                  pathColor: colors.inUse,
                  trailColor: "#f0f0f0",
                  strokeLinecap: "butt",
                })}
              />
            </Layer>

            {/* Inner Circle */}
            <Layer
              style={{
                zIndex: 1,
                width: "90px",
                height: "90px",
              }}
            >
              <CircularProgressbarWithChildren
                value={innerCircle}
                styles={buildStyles({
                  pathColor: colors.arbitrationCompleted,
                  trailColor: "#f0f0f0",
                  strokeLinecap: "butt",
                })}
              />
            </Layer>
          </div>
        </ChartContainer>

        {/* Legend for status */}
        <Legend style={{ position: "relative" }}>
          <h1 style={{ position: "absolute", top: "-80px", left: "60px" }}>
            Status
          </h1>
          <LegendItem
            color={colors.inUse}
            style={{ position: "absolute", left: "58px", top: "-30px" }}
          >
            In Use
          </LegendItem>
          <LegendItem
            color={colors.free}
            style={{ position: "absolute", left: "58px", top: "-50px" }}
          >
            Free
          </LegendItem>
          <LegendItem color={colors.arbitrationCompleted}>
            Arbitration Completed
          </LegendItem>
        </Legend>
      </Container>
    </div>
  );
};

// Styled-components for layout
const Container = styled.div`
  width: 300px;
  text-align: center;
`;

const ChartContainer = styled.div`
  position: relative;
  width: 150px; // Adjust width for largest circle
  height: 150px; // Adjust height for largest circle
  margin: 0 auto;
`;

const Layer = styled.div`
  position: absolute;
  top: 10;
  left: 50;
  width: 100%;
  height: 100%;
`;

const Legend = styled.div`
  margin-top: 45px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;

  &::before {
    content: "";
    width: 12px;
    height: 12px;
    background-color: ${(props) => props.color};
    border-radius: 50%;
    margin-right: 8px;
  }
`;

export default ArbitratorStatus;
