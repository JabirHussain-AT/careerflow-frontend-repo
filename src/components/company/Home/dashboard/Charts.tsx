import React from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";

interface ChartDataItem {
  _id: string;
  jobsPosted: number;
  applicationsDone: number;
}

const Charts: React.FC<{ chartData: ChartDataItem[]; filterType: string }> = ({
  chartData,
  filterType,
}) => {
  let filter = "year";
  if (filterType === "monthly") filter = "month";
  else if (filterType === "weekly") filter = "week";

 
  const lineChartData = chartData?.map((dataItem) => ({
    name: filterType === "monthly" ?  filter +'  '+dataItem._id : filter +' - '+ dataItem._id.toString(),
    TotalJobs: dataItem.jobsPosted,
    TotalApplications: dataItem.applicationsDone,
  
  }));



 




  const barChartData = chartData?.map((dataItem) => ({
    name: filterType === "monthly" ? filter +'  '+ dataItem._id :  filter +' -  '+dataItem._id.toString(),
    NumberOfApplicants: dataItem.applicationsDone,

  }));

  // // Assuming your data for the monthly area chart is available in your chartData array
  // const areaChartData = chartData?.map((dataItem) => ({
  //   name: filterType === "monthly" ? filter +'  '+ dataItem._id : filter +'  '+ dataItem._id.toString(),
  //   uv: dataItem.jobsPosted, // Change this property based on your actual data
  //   pv: dataItem.applicationsDone, // Change this property based on your actual data
  //   // Add other properties as needed
  // }));

  return (
    <div className="flex m-3 gap-3 w-full">
      {/* Line Chart */}
      <div className="w-full  sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2  mb-4   ">
        <div className="border rounded shadow-md p-3 h-auto">
          <LineChart
            width={400}
            height={200}
            data={lineChartData}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="TotalJobs" stroke="#ff7300" />
            <Line type="monotone" dataKey="TotalApplications" stroke="#387908" />
          </LineChart>
          <div className="w-full text-center p-3">
            <h1 className="font-bold text-lg">Jobs</h1>
            <p>The Count of Job Posting </p>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4">
        <div className="border rounded shadow-md w-full p-3 h-auto">
          <BarChart
            width={400}
            height={200}
            data={barChartData}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Bar dataKey="NumberOfApplicants" fill="#8884d8" />
          </BarChart>
          <div className="w-full text-center p-3">
            <h1 className="font-bold text-lg">No. Of Applicants</h1>
            <p>Count of Applicants In recents</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
