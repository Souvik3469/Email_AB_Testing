import React from 'react';

const LeftBar = ({ experiments, onExperimentClick }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Experiments</h2>
      <ul>
        {experiments && experiments.map(experiment => (
          <li
            key={experiment.id}
            className="cursor-pointer p-2 hover:bg-gray-200"
            onClick={() => onExperimentClick(experiment.id, experiment.name)}
          >
            {experiment.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftBar;
