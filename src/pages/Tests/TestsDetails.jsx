import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import maintestimg from '../../assets/maintestimg.jpeg';  // Confirm that the path is correct

const TestsDetails = () => {
  const location = useLocation();
  const testDetails = location.state?.testDetails;
  const [faqs, setFaqs] = useState([]);
  const [faqId, setFaqId] = useState(null);
  const [parameters, setParameters] = useState([]);
  const [updateFaq, setUpdateFaq] = useState(false);
  const [updatePara, setUpdatePara] = useState(false);
  const [paraId, setParaId] = useState(null);

  useEffect(() => {
    if (testDetails?.test_id) {
      fetchFaqs(testDetails.test_id);
      fetchParameters(testDetails.test_id);
    }
  }, [testDetails]);

  const fetchFaqs = async (test_id) => {
    try {
      const response = await axios.get(`http://localhost:5000/admin/getfaq/${test_id}`);
      if (response.data && response.data.faqs) {
        setFaqs(response.data.faqs);
      } else {
        console.error("No FAQs found");
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  const fetchParameters = async (test_id) => {
    try {
      const response = await axios.get(`http://localhost:5000/admin/getparameters/${test_id}`);
      if (response.data && response.data.parameters) {
        setParameters(response.data.parameters);
      } else {
        console.log("No parameters found");
      }
    } catch (error) {
      console.error("Error fetching parameters:", error);
    }
  };

  return (
    <div className="flex flex-col w-full bg-gray-200" style={{marginTop:-20}}>
      <div className="w-full">
        <img src={maintestimg} alt="Main Test" className="w-full object-cover" style={{ height: '300px' }} />
      </div>

      <div className="p-4">
        {/* First set of details: Test Name and Test Details */}
        <div className="border border-white-300 rounded p-4 mb-4 bg-[#FFFFFF]">
          <h1 className="text-xl font-bold">{testDetails?.test_name}</h1>
          <p><strong>Price:</strong> ₹{testDetails?.price_for_test}</p>
          <p>{testDetails?.test_details}</p>
        </div>

        {/* Second set of details: Other information */}
        <div className="border border-white-300 rounded p-4 mb-4 bg-[#FFFFFF]">
          <p><strong>Preparation:</strong> {testDetails?.test_preparation_details}</p>
          <p><strong>Turn Around Time (TAT):</strong> {testDetails?.test_TAT}</p>
        </div>

        <div className="mt-6 bg-[#FFFFFF]">
          <h2 className="text-lg font-bold">Parameters</h2>
          {parameters.length > 0 ? (
            parameters.map((parameter) => (
              <div
                key={parameter.id}
                className="outer-container border border-gray-300 rounded p-4 mb-4"
                onClick={() => {
                  if (updatePara && paraId === parameter.id) {
                    setUpdatePara(false);
                    setParaId(null);
                  } else {
                    setParaId(parameter.id);
                    setUpdatePara(true);
                  }
                }}
              >
                <div className="parameter-item cursor-pointer p-2 mb-2 rounded bg-[#FFFFFF]">
                  {parameter.parameter_name}
                </div>
                {paraId === parameter.id && updatePara && (
                  <div className="parameter-item cursor-pointer p-2 mb-2 rounded">
                    {parameter.parameter_child_name}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No parameters available for this test.</p>
          )}
        </div>
        {/* FAQs Section */}
        <div className="mt-6 bg-[#FFFFFF]" style={{margin:10}}>
          <h2 className="text-lg font-bold bg-[#52b788]" style={{margin:10}}>Frequently Asked Questions</h2>
          <div className="border border-gray-300 rounded p-4 mb-4 shadow-sm" style={{margin:10}}>
            {faqs.length > 0 ? faqs.map((faq) => (
              <div
                key={faq.id}
                className="faq-item mb-2"
                onClick={() => {
                  if (updateFaq && faqId === faq.id) {
                    setUpdateFaq(false);
                    setFaqId(null);
                  } else {
                    setFaqId(faq.id);
                    setUpdateFaq(true);
                  }
                }}
              >
                <div className="faq-question cursor-pointer p-2 mb-2 rounded bg-[#FFFFFF]">
                  <strong>Q:</strong> {faq.faq}
                </div>
                {faqId === faq.id && updateFaq && (
                  <div className="faq-answer cursor-pointer p-2 mb-2 rounded">
                    <strong>A:</strong> {faq.faqa}
                  </div>
                )}
              </div>
            )) : <p>No FAQs available for this test.</p>}
          </div>
        </div>

        {/* Parameters Section */}
      </div>
    </div>
  );
};

export default TestsDetails;
