import { Paper } from "@mui/material";
import React, { PureComponent } from "react";
import { PieChart, Pie,Tooltip } from "recharts";

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const data02 = [
  { name: "A1", value: 100 },
  { name: "A2", value: 300 },
  { name: "B1", value: 100 },
  { name: "B2", value: 80 },
  { name: "B3", value: 40 },
  { name: "B4", value: 30 },
  { name: "B5", value: 50 },
  { name: "C1", value: 100 },
  { name: "C2", value: 200 },
  { name: "D1", value: 150 },
  { name: "D2", value: 50 },
];

export default class PieChartGraph extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/pie-chart-of-two-levels-gor24";

  render() {
    return (
      //   <ResponsiveContainer width="100%" height="100%">
      <Paper elevation={4}>
        <PieChart width={300} height={360}>
          <Pie
            data={data01}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#212121"
          />
          <Pie
            data={data02}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill="#82ca9d"
            label
            paddingAngle={5}

          />
          <Tooltip />
        </PieChart>
      </Paper>
      //   </ResponsiveContainer>
    );
  }
}
