import React from 'react';

const LeftBar = ({ experiments, onExperimentClick }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Experiments</h2>
      <ul className="space-y-2">
        {experiments && experiments.map(experiment => (
          <li
            key={experiment.id}
            className="cursor-pointer p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200"
            onClick={() => onExperimentClick(experiment.id, experiment.name)}
          >
            <div className="text-lg font-medium text-gray-700">{experiment.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftBar;
