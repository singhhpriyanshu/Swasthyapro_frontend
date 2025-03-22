import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const MyTest = () => {
  const [bookingIds, setBookingIds] = useState([]);
  const [testDetails, setTestDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { backendUrl ,userData} = useContext(AppContext);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [booking_status, setBookingStatus] = useState("");
  const [cancellation_reason, setCancellationReason] = useState("");

  // Fetch booking IDs when component mounts
  useEffect(() => {
    fetchBookingIds();
  }, []);

  // Fetch test details whenever booking IDs change
  useEffect(() => {
    if (bookingIds.length > 0) {
      fetchTestDetails();
    }
  }, [bookingIds]);

  const cancelAppointment = async () => {
    if (!appointmentToDelete) return;
    const requestData = {
      booking_status, // booking_status value
      cancellation_reason // cancellation_reason value
    };
    try {
      const response = await axios.delete(
        `${backendUrl}/api/cancelTest/${appointmentToDelete}`, {
          headers: {
            'Content-Type': 'application/json',  // Set the correct content type
          },
          data: requestData  // Send the booking status and cancellation reason in the body
        });
      if (response.data?.Success) {
        toast.success(response.data.Success);
        // Refresh the list
      } else {
        toast.error(response.data?.Error || "Failed to cancel appointment.");
      }
    } catch (error) {
      toast.error("Failed to cancel the appointment. Please try again.");
    } finally {
      setShowConfirmPopup(false);
      setAppointmentToDelete(null);
    }
  };
  const isFormValid = booking_status.trim() !== "" && cancellation_reason.trim() !== "";

  const fetchBookingIds = async () => {
    try {
      const email = userData.email
      
      if (!userData) {
        throw new Error('User not logged in');
      }

      const response = await axios.get(`${backendUrl}/api/get_booking_id/${email}`);
      setBookingIds(response.data.bookingIds);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchTestDetails = async () => {
    try {
      const details = {};
      for (const bookingId of bookingIds) {
        const response = await axios.get(`${backendUrl}/api/getfacility/book/${bookingId}`);
        details[bookingId] = response.data.Tests;
      }
      setTestDetails(details);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleCancelClick = (appointmentId) => {
    setAppointmentToDelete(appointmentId);
    setShowConfirmPopup(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading your test details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (bookingIds.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">No test bookings found</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Test Bookings</h1>
      
      {bookingIds.map((bookingId,index) => (
        <div key={bookingId} className="mb-8  bg-white rounded-lg shadow-md flex-row">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg">
            <h2 className="text-xl font-semibold">Order {index + 1}</h2>
            <button
                className="bg-[#FF6865] text-white py-2 px-4 rounded shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-red-600 focus:outline-none"
                onClick={() => handleCancelClick(bookingId)}
              >
                Cancel Test
              </button>
          </div>
          
          <div className="p-4">
            {testDetails[bookingId] && testDetails[bookingId].length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GST</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {testDetails[bookingId].map((test) => (
                      <tr key={test.testId}>
                        <td className="px-6 py-4 whitespace-nowrap">{test.test_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{test.qty}</td>
                        <td className="px-6 py-4 whitespace-nowrap">₹{test.price_for_test}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {test.discount_percentage}% 
                          <span className="text-gray-500 text-sm ml-1">
                            (₹{test.price_after_discount})
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {test.gst_rate}%
                          <span className="text-gray-500 text-sm ml-1">
                            (₹{test.gst_amt})
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">₹{test.total_amt}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{test.test_status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No tests found for this booking</p>
            )}
          </div>
        </div>
      ))}
      {showConfirmPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 m-4 shadow-lg max-w-sm">
            <h2 className="text-lg font-bold mb-4">Confirm Cancellation</h2>
            <p>Are you sure you want to cancel this appointment?</p>
            <div className="flex flex-col gap-2 mt-4">

            <input
                type="text"
                className="border p-2 rounded-md mb-2"
                placeholder="Enter Booking Status"
                value={booking_status}
                onChange={(e) => setBookingStatus(e.target.value)}
              />
              
              {/* Cancellation Reason Input */}
              <input
                type="text"
                className="border p-2 rounded-md mb-4"
                placeholder="Enter Cancellation Reason"
                value={cancellation_reason}
                onChange={(e) => setCancellationReason(e.target.value)}
              />


              <button
                className="bg-red-500 text-white py-2 px-4 rounded shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-red-600 focus:outline-none"
                onClick={cancelAppointment}
                disabled={!isFormValid}
              >
                Yes, Cancel
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-gray-600 focus:outline-none"
                onClick={() => {
                  setShowConfirmPopup(false);
                  setAppointmentToDelete(null);
                }}
              >
                No, Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTest;