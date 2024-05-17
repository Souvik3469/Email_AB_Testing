import React, { useState } from 'react';
import { createExperiment } from '../api/experiment';
import Navbar from './Navbar';

const CreateExperimentForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const experimentInfo = { name };
      const data = await createExperiment(experimentInfo);
      console.log('Experiment created:', data);
      setName('');
    } catch (error) {
      console.error('Error creating experiment:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mt-4 flex justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-xl font-bold mb-4 text-center">Create Experiment</h2>
          <form onSubmit={handleSubmit} className="flex flex-col bg-white p-6 rounded-lg shadow-md">
            <input
              type="text"
              placeholder="Experiment Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md mb-4"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateExperimentForm;
