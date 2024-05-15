import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex justify-center space-x-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create-experiment">Create Experiment</Link>
        </li>
        <li>
          <Link to="/create-variant">Create Variant</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
