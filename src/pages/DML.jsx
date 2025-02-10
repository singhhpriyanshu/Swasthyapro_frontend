import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const DML = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [verified, setVerified] = useState(false);
    const [bookingIds, setBookingIds] = useState([]);
    const [testDetails, setTestDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { backendUrl, userData } = useContext(AppContext);

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async (bookingId) => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // Fetch order details from backend (replace with actual API call)
        const {data} = await axios.get(`http://localhost:5000/payAtdml/${bookingId}`)
       
        
        const orderData = data.order[0];
        const options = {
            key: orderData.key, // Replace with your Razorpay Key ID
            amount: orderData.payment_due, // Amount in paise
            currency: "INR",
            name: "Acme Corp",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: orderData.order_id, // Order ID from backend
            handler: function (response) {
                alert("Payment Successful!");


                axios.post(`http://localhost:5000/verifyDmlPayment/${orderData.bookingId}`, {
                    payment_id: response.razorpay_payment_id,
                    order_id: response.razorpay_order_id,
                    signature: response.razorpay_signature
                }).then(res => {
                    alert("Payment status updated successfully");
                }).catch(err => {
                    alert("Error while updating payment status");
                });




            },
            prefill: {
                "name": "Akash Suryavanshi",
                "email": "akash07may@gmail.com",
                "contact": "9140974308",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();




    };


    useEffect(() => {

        if (bookingIds.length > 0) {
            fetchTestDetails();
        }
    }, [bookingIds]);

    const sendOtp = async () => {
        try {
            const response = await axios.post(`${backendUrl}/send_dml_otp/${email}`);
            if (response) {
                setOtpSent(true);

                toast.success("OTP sent to your email!");
            }
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to send OTP");
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post(`${backendUrl}/auth/otpVerification/${email}`, { email, otp });
            if (response.data) {
                setVerified(true);
                fetchBookingIds();

            } else {
                toast.error("Invalid OTP");
            }
        } catch (error) {
            console.error("Error verifying OTP", error);
            toast.error(error.response?.data?.error || "OTP verification failed");
        }
    };

    const fetchBookingIds = async () => {
        try {
            const response = await axios.get(`${backendUrl}/get_booking_id/${email}`);
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
                const response = await axios.get(`${backendUrl}/getfacility/book/${bookingId}`);
                details[bookingId] = {
                    tests: response.data.Tests,
                    balance_due: response.data.balance_due
                }
                // details[balance_due]=response.data.balance_due;
            }
            setTestDetails(details);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };




    console.log(testDetails);


    return (
        <div className="flex flex-col items-center gap-4 p-6">
            {!otpSent ? (
                <div className="flex flex-col gap-2">
                    <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"

                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"

                        onClick={sendOtp}>Send OTP</button>
                </div>
            ) : !verified ? (
                <div className="flex flex-col gap-2">
                    <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"

                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={verifyOtp}>Verify OTP</button>
                </div>
            ) : (
                <div>
                    {bookingIds.map((bookingId, index) => (
                        <div key={bookingId} className="mb-8 bg-white rounded-lg shadow-md">
                            <div className="bg-blue-600 text-white p-4 rounded-t-lg">
                                <h2 className="text-xl font-semibold">Order No.: {index + 1}</h2>
                            </div>

                            <div className="p-4">
                                {testDetails[bookingId]?.tests?.length > 0 ? (
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
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {testDetails[bookingId].tests.map((test) => (
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
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <p className="mt-4 text-lg font-semibold">Balance Due: ₹{testDetails[bookingId].balance_due}</p>
                                        {testDetails[bookingId].balance_due===0?<></>:<><button
                                            onClick={()=>{handlePayment(bookingId)}}
                                            className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg"
                                        >
                                            Pay Now
                                        </button></>}
                                        
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No tests found for this booking</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DML;