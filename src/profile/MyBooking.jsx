

import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

const MyBooking = () => {
  const [expiredBookings, setExpiredBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState(null);
  const userId = localStorage.getItem("userid");

  const getAllBookings = async () => {
    if (!userId) {
      console.log("No user logged in.");
      setLoading(false);
      return;
    }

    try {
      const bookingsCollection = collection(firestore, "bookings");
      const q = query(
        bookingsCollection,
        where("patientId", "==", userId),
        orderBy("timeslot", "desc")
      );

      const querySnapshot = await getDocs(q);
      const now = new Date();

      let expired = [];
      let upcoming = [];

      let userBookings = await Promise.all(
        querySnapshot.docs.map(async (docSnap) => {
          const bookingData = docSnap.data();

          if (bookingData.timeslot?.toDate) {
            const fullDate = bookingData.timeslot.toDate();
            bookingData.rawDate = fullDate; // used for comparison & sorting
            bookingData.appointmentDate = fullDate.toLocaleDateString();
            bookingData.timeslot = fullDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          }

          // Fetch doctor data
          if (bookingData.doctorId) {
            const doctorRef = doc(firestore, "doctors", bookingData.doctorId);
            const doctorSnap = await getDoc(doctorRef);
            if (doctorSnap.exists()) {
              bookingData.doctor = doctorSnap.data();
            }
          }

          return {
            id: docSnap.id,
            ...bookingData
          };
        })
      );

      // Separate expired and upcoming
      userBookings.forEach((booking) => {
        if (booking.rawDate < now) {
          expired.push(booking);
        } else {
          upcoming.push(booking);
        }
      });

      // Sort upcoming bookings by nearest time first
      upcoming.sort((a, b) => a.rawDate - b.rawDate);

      setExpiredBookings(expired);
      setUpcomingBookings(upcoming);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  const cancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    try {
      await deleteDoc(doc(firestore, "bookings", bookingId));
      setUpcomingBookings(upcomingBookings.filter(booking => booking.id !== bookingId));
      setPopupMessage("Booking cancelled successfully!");
      setTimeout(() => setPopupMessage(null), 3000);
    } catch (error) {
      console.error("Error cancelling booking:", error);
      setPopupMessage("Error cancelling booking. Please try again.");
    }
  };

  const BookingCard = ({ item, isActive }) => (
    <div className='border-4 border-green-600 text-center p-4 m-4 rounded-lg shadow-md'>
      <h2 className="text-lg font-bold text-blue-700">{item.doctor?.name || "Unknown Doctor"}</h2>
      <p className="text-gray-700"><strong>Appointment Date:</strong> {item.appointmentDate || "Not Provided"}</p>
      <p className="text-gray-700"><strong>Time Slot:</strong> {item.timeslot || "Not Available"}</p>
      <p className="text-gray-700"><strong>Confirmation:</strong> {item.confirmation || "Pending"}</p>
      <p className="text-gray-700"><strong>Arrival:</strong> {item.arrival || "N/A"}</p>
      {isActive && (
        <button
          className="px-2 py-1 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300 mt-2"
          onClick={() => cancelBooking(item.id)}
        >
          Cancel Booking
        </button>
      )}
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className='text-red-600 text-center font-extrabold text-2xl mb-3'>My Bookings</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading bookings...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Expired Bookings */}
          <div className='bg-white shadow-lg rounded-lg'>
            <h2 className='text-xl font-bold text-center text-gray-800 mb-3 '>Previous Bookings</h2>
            {expiredBookings.length > 0 ? (
              expiredBookings.map((item, index) => (
                <BookingCard key={index} item={item} isActive={false} />
              ))
            ) : (
              <p className="text-center text-gray-600">No previous bookings found.</p>
            )}
          </div>

          {/* Right Column - Upcoming Bookings */}
          <div className='bg-white shadow-lg rounded-lg'>
            <h2 className='text-xl font-bold text-center text-gray-800 mb-3'>Upcoming Bookings</h2>
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((item, index) => (
                <BookingCard key={index} item={item} isActive={true} />
              ))
            ) : (
              <p className="text-center text-gray-600">No upcoming bookings found.</p>
            )}
          </div>
        </div>
      )}

      {/* Popup Notification */}
      {popupMessage && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-2xl px-5 py-4 rounded shadow-md z-50">
          {popupMessage}
        </div>
      )}
    </div>
  );
};

export default MyBooking;
