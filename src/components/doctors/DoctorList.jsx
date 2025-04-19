

import { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import DoctorCard from "./DoctorCard";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const doctorsPerPage = 3;

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsRef = collection(firestore, "doctors");
        const querySnapshot = await getDocs(doctorsRef);
        const doctorsData = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((doctor) => doctor.verified);

        setDoctors(doctorsData);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleNext = () => {
    if (currentIndex + doctorsPerPage < doctors.length) {
      setCurrentIndex(currentIndex + doctorsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - doctorsPerPage >= 0) {
      setCurrentIndex(currentIndex - doctorsPerPage);
    }
  };

  const visibleDoctors = doctors.slice(currentIndex, currentIndex + doctorsPerPage);

  return (
    <div className="relative w-full">
      {/* Arrows */}
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-primary border shadow-md rounded-full p-3 text-3xl hover:bg-gray-200 transition disabled:opacity-30 z-10"
      >
        &#8592;
      </button>

      <button
        onClick={handleNext}
        disabled={currentIndex + doctorsPerPage >= doctors.length}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary border shadow-md rounded-full p-3 text-3xl hover:bg-gray-200 transition disabled:opacity-30 z-10"
      >
        &#8594;
      </button>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-5 px-8">
        {visibleDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
