import React, { useContext, useEffect, useRef, useState } from 'react'
import DashboardLayout from '../layout/DashboardLayout'
import { useAuth, useUser } from '@clerk/react';
import { userCreditsContext } from '../context/UserCreditsContext';
import { getUserCredits } from '../services/UserService';
import { AlertCircle, Check, CreditCard, Loader2 } from 'lucide-react';
import { pricingPlans } from '../assets/data';
import { createOrder, verifyPayment } from '../services/PaymentService';

const Subscription = () => {

  const[proccessingPayment, setProccessingPayment] = useState(false);
  const[message, setMessage] = useState("");
  const[messageType, setMessageType] = useState("");
  const[razorpayLoaded, setRazorpayLoaded] = useState(false);

  const {getToken}= useAuth();
  const razorpayScriptRef = useRef();
  const {credits, setCredits, fetchUserCredits}= useContext(userCreditsContext);
  const {user} = useUser();

  // Load Razorpay script
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = () => {
        console.log("Razorpay script loaded successfully");
        setRazorpayLoaded(true);
      };

      script.onerror = () => {
        console.error("Failed to load Razorpay script");
        setMessage(
          "Payment gateway failed to load. Please refresh the page and try again."
        );
        setMessageType("error");
      };

      document.body.appendChild(script);
      razorpayScriptRef.current = script;
    } else {
      setRazorpayLoaded(true);
    }

    return () => {
      // Cleanup script on component unmount
      if (razorpayScriptRef.current) {
        document.body.removeChild(razorpayScriptRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchUserCredits = async () => {
      try {
        const token = await getToken();

        const response = await getUserCredits(token)

        setCredits(response.data.credits);
      } catch (error) {
        console.error("Error fetching user credits:", error);
        setMessage("Failed to load your current credits. Please try again later.");
        setMessageType("error");
      }
    };

    fetchUserCredits();
  }, [getToken]);


  const handlePurchase=async(plan)=>{
    if(!razorpayLoaded){
      setMessage("Payment gateway is still loading. Please wait a moment and try again.");
      setMessageType('error');
      return;
    }

    setMessage('');
    setProccessingPayment(true);

    try{
      const token = await getToken();

      const data = {
        planId: plan.id,
        amount: plan.price*100,
        currency: "INR",
        credits: plan.credits
      }
      const response = await createOrder(token,data);
      console.log(response);
      
      const options={
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: plan.price*100,
        currency: "INR",
        name: "CloudNest",
        description: `Purchase ${plan.credits} credits`,
        order_id: response.data.orderId,
        handler: async function(response){

          console.log("Razorpay Response:", response);

          const verify = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            planId: plan.id.toLowerCase()
          }

          console.log("Verification Request:", verify);
          try{
            const verifyResponse = await verifyPayment(token,verify);

            if(verifyResponse.data.success){
              if(verifyResponse.data.credits){
                console.log("Updating credits to: ", verifyResponse.data.credits);
                setCredits(verifyResponse.data.credits);
              }
              else{
                console.log("Credits not in response, fetching latest credits.");
                await fetchUserCredits();
              }

              setMessage(`Payment successful! ${plan.name} plan activated.`);
              setMessageType("success");
            }
            else{
              setMessage("Payment verification failed. Please contact the support.");
              setMessageType("error");
            }
          }
          catch(error){
            console.error("Payment verification error: ", error);
            setMessage("Payment verification failed. Please contact the support.");
            setMessageType("error");

          } 
        },
        prefill:{
          name: user.fullName,
          email: user.primaryEmailAddress
        },
        theme: {
          color: "#a855f7"
        }
      };

      if(window.Razorpay){
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }
      else{
        throw new Error("Razorpay SDK not loaded.")
      }

    }
    catch(error){
      console.error("Payment Initiation failed: ", error);
      setMessage("Payment Initiation failed. Please try again later.");
      setMessageType("error");
    }
    finally{
      setProccessingPayment(false);
    }
  }

  return (
    <DashboardLayout activeMenu="Subscription">
      <div className="p-6">

        <h1 className="text-2xl font-bold mb-2">
          Subscription Plans
        </h1>

        <p className="text-gray-600 mb-6">
          Choose a plan that works for you
        </p>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              messageType === "error"
                ? "bg-red-50 text-red-700"
                : messageType === "success"
                ? "bg-green-50 text-green-700"
                : "bg-blue-50 text-blue-700"
            }`}
          >
            {messageType === "error" && <AlertCircle size={20} />}

            {message}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className='text-purple-500'/>
              <h2 className="text-lg font-medium">
                Current Credits: <span className='font-bold text-purple-500'>{credits}</span>
              </h2>
            </div>

            <p className="text-sm text-gray-600 mt-2">
              You can Upload {credits} more files with your current credits.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {pricingPlans
            .filter((plan) => plan.id !== "Free")
            .map((plan) => (
              <div key={plan.id} className={`relative flex flex-col rounded-2xl  shadow-lg transition-all duration-300 hover:-translate-y-2    hover:shadow-2xl ${ plan.popular ? "border-2 border-purple-500 bg-linear-to-br from-purple-50 to-white" : "bg-white" }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 px-4 py-1 text-sm font-semibold text-white">
                        Most Popular
                    </div>
                )}

                {/* Top Section */}
                <div className="p-8 text-center ">
                    <h3 className="text-4xl font-bold text-gray-900">
                    {plan.name}
                    </h3>

                    <p className="mt-4 text-gray-600">
                    {plan.description}
                    </p>

                    <p className="mt-8 text-5xl font-bold text-purple-600">
                    ₹{plan.price}
                    </p>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col flex-1 bg-gray-50 px-8 py-8">
                    <ul className="space-y-5 flex-1">
                    {plan.features.map((feature, index) => (
                        <li
                        key={index}
                        className="flex items-center gap-3"
                        >
                        <Check className="h-5 w-5 text-purple-500 shrink-0" />

                        <span className="text-gray-700">
                            {feature}
                        </span>
                        </li>
                    ))}
                    </ul>

                    {/* Button always at bottom */}
                    <button
                        onClick={() => handlePurchase(plan)}
                        disabled={proccessingPayment}
                        className={`mt-10 w-full rounded-lg py-3 text-lg font-semibold  transition-all duration-300 shadow-md
                        ${
                        plan.popular
                            ? "text-white bg-linear-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                            : "bg-white text-purple-500 hover:border-2 hover:border-purple-500"
                        }`}
                    >
                      
                        {proccessingPayment ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <span>Go {plan.name}</span>
                        )}

                    </button>
                </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium mb-2">
            How credits work
          </h3>

          <p className="text-md text-gray-600">
            Each file upload consumes 1 credit. New users start with 5 free credits.
            Credits never expire and can be used at any time. If you run out of credits,
            you can purchase more through one of our plans above.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Subscription
