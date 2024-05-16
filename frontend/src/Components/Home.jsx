import React, { useEffect, useState } from 'react';
import "chart.js/auto";
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import { getMyVariantQuery } from '../api/variant/index';
import { getMyExperimentsQuery } from '../api/experiment/index';
import Navbar from './Navbar';
import LeftBar from './Leftbar';

const Home = () => {
  const [variantData, setVariantData] = useState(null);
  const [selectedExperimentId, setSelectedExperimentId] = useState(null);
  const [selectedExperimentName, setSelectedExperimentName] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(true);

  const { data: experiments, isLoading: experimentsLoading, isError: experimentsError } = getMyExperimentsQuery();
  const { data: variants, isLoading: variantsLoading, isError: variantsError } = getMyVariantQuery(selectedExperimentId);

  useEffect(() => {
    if (experiments && experiments.length > 0 && !selectedExperimentId) {
      const initialExperiment = experiments[0];
      setSelectedExperimentId(initialExperiment.id);
      setSelectedExperimentName(initialExperiment.name);
    }
  }, [experiments, selectedExperimentId]);

  useEffect(() => {
    if (variants) {
      const eventData = variants.map(variant => variant.event);
      const eventCounts = countEvents(eventData);

      const chartData = {
        labels: Object.keys(eventCounts),
        datasets: [
          {
            label: 'Event Count',
            data: Object.values(eventCounts),
            backgroundColor: ['rgb(255, 9, 0)', 'rgb(255, 230, 0)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
            borderColor: 'rgba(0,0,0,0.5)',
            borderWidth: 1,
          },
        ],
      };
      setVariantData(chartData);
      setIsLoadingData(false); // Set loading state to false when data is loaded
    }
  }, [variants]);

  const countEvents = (events) => {
    return events.reduce((acc, event) => {
      acc[event] = (acc[event] || 0) + 1;
      return acc;
    }, {});
  };

  const handleExperimentClick = (experimentId, experimentName) => {
    setIsLoadingData(true); // Set loading state to true when fetching new data
    console.log("Expname",experimentName);
    setSelectedExperimentId(experimentId);
    setSelectedExperimentName(experimentName);
  };

  if (experimentsLoading || variantsLoading || isLoadingData) return <div>Loading...</div>;
  if (experimentsError || variantsError) return <div>Error fetching data</div>;

  return (
    <div className="flex flex-col h-screen">
      <Navbar className="fixed top-0 left-0 right-0 z-10" />
      <div className="flex flex-grow pt-16"> {/* Added pt-16 to account for fixed navbar height */}
        <div className="w-1/4 bg-gray-300 p-4">
          <LeftBar experiments={experiments} onExperimentClick={handleExperimentClick} />
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-3xl font-bold my-4">View All Variants</h1>
          <h2 className="text-xl font-bold mb-4">{selectedExperimentName}</h2>
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
