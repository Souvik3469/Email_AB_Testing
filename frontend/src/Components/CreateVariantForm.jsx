import React, { useState } from 'react';
import { createVariant } from '../api/variant';
import { getMyExperimentsQuery } from '../api/experiment/index';
import Navbar from './Navbar';

const CreateVariantForm = () => {
  const [subject, setSubject] = useState('');
  const [sender, setSender] = useState('');
  const [contentLine1, setContentLine1] = useState('');
  const [contentLine2, setContentLine2] = useState('');
  const [selectedExperimentId, setSelectedExperimentId] = useState('');
  const { data: experiments, isLoading, isError } = getMyExperimentsQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const variantInfo = { subject, sender, contentLine1, contentLine2 };
      const data = await createVariant(selectedExperimentId, variantInfo);
      console.log('Variant created:', data);
     
 
      setSubject('');
      setSender('');
      setContentLine1('');
      setContentLine2('');
      setSelectedExperimentId('');
    } catch (error) {
      console.error('Error creating variant:', error);
    }
  };

  return (
    <div>   
      <Navbar />
      <div className="flex justify-center mt-8">
        <div className="bg-white shadow-md rounded-md p-6 w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4">Create Variant</h2>
          {isLoading ? (
            <div>Loading experiments...</div>
          ) : isError ? (
            <div>Error loading experiments</div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col">
              <select
                value={selectedExperimentId}
                onChange={(e) => setSelectedExperimentId(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-md mb-4"
              >
                <option value="" disabled>Select Experiment</option>
                {experiments && experiments.map(experiment => (
                  <option key={experiment.id} value={experiment.id}>
                    {experiment.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-md mb-4"
              />
              <input
                type="text"
                placeholder="Sender"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-md mb-4"
              />
              <input
                type="text"
                placeholder="Content Line 1"
                value={contentLine1}
                onChange={(e) => setContentLine1(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-md mb-4"
              />
              <input
                type="text"
                placeholder="Content Line 2"
                value={contentLine2}
                onChange={(e) => setContentLine2(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-md mb-4"
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Create
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateVariantForm;
