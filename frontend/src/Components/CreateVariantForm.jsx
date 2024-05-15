// CreateVariantForm.jsx

import React, { useState } from 'react';
import { createVariant } from '../api/variant';
import Navbar from './Navbar';

const CreateVariantForm = () => {
  const [subject, setSubject] = useState('');
  const [sender, setSender] = useState('');
  const [contentLine1, setContentLine1] = useState('');
  const [contentLine2, setContentLine2] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call API to create variant
      const ExperimentId = ''; // Set the experiment ID here
      const variantInfo = { subject, sender, contentLine1, contentLine2 };
      const data = await createVariant(ExperimentId, variantInfo);
      console.log('Variant created:', data);
      // Reset form fields
      setSubject('');
      setSender('');
      setContentLine1('');
      setContentLine2('');
    } catch (error) {
      console.error('Error creating variant:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div>   
        <Navbar />
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Create Variant</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md mb-2"
        />
        <input
          type="text"
          placeholder="Sender"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md mb-2"
        />
        <input
          type="text"
          placeholder="Content Line 1"
          value={contentLine1}
          onChange={(e) => setContentLine1(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md mb-2"
        />
        <input
          type="text"
          placeholder="Content Line 2"
          value={contentLine2}
          onChange={(e) => setContentLine2(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Create
        </button>
      </form>
    </div>
    </div>
  );
};

export default CreateVariantForm;
