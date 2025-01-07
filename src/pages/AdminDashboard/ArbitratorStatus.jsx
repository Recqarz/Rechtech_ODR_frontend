import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";

const ArbitratorStatus = () => {
  const [innerCircle, setInnerCircle] = useState(0); // "Arbitration Completed"
  const [middleCircle, setMiddleCircle] = useState(0); // "In Use"
  const [outerCircle, setOuterCircle] = useState(0); // "Free"

  const fetchData = async()=>{
    axios.get(`${import.meta.env.VITE_API_BASEURL}/arbitrator/getArbitratorStatus`)
     .then(response => {
       setInnerCircle(response.data.innerCircle);
       setMiddleCircle(response.data.middleCircle);
       setOuterCircle(response.data.outerCircle);
      })
      .catch(error => {
        console.error("Error fetching arbitrator status: ", error);
      });
  }

  useEffect(()=>{
    fetchData();
  },[])

  // Color definitions for each status
  const colors = {
    inUse: "#57c3fc",
    free: "#0084ff",
    arbitrationCompleted: "green",
  };

  return (
    <div className="mt-8 text-white">
      <h3 className="ml-2 font-semibold">Arbitrator Status</h3>
      <Container className="border-2 border-slate-400  mt-2 rounded-lg h-[230px]">
        <ChartContainer style={{ marginTop: "60px" }}>
          <div className="flex items-center justify-center">
            {/* Outer Circle */}
            <Layer style={{ zIndex: 3, width: "100px", height: "100px" }}>
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
                width: "80px",
                height: "80px",
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
                width: "60px",
                height: "60px",
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
        <Legend
        className="text-sm font-semibold"
        style={{ position: "relative" }}>
          <h1 style={{ position: "absolute", top: "-95px", left: "80px" }}>
            Status
          </h1>
          <LegendItem
          className="text-xs font-semibold"
            color={colors.inUse}
            style={{ position: "absolute", left: "80px", top: "-50px" }}
          >
            In Use
          </LegendItem>
          <LegendItem
          className="text-xs font-semibold"
            color={colors.free}
            style={{ position: "absolute", left: "80px", top: "-70px" }}
          >
            Free
          </LegendItem>
          <LegendItem className="text-xs font-semibold"
          style={{ position: "absolute", left: "30px", top: "-30px" }}
          color={colors.arbitrationCompleted}>
            Arbitration Completed
          </LegendItem>
        </Legend>
      </Container>
    </div>
  );
};

// Styled-components for layout
const Container = styled.div`
  width: 200px;
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
  margin-top: 5px;
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
