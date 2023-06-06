import { Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { getDepartmentStats } from "../Redux/AppReducer/action";

const ApexChart = () => {
  const dispatch = useDispatch();
  const departmentStats = useSelector(
    (state) => state.AppReducer.departmentStats
  );


  useEffect(() => {
    dispatch(getDepartmentStats());
  }, []);

  const series = [
    {
      name: "Closed",
      data: departmentStats.length > 0 ? departmentStats[0].closedOnes : [],
    },
    {
      name: "Total",
      data: departmentStats.length > 0 ? departmentStats[0].totalOnes : [],
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "20%",
        endingShape: "rounded",
        borderRadius: 3,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      position: "top",
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories:
        departmentStats.length > 0 ? departmentStats[0].statCategory : [],
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <Stack>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={["250px", "300px"]}
      />
    </Stack>
  );
};

export default ApexChart;
