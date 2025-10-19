import React, { useState } from 'react';
import './AnalysisForm.css';

const AnalysisForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    doctorName: '',
    type: ''
  });

  const analysisTypes = [
    'Urinalysis',
    'MRI Scan',
    'Biopsy',
    'Genetic Testing'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/analyse/formulaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Analysis request submitted successfully!');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          doctorName: '',
          type: ''
        });
      } else {
        const errorData = await response.json();
        alert('Erreur : ' + errorData.message);
      }
    } catch (error) {
      console.error('Erreur :', error);
      alert("Une erreur est survenue !");
    }
  };

  return (
    <div className="all">
      <h1>BioCheck</h1>
      <h2>Reliable Testing. Real-Time Results</h2>

      <div className="mainFor">
        <h2 className="title">Medical Analysis Request</h2>

        <form onSubmit={handleSubmit} className='for'>
          <div className="form-group">
            <label className='labelFor' htmlFor="firstName">First Name:</label>
            <input
            className='inputFor'
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className='labelFor' htmlFor="lastName">Last Name:</label>
            <input
            className='inputFor'
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className='labelFor' htmlFor="email">Email:</label>
            <input
            className='inputFor'
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className='labelFor' htmlFor="doctorName">Doctor's Name:</label>
            <input
            className='inputFor'
              type="text"
              id="doctorName"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type" className='labelFor'>Type of Analysis:</label>
            <select
              id="type"
              className='selectFor'
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="" className='optionFor'>Select an analysis type </option>
              {analysisTypes.map((type, index) => (
                <option key={index} value={type} className='optionFor'>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnalysisForm;
