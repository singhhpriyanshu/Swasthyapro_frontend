import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TestsDetails = () => {
  const [testDetails, setTestDetails] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchTestDetails(id);
      fetchFaqs(id);
    }
  }, [id]);

  const fetchTestDetails = async (testId) => {
    try {
      const response = await axios.get(`http://localhost:5000/admin/getfacility/${facilityId}`);
      console.log(response,"jkj");
      
      if (response.data) {
        console.log("Fetched test details:", response.data);
        setTestDetails(response.data);
      }
    } catch (error) {
      console.error("Error fetching test details:", error);
      console.error(error.response ? error.response.data : "No additional error info available.");
    }
  };
  
  const fetchFaqs = async (testId) => {
    try {
      const response = await axios.get(`http://localhost:5000/admin/getfaqs/${testId}`);
      console.log(response,"kkkj");

      if (response.data) {
        console.log("Fetched FAQs:", response.data);
        setFaqs(response.data);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      console.error(error.response ? error.response.data : "No additional error info available.");
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <div>
        {testDetails ? (
          <div>
            <h2 className="text-xl font-bold">{testDetails.test_name}</h2>
            <p>{testDetails.test_details}</p>
            <p>Preparation: {testDetails.test_preparation_details}</p>
            <p>TAT: {testDetails.test_TAT}</p>
            <p>Price: ${testDetails.price_for_test}</p>
          </div>
        ) : (
          <p>Loading test details...</p>
        )}
      </div>
      <div>
        <h3 className="text-lg font-bold mt-4">FAQs:</h3>
        {faqs.length > 0 ? (
          faqs.map((faq, index) => (
            <div key={index} className="mb-2">
              <p><strong>Q: {faq.question}</strong></p>
              <p>A: {faq.answer}</p>
            </div>
          ))
        ) : (
          <p>No FAQs available.</p>
        )}
      </div>
    </div>
  );
};

export default TestsDetails;
