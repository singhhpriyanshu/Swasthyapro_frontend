import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

const Cart = () => {
  const { userData, cart, setcart } = useContext(AppContext);
  const [paymentMethod, setPaymentMethod] = useState("FULL");
  const [billing_address,setbilling_address]=useState('');
  const [coupon_code, setcoupon_code] = useState('');

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadScript("https://checkout.razorpay.com/api/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // Fetch order details from backend (replace with your actual API call)
    const orderData = await axios.post("http://localhost:5000/api/facility/book", {
      tests: cart,
      choose_payment_type: paymentMethod,
      userId: userData.userId,
      billing_address: billing_address,  
      coupon_code: coupon_code, 
     });

    const options = {
      key: orderData.data.key, // Replace with your Razorpay Key ID
      amount: orderData.data.amount, // Amount in paise
      currency: orderData.data.currency,
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderData.data.order_id, // Order ID from backend
      handler: function (response) {
        alert("Payment Successful!");

        axios
          .post(
            `https://www.swasthyapro.com/api/verify_payment/${orderData.data.bookingId}`,
            {
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,
            }
          )
          .then(() => {
            alert("Payment status updated successfully");
          })
          .catch(() => {
            alert("Error while updating payment status");
          });
      },
      prefill: {
        name: "Akash Suryavanshi",
        email: "akash07may@gmail.com",
        contact: "9140974308",
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

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // Increase qty
  const handleIncreaseqty = (testId) => {
    const updatedCart = cart.map((item) => {
      if (item.test_id === testId) {
        return {
          ...item,
          qty: item.qty + 1,
          total_price: (item.qty + 1) * item.price_for_test,
        };
      }
      return item;
    });
    setcart(updatedCart);
  };

  // Decrease qty
  const handleDecreaseqty = (testId) => {
    const updatedCart = cart
      .map((item) => {
        if (item.test_id === testId && item.qty > 1) {
          return {
            ...item,
            qty: item.qty - 1,
            total_price: (item.qty - 1) * item.price_for_test,
          };
        }
        return item;
      })
      .filter((item) => item.qty > 0);
    setcart(updatedCart);
  };

  // Remove from cart
  const handleRemoveFromCart = (testId) => {
    const updatedCart = cart.filter((item) => item.test_id !== testId);
    setcart(updatedCart);
  };

  // Calculate total
  const totalPrice = cart.reduce((acc, item) => acc + item.total_price, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{marginTop:-48}}>
      {/* Header */}
      <div className="p-4 bg-white border-b">
        <h2 className="text-xl font-semibold">Your Cart</h2>
      </div>

      <div className="container mx-auto flex-1 p-4">
        {cart.length === 0 ? (
          <p className="text-gray-700">Your cart is empty</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Left Column (3/4 width on md+) */}
            <div className="md:col-span-3 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.test_id}
                  className="bg-white rounded-md p-4 shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {item.test_name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        ₹{item.price_for_test}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item.test_id)}
                      className="text-red-500 hover:text-red-600 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                  {/* Quantity & total row */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDecreaseqty(item.test_id)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="font-medium">{item.qty}</span>
                      <button
                        onClick={() => handleIncreaseqty(item.test_id)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold text-gray-800">
                      ₹{item.total_price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column (1/4 width on md+) */}
            <div className="md:col-span-1 flex flex-col space-y-4">
              {/* Total Amount */}
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold text-gray-800">
                  Total Test Price
                </h3>
                <p className="mt-2 text-xl font-bold text-gray-900">
                  ₹{totalPrice}
                </p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold text-gray-800">
                  GST Amount 18 % Total Price
                </h3>
                <p className="mt-2 text-xl font-bold text-gray-900">
                  ₹{totalPrice*0.18}
                </p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold text-gray-800">
                  Total Amount
                </h3>
                <p className="mt-2 text-xl font-bold text-gray-900">
                  ₹{totalPrice + 0.18 *totalPrice}
                </p>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Choose Payment Method
                </h3>
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    value="FULL"
                    checked={paymentMethod === "FULL"}
                    onChange={handlePaymentChange}
                    name="paymentMethod"
                    className="mr-2"
                  />
                  <label className="text-gray-700">FULL Payment</label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    value="PARTIAL"
                    checked={paymentMethod === "PARTIAL"}
                    onChange={handlePaymentChange}
                    name="paymentMethod"
                    className="mr-2"
                  />
                  <label className="text-gray-700">PARTIAL Payment</label>
                </div>
                <p className="text-sm text-gray-500">
                  Selected Payment Method: {paymentMethod}
                </p>
                <p>Selected Payment Method: {paymentMethod==="FULL"?<p>{totalPrice + totalPrice * 0.18}</p>:<p>70% of {totalPrice + totalPrice * 0.18} </p>}</p>

              <p>
                Amount to Pay: {paymentMethod === "FULL"
                  ? totalPrice + totalPrice * 0.18
                  : 0.7 * totalPrice + 0.7 * totalPrice * 0.18}
              </p>
              </div>

              {/* Pay Now Button */}
              <h3>Enter Current Address</h3>
            <div>
              <label>
                <input
               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"

                type="text"
                value={billing_address}
                  
                  onChange={(e)=>{setbilling_address(e.target.value)}}
                  name="billing_address"
                />
                {/* Billing Address */}
              </label>
            </div>
            <div>
          <label>
          Coupon Code
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"

              type="text"
              value={coupon_code}

              onChange={(e) => { setcoupon_code(e.target.value) }}
              name="coupon_code"
              placeholder="Enter coupon code if available"
            />
            
          </label>
        </div>
              <div className="bg-white p-4 rounded shadow">
                <button
                  onClick={handlePayment}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-lg"
                >
                  Pay Now
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
