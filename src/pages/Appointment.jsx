import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets"; // Your local icons/images
import DoctorTimeSlot from "./DoctorTimeSlot";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);

  useEffect(() => {
    if (doctors.length > 0) {
      const doc = doctors.find((d) => d.id === parseInt(docId, 10));
      setDocInfo(doc);
    }
  }, [doctors, docId]);

  // If doctor data not yet loaded, show a simple loader
  if (!docInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-50">
        <p className="text-green-700 text-lg">Loading doctor details...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-green-50 min-h-screen">
      {/* LEFT COLUMN: Doctor Info */}
      <div className="lg:w-2/3 bg-green-100 p-6 rounded-lg">
        <div className="flex items-start gap-6">
          {/* Doctor Image */}
          <img
            className="w-28 h-28 object-cover rounded-full border-4 border-green-300"
            src={docInfo.image}
            alt={docInfo.name}
          />
          <div>
            {/* Name + “Profile is claimed” */}
            <h2 className="text-2xl font-bold text-green-800">
              {docInfo.name}
              <span className="ml-2 text-base font-normal text-green-600">
                Profile is claimed
              </span>
              {/* Verified icon */}
              <img
                className="inline-block w-5 h-5 ml-2"
                src={assets.verified_icon}
                alt="Verified"
              />
            </h2>

            {/* Specialization, experience */}
            <p className="text-lg text-green-700 mt-2">
              {docInfo.specialization}
            </p>
            <p className="text-sm text-green-700">
              Experience: {docInfo.experience} Years
            </p>
          </div>
        </div>

        {/* Additional fields below the “header” */}
        <div className="mt-6 space-y-2 text-green-700">
          {docInfo.degree && (
            <p>
              <span className="font-semibold">Degree:</span> {docInfo.degree}
            </p>
          )}
          {docInfo.description && (
            <p>
              <span className="font-semibold">Description:</span>{" "}
              {docInfo.description}
            </p>
          )}
          {docInfo.city && (
            <p>
              <span className="font-semibold">City:</span> {docInfo.city}
            </p>
          )}
          {docInfo.state && (
            <p>
              <span className="font-semibold">State:</span> {docInfo.state}
            </p>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Time‐Slot Booking */}
      <div className="lg:w-1/3">
        <DoctorTimeSlot docId={docId} />
      </div>
    </div>
  );
};

export default Appointment;
