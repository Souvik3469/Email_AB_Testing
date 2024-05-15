import React, { useEffect, useState } from 'react';
import "chart.js/auto";

import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import { getMyVariantQuery } from '../api/variant/index';
import { getMyExperimentsQuery } from '../api/experiment/index';
import Navbar from './Navbar';
import LeftBar from './Leftbar'


const Home = () => {
  const [variantData, setVariantData] = useState(null);
  const experimentId = "664372c4042c7cde97014f5d"; 
const { data: experiments, isLoading: experimentsLoading, isError: experimentsError } = getMyExperimentsQuery(); // Fetch all experiments

  const { data: variants, isLoading: variantsLoading, isError: variantsError } = getMyVariantQuery(experimentId);

  useEffect(() => {
    if (variants) {
      const eventData = variants.map(variant => variant.event); // Extract events from variants
      const eventCounts = countEvents(eventData); // Count occurrence of each event

      const chartData = {
        labels: Object.keys(eventCounts), // Event names
        datasets: [
          {
            label: 'Event Count',
            data: Object.values(eventCounts), // Count of each event
            backgroundColor: ['rgb(255, 9, 0)', 'rgb(255, 230, 0)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'], // Example colors
            borderColor: 'rgba(0,0,0,0.5)',
            borderWidth: 1,
          },
        ],
      };
      setVariantData(chartData);
    }
  }, [variants, experimentId]);

  const countEvents = (events) => {
    return events.reduce((acc, event) => {
      acc[event] = (acc[event] || 0) + 1;
      return acc;
    }, {});
  };

  if (variantsLoading|| experimentsLoading) return <div>Loading...</div>;
  if (variantsError||experimentsError) return <div>Error fetching data</div>;

 return (
  <div className="flex flex-col h-screen">
    <Navbar className="fixed top-0 left-0 right-0 z-10" /> {/* Add fixed positioning and adjust z-index */}
    <div className="flex flex-grow">
      <div className="w-1/4 bg-gray-200 p-4"> {/* Adjust the width, background color, padding */}
        <LeftBar experiments={experiments} /> {/* Place LeftBar component here */}
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-3xl font-bold my-4">View All Variants</h1>
        <div className="max-w-2xl mx-auto grid grid-cols-2 gap-8">
          <div>
            {variantData ? <Bar data={variantData} /> : <div>No data available</div>}
          </div>
          <div>
            {variantData ? <Pie data={variantData} /> : <div>No data available</div>}
          </div>
          <div>
            {variantData ? <Line data={variantData} /> : <div>No data available</div>}
          </div>
          <div>
            {variantData ? <Doughnut data={variantData} /> : <div>No data available</div>}
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default Home;
