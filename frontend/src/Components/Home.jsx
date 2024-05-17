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
      setIsLoadingData(false); 
    }
  }, [variants]);

  const countEvents = (events) => {
    return events.reduce((acc, event) => {
      acc[event] = (acc[event] || 0) + 1;
      return acc;
    }, {});
  };

  const handleExperimentClick = (experimentId, experimentName) => {
    setIsLoadingData(true);
    console.log("Expname",experimentName);
    setSelectedExperimentId(experimentId);
    setSelectedExperimentName(experimentName);
  };

  if (experimentsLoading || variantsLoading || isLoadingData) 
  return (
      <div className="flex flex-col h-screen">
        <Navbar className="fixed top-0 left-0 right-0 z-10" />
        <div className="flex flex-grow pt-16 justify-center items-center">
          <div>Loading data it may take sometime...</div>
        </div>
      </div>
    );
  if (experimentsError || variantsError) 
  return (
      <div className="flex flex-col h-screen">
        <Navbar className="fixed top-0 left-0 right-0 z-10" />
        <div className="flex flex-grow pt-16 justify-center items-center">
          <div>Some error occured in loading variants</div>
        </div>
      </div>
    );

   return (
    <div className="flex flex-col h-screen">
      <Navbar className="fixed top-0 left-0 right-0 z-10" />
      <div className="flex flex-grow pt-16">
        <div className="w-1/5 p-6 bg-white shadow-lg">
          <LeftBar experiments={experiments} onExperimentClick={handleExperimentClick} />
        </div>
        <div className="flex flex-col items-center justify-center w-4/5 p-8">
          <h1 className="text-3xl font-bold my-4">View All Variants</h1>
          <h2 className="text-xl font-bold mb-4">{selectedExperimentName}</h2>
          <div className="max-w-4xl w-full grid grid-cols-2 gap-12">
            <div className="p-4 bg-white shadow-md rounded-lg">
              {variantData ? <Bar data={variantData} /> : <div>No data available</div>}
            </div>
            <div className="px-16 py-4 bg-white shadow-md rounded-lg">
              {variantData ? <Pie data={variantData}  /> : <div>No data available</div>}
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg">
              {variantData ? <Line data={variantData} /> : <div>No data available</div>}
            </div>
            <div className="px-16 py-4 bg-white shadow-md rounded-lg">
              {variantData ? <Doughnut data={variantData} /> : <div>No data available</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;