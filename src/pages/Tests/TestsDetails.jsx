import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
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
  const { cart, setcart } = useContext(AppContext);

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

  const handleAddToCart = (test) => {
    const existingTestIndex = cart.findIndex(item => item.test_id === test.test_id);
    if (existingTestIndex > -1) {
      // Item already exists, increase quantity
      const updatedCart = [...cart];
      updatedCart[existingTestIndex].qty += 1;
      updatedCart[existingTestIndex].total_price = updatedCart[existingTestIndex].qty * updatedCart[existingTestIndex].price_for_test;
      setcart(updatedCart);
      alert("item added to cart");
    } else {
      // Item doesn't exist, add it to the cart
      const newTest = {
        ...test,
        qty: 1,
        total_price: test.price_for_test,
      };
      setcart([...cart, newTest]);
      alert("item added to cart");
    }
    console.log(cart);
  };

  return (
    <div className="flex flex-col w-full bg-gray-200">
      <div className="w-full">
        <img src={maintestimg} alt="Main Test" className="w-full object-cover" style={{ height: '300px' }} />
      </div>

      <div className="p-4">
        <div className="border border-gray-300 rounded-lg shadow p-4 mb-4 bg-gradient-to-r from-blue-200 to-green-200">
          <h1 className="text-xl font-bold text-gray-800">{testDetails?.test_name}</h1>
          <p><strong>Price:</strong> ₹{testDetails?.price_for_test}</p>
          <p>{testDetails?.test_details}</p>
        </div>

        <div className="border border-gray-300 rounded-lg shadow p-4 mb-4 bg-gradient-to-r from-green-200 to-blue-200">
          <p><strong>Preparation:</strong> {testDetails?.test_preparation_details}</p>
          <p><strong>Turn Around Time (TAT):</strong> {testDetails?.test_TAT}</p>
        </div>

        <div className="mt-6 bg-gradient-to-b from-blue-100 to-green-100 rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-bold">Parameters</h2>
          {parameters.length > 0 ? (
            parameters.map((parameter) => (
              <div
                key={parameter.id}
                className="border border-gray-200 rounded-lg p-4 mb-2"
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
                <div className="parameter-item">
                  {parameter.parameter_name}
                </div>
                {paraId === parameter.id && updatePara && (
                  <div className="parameter-item">
                    {parameter.parameter_child_name}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No parameters available for this test.</p>
          )}
        </div>

        <div className="mt-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-bold">Frequently Asked Questions</h2>
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
              <div className="faq-question">
                <strong>Q:</strong> {faq.faq}
              </div>
              {faqId === faq.id && updateFaq && (
                <div className="faq-answer">
                  <strong>A:</strong> {faq.faqa}
                </div>
              )}
            </div>
          )) : <p>No FAQs available for this test.</p>}
        </div>
      </div>

      {/* Wrapping the Book Now button in a flex container aligned to the right */}
      <div className="flex justify-center p-4">
        <button className="bg-green-600 text-white px-4 py-1 rounded shadow-md hover:bg-green-700" 
          onClick={() => { handleAddToCart(testDetails) }}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default TestsDetails;
