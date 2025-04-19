
import React, { useEffect, useState } from 'react';
import { firestore } from './../firebase'; // adjust if needed
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

const Contact = () => {
  const [adminContact, setAdminContact] = useState({ email: '', phone: '' });

  useEffect(() => {
    const fetchAdminContact = async () => {
      try {
        const q = query(
          collection(firestore, 'patients'),
          where('role', '==', 'admin'),
          limit(1)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const adminData = querySnapshot.docs[0].data();
          setAdminContact({
            email: adminData.email || 'Not Available',
            phone: adminData.phone || 'Not Available',
          });
        }
      } catch (error) {
        console.error('Error fetching admin contact:', error);
      }
    };

    fetchAdminContact();
  }, []);

  return (
    <section className="py-8 px-3">
      <div className="mx-auto max-w-screen-md bg-white shadow-md rounded-xl p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-blue-800">Contact Us</h2>
        <p className="text-center text-gray-600 mb-5 text-sm md:text-base">
          Got a technical issue? Want to send feedback about a feature? Let us know.
        </p>

        {/* Quick Enquiry */}
        <div className="bg-blue-50 p-3 rounded-lg shadow mb-6 text-center">
          <h3 className="text-lg font-semibold text-blue-700 mb-1">Quick Enquiry</h3>
          <p className="text-gray-700 text-sm"><strong>Email:</strong> {adminContact.email}</p>
          <p className="text-gray-700 text-sm"><strong>Phone:</strong> {adminContact.phone}</p>
        </div>

        {/* Contact Form */}
        <form className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            required
          />

          <textarea
            name="message"
            placeholder="Write your message"
            rows="4"
            className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            required
          ></textarea>

          <div className="text-center mt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition text-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
