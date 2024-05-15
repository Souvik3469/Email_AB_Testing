// LeftBar.jsx

import React from 'react';

const LeftBar = ({ experiments }) => {
  return (
    <div className="bg-gray-200 h-screen w-64 p-4">
      <h2 className="text-xl font-bold mb-4">Experiments</h2>
      <ul>
        {experiments.map((experiment) => (
          <li key={experiment.id} className="mb-2">
            <a href={`/experiments/${experiment.id}`} className="text-blue-500 hover:text-blue-700">
              {experiment.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftBar;
