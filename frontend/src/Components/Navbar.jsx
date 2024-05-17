import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-purple-700 p-4 shadow-lg">
      <ul className="flex justify-center space-x-8">
        <li>
          <Link to="/" className="text-white text-lg font-semibold hover:text-blue-200 transition duration-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/create-experiment" className="text-white text-lg font-semibold hover:text-blue-200 transition duration-300">
            Create Experiment
          </Link>
        </li>
        <li>
          <Link to="/create-variant" className="text-white text-lg font-semibold hover:text-blue-200 transition duration-300">
            Create Variant
          </Link>
        </li>
        <li>
          <Link to="/login" className="text-white text-lg font-semibold hover:text-blue-200 transition duration-300">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
