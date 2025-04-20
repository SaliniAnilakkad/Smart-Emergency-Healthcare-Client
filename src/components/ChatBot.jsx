import { useState, useEffect, useRef } from "react";
import { firestore as db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [awaitingBookingConfirmation, setAwaitingBookingConfirmation] = useState(null);
  const [awaitingBookingDetails, setAwaitingBookingDetails] = useState(false);
  const [dialog, setDialog] = useState(null);
  const chatRef = useRef(null);
  const dialogRef = useRef(null);
  const messageIdCounter = useRef(0);

  const availableDepartments = [
    "Cardiology",
    "General Medicine",
    "Dermatology",
    "Internal Medicine",
    "Ophthalmology",
    "Gynecology",
    "Nephrology",
    "Pediatric Care",
  ];

  useEffect(() => {
    if (isOpen && conversation.length === 0) {
      addMessage({
        text: "Hi! I'm Max, your medical assistant. Please describe any symptoms you're experiencing or ask about booking an appointment.",
        sendby: "bot",
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        chatRef.current &&
        !chatRef.current.contains(e.target) &&
        (!dialogRef.current || !dialogRef.current.contains(e.target))
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth state changed:", currentUser ? { uid: currentUser.uid, email: currentUser.email } : "No user");
      if (currentUser) {
        try {
          const patientRef = doc(db, "patients", currentUser.uid);
          const patientSnap = await getDoc(patientRef);
          const patientData = patientSnap.exists() ? patientSnap.data() : null;
          const role = patientData?.role || null;
          if (!["patient", "admin", "superadmin"].includes(role)) {
            console.warn("Invalid or missing role for user:", currentUser.uid, role);
            setUser(null);
            setUserRole(null);
            await signOut(auth); // Log out if role is invalid
            return;
          }
          setUser(currentUser);
          setUserRole(role);
          console.log("User set:", { uid: currentUser.uid, role });
        } catch (error) {
          console.error("Error fetching patient data:", error);
          setUser(null);
          setUserRole(null);
          await signOut(auth); // Log out on error
        }
      } else {
        setUser(null);
        setUserRole(null);
        console.log("User cleared: No authenticated user");
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleChat = () => setIsOpen(!isOpen);

  const addMessage = (message) => {
    setConversation((prev) => [...prev, { ...message, id: messageIdCounter.current++ }]);
  };

  const symptomToDepartmentMapping = {
    eye: "Ophthalmology",
    eyes: "Ophthalmology",
    vision: "Ophthalmology",
    watering: "Ophthalmology",
    baby: "Pediatric Care",
    infant: "Pediatric Care",
    child: "Pediatric Care",
    heart: "Cardiology",
    chest: "Cardiology",
    skin: "Dermatology",
    rash: "Dermatology",
    kidney: "Nephrology",
    pregnancy: "Gynecology",
    menstrual: "Gynecology",
  };

  const getIntentAndResponse = async (input, doctorList = [], retries = 3, delay = 1000) => {
    const doctorSpecialties = doctorList.map((d) => `${d.name} (${d.specialty})`).join(", ");
    const prompt = `You are a medical chatbot. The user says: "${input}". Analyze the input and respond with a JSON object containing:
    - intent: One of "symptoms", "booking", "cancellation", "casual", "off_topic"
    - department: Suggest the most appropriate medical department from: ${availableDepartments.join(", ")}
    - doctor: Suggest the most appropriate doctor's name from: ${doctorSpecialties || "None available"}
    - isVague: Boolean, true if the input is vague or lacks specific symptoms/department (e.g., "I need to book")
    - responseType: One of "off_topic", "casual", "remedy", "booking", "cancellation"
    - response: A friendly, empathetic response tailored to the user's query. For "off_topic", redirect to medical topics. For "casual", reply conversationally and prompt for symptoms. For "remedy", provide a short, safe, non-lethal home remedy for non-critical symptoms (correct typos, e.g., "head cahe" to "headache"). For "booking", if isVague is true, ask for department or symptoms; otherwise, confirm the booking intent. For "cancellation", prompt to log in if not authenticated.
    Department mappings:
    - Eye-related (e.g., watering, sore eyes, vision): Ophthalmology
    - Infant/child-related (e.g., baby, infant, child): Pediatric Care
    - Heart/chest-related: Cardiology
    - Skin-related (e.g., rash, itching): Dermatology
    - Kidney-related: Nephrology
    - Pregnancy/menstrual-related: Gynecology
    - Unclear symptoms or vague booking requests: General Medicine
    Example for symptoms:
    {
      "intent": "symptoms",
      "department": "Ophthalmology",
      "doctor": "Dr. Smith (Ophthalmology)",
      "isVague": false,
      "responseType": "remedy",
      "response": "For watery and sore eyes, rinse with clean water and avoid bright lights."
    }
    Example for vague booking:
    {
      "intent": "booking",
      "department": "General Medicine",
      "doctor": null,
      "isVague": true,
      "responseType": "booking",
      "response": "Could you specify which department or describe any symptoms?"
    }
    Example for specific booking:
    {
      "intent": "booking",
      "department": "Cardiology",
      "doctor": "Dr. Jones (Cardiology)",
      "isVague": false,
      "responseType": "booking",
      "response": "Let's find you a suitable cardiologist for your appointment."
    }
    Example for cancellation:
    {
      "intent": "cancellation",
      "department": "General Medicine",
      "doctor": null,
      "isVague": false,
      "responseType": "cancellation",
      "response": "Please log in to cancel an appointment."
    }
    If input has typos, infer the intended symptom. Ensure JSON is valid and remedies are safe.`;

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(
          `https://text.pollinations.ai/${encodeURIComponent(prompt)}`
        );
        if (response.status === 429) {
          console.warn(`Pollinations.ai rate limit hit, retrying (${attempt}/${retries})...`);
          if (attempt < retries) {
            await new Promise((resolve) => setTimeout(resolve, delay * attempt));
            continue;
          }
          throw new Error("Pollinations.ai rate limit exceeded");
        }
        if (!response.ok) throw new Error(`Pollinations.ai API failed: ${response.status}`);

        const text = await response.text();
        console.log("Raw Pollinations.ai response:", text);
        let result;
        try {
          result = JSON.parse(text);
        } catch (parseError) {
          console.error("JSON parse error:", parseError, "Raw response:", text);
          throw parseError;
        }

        // Validate response
        if (!availableDepartments.includes(result.department)) {
          result.department = "General Medicine";
        }
        if (!result.intent || !["symptoms", "booking", "cancellation", "casual", "off_topic"].includes(result.intent)) {
          result.intent = "off_topic";
        }
        if (!result.response) {
          result.response = result.intent === "booking"
            ? result.isVague
              ? "Could you specify which department or describe any symptoms?"
              : "Let's find you a suitable doctor for your appointment."
            : result.intent === "cancellation"
            ? "Please log in to cancel an appointment."
            : result.intent === "symptoms"
            ? "I recommend consulting a doctor for your symptoms."
            : "I can only assist with medical topics. Please describe your symptoms.";
        }
        if (!result.responseType) {
          result.responseType = result.intent === "booking"
            ? "booking"
            : result.intent === "cancellation"
            ? "cancellation"
            : result.intent === "symptoms"
            ? "remedy"
            : "off_topic";
        }

        // Apply local department mapping as fallback
        const lowerInput = input.toLowerCase();
        for (const [keyword, department] of Object.entries(symptomToDepartmentMapping)) {
          if (lowerInput.includes(keyword)) {
            result.department = department;
            result.isVague = false;
            break;
          }
        }

        return result;
      } catch (error) {
        console.error(`Pollinations.ai attempt ${attempt} failed:`, error);
        if (attempt === retries) {
          const lowerInput = input.toLowerCase();
          let department = "General Medicine";
          for (const [keyword, dept] of Object.entries(symptomToDepartmentMapping)) {
            if (lowerInput.includes(keyword)) {
              department = dept;
              break;
            }
          }
          return {
            intent: "off_topic",
            department,
            doctor: null,
            isVague: false,
            responseType: "off_topic",
            response: "Sorry, I couldn't process your request. Please describe your symptoms.",
          };
        }
      }
    }
  };

  const isCritical = (symptoms) => {
    const criticalKeywords = [
      "chest pain",
      "difficulty breathing",
      "shortness of breath",
      "severe pain",
      "unconscious",
      "seizure",
      "extremely cold",
      "numbness",
      "confusion",
      "vomiting",
      "diarrhea",
      "rapid breathing",
      "grunting",
      "blue skin",
      "nostril flaring",
      "severe headache",
      "high fever",
    ];
    return criticalKeywords.some((keyword) => symptoms.toLowerCase().includes(keyword));
  };

  const isAffirmative = (input) => {
    const affirmativeWords = ["yes", "sure", "ok", "yeah", "yep", "okay"];
    return affirmativeWords.some((word) => input.toLowerCase().includes(word));
  };

  const fetchDoctors = async (department) => {
    try {
      const doctorsQuery = query(
        collection(db, "doctors"),
        where("specialty", "==", department),
        where("verified", "==", true)
      );
      const doctorsSnapshot = await getDocs(doctorsQuery);
      const doctors = doctorsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (doctors.length === 0) {
        const fallbackQuery = query(
          collection(db, "doctors"),
          where("specialty", "==", "General Medicine"),
          where("verified", "==", true)
        );
        const fallbackSnapshot = await getDocs(fallbackQuery);
        return fallbackSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      }

      return doctors;
    } catch (error) {
      console.error("Error fetching doctors:", error);
      return [];
    }
  };

  const suggestDoctor = async (department, input) => {
    try {
      const doctors = await fetchDoctors(department);
      if (doctors.length === 0) return null;

      const intentResult = await getIntentAndResponse(input, doctors);
      const suggestedDoctorName = intentResult.doctor?.split(" (")[0];
      let selectedDoctor = doctors.find((d) => d.name === suggestedDoctorName);

      if (!selectedDoctor) {
        selectedDoctor = doctors[0]; // Fallback to first available doctor
      }

      const availableSlots = (selectedDoctor.timeslots || []).filter((slot) => {
        const slotTime = slot.seconds
          ? slot.seconds * 1000
          : slot.toDate
          ? slot.toDate().getTime()
          : new Date(slot).getTime();
        return slotTime > Date.now();
      });

      if (availableSlots.length === 0) return null;

      const earliestSlot = availableSlots[0].seconds
        ? availableSlots[0].seconds * 1000
        : availableSlots[0].toDate
        ? availableSlots[0].toDate().getTime()
        : new Date(availableSlots[0]).getTime();

      return { ...selectedDoctor, earliestSlot, specialty: selectedDoctor.specialty || department };
    } catch (error) {
      console.error("Error suggesting doctor:", error);
      return null;
    }
  };

  const bookAppointment = async (doctor, slot) => {
    if (!user?.uid) {
      throw new Error("User must be logged in to book an appointment.");
    }
    try {
      const booking = {
        createdAt: Timestamp.fromDate(new Date()),
        doctorId: doctor.id,
        patientId: user.uid,
        status: "confirmed",
        timeslot: Timestamp.fromDate(new Date(slot)),
        cancelled: false,
        processed: false,
        reminded: false,
      };
      const bookingRef = await addDoc(collection(db, "bookings"), booking);

      if (doctor.timeslots && slot) {
        const doctorRef = doc(db, "doctors", doctor.id);
        const updatedTimeslots = doctor.timeslots.filter(
          (ts) => (ts.seconds ? ts.seconds * 1000 : ts.toDate().getTime()) !== slot
        );
        await updateDoc(doctorRef, { timeslots: updatedTimeslots });
      }

      return bookingRef.id;
    } catch (error) {
      console.error("Error booking appointment:", error);
      throw error;
    }
  };

  const cancelAppointment = async (bookingId) => {
    if (!user?.uid) {
      throw new Error("User must be logged in to cancel an appointment.");
    }
    try {
      const bookingRef = doc(db, "bookings", bookingId);
      const bookingSnap = await getDoc(bookingRef);
      if (!bookingSnap.exists()) throw new Error("Booking not found");

      const bookingData = bookingSnap.data();
      const doctorRef = doc(db, "doctors", bookingData.doctorId);
      const doctorSnap = await getDoc(doctorRef);
      if (!doctorSnap.exists()) throw new Error("Doctor not found");

      // Delete the booking document
      await deleteDoc(bookingRef);

      // Restore the doctor's timeslot
      const doctorData = doctorSnap.data();
      const updatedTimeslots = [
        ...(doctorData.timeslots || []),
        {
          seconds:
            bookingData.timeslot.seconds ||
            Math.floor(bookingData.timeslot.toDate().getTime() / 1000),
        },
      ].sort((a, b) => (a.seconds || a.toDate().getTime()) - (b.seconds || b.toDate().getTime()));
      await updateDoc(doctorRef, { timeslots: updatedTimeslots });

      return bookingId;
    } catch (error) {
      console.error("Error deleting appointment:", error);
      throw error;
    }
  };

  const fetchBookings = async () => {
    if (!user?.uid) {
      throw new Error("User must be logged in to fetch bookings.");
    }
    try {
      const bookingsQuery = query(
        collection(db, "bookings"),
        where("patientId", "==", user.uid),
        where("status", "==", "confirmed")
      );
      const bookingsSnapshot = await getDocs(bookingsQuery);
      const bookings = await Promise.all(
        bookingsSnapshot.docs.map(async (docSnapshot) => {
          const bookingData = docSnapshot.data();
          const doctorRef = doc(db, "doctors", bookingData.doctorId);
          const doctorSnap = await getDoc(doctorRef);
          const doctorData = doctorSnap.exists() ? doctorSnap.data() : {};
          return {
            id: docSnapshot.id,
            ...bookingData,
            doctorName: doctorData.name || "Unknown",
            doctorSpecialty: doctorData.specialty || "Unknown",
            timeslot: bookingData.timeslot.seconds
              ? { seconds: bookingData.timeslot.seconds }
              : bookingData.timeslot,
          };
        })
      );
      return bookings;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return [];
    }
  };

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const userMessage = { text: userInput, sendby: "user" };
    addMessage(userMessage);
    const input = userInput.trim();
    setUserInput("");

    try {
      console.log("handleSend - User state:", { uid: user?.uid, role: userRole });
      // Handle logged-in users with valid roles
      if (user?.uid && ["patient", "admin", "superadmin"].includes(userRole)) {
        // Handle booking confirmation
        if (awaitingBookingConfirmation) {
          if (isAffirmative(input)) {
            setDialog({
              type: "booking",
              data: {
                doctor: awaitingBookingConfirmation.doctor,
                slot: awaitingBookingConfirmation.slot,
              },
              state: "form",
            });
            setAwaitingBookingConfirmation(null);
            return;
          } else {
            addMessage({
              text: "Okay, the booking has been cancelled. How can I assist you with your health concerns?",
              sendby: "bot",
            });
            setAwaitingBookingConfirmation(null);
            return;
          }
        }

        // Handle booking details clarification
        if (awaitingBookingDetails) {
          const result = await getIntentAndResponse(input);
          if (result.intent === "symptoms" || (result.intent === "booking" && !result.isVague)) {
            setAwaitingBookingDetails(false);
            const department = result.department;
            const doctor = await suggestDoctor(department, input);

            if (result.intent === "symptoms") {
              const isCriticalCondition = isCritical(input);
              if (isCriticalCondition) {
                addMessage({
                  text: "Your symptoms sound very serious. Please seek immediate medical attention or visit an emergency room.",
                  sendby: "bot",
                });
                if (result.department === "Pediatric Care") {
                  addMessage({
                    text: "For your child's symptoms, a pediatric specialist is recommended. Here's a suggestion:",
                    sendby: "bot",
                  });
                }
              } else if (result.responseType === "remedy") {
                addMessage({
                  text: result.response,
                  sendby: "bot",
                });
              }
            } else {
              addMessage({
                text: result.response,
                sendby: "bot",
              });
            }

            if (doctor) {
              const date = new Date(doctor.earliestSlot);
              const doctorName = doctor.name.replace(/^Dr\.?\s*/i, "");
              addMessage({
                text: `I recommend Dr. ${doctorName} from ${doctor.specialty}\nAvailable: ${date.toLocaleString()}`,
                sendby: "bot",
              });
              addMessage({
                text: `Would you like to book this appointment with Dr. ${doctorName}?`,
                sendby: "bot",
              });
              setAwaitingBookingConfirmation({ doctor, slot: doctor.earliestSlot });
            } else {
              addMessage({
                text: "No suitable doctors are available at the moment. Please try again later or contact our support team.",
                sendby: "bot",
              });
            }
            return;
          } else {
            addMessage({
              text: "Please specify a department (e.g., Cardiology) or describe any symptoms to help me find the right doctor.",
              sendby: "bot",
            });
            return;
          }
        }

        const result = await getIntentAndResponse(input);

        if (result.intent === "cancellation") {
          const bookings = await fetchBookings();
          if (bookings.length === 0) {
            addMessage({
              text: "You don't have any confirmed appointments to cancel.",
              sendby: "bot",
            });
            return;
          }
          setDialog({
            type: "cancellation",
            data: { bookings },
            state: "form",
          });
          return;
        }

        if (result.intent === "symptoms") {
          const isCriticalCondition = isCritical(input);
          const doctor = await suggestDoctor(result.department, input);

          if (isCriticalCondition) {
            addMessage({
              text: "Your symptoms sound very serious. Please seek immediate medical attention or visit an emergency room.",
              sendby: "bot",
            });
            if (result.department === "Pediatric Care") {
              addMessage({
                text: "For your child's symptoms, a pediatric specialist is recommended. Here's a suggestion:",
                sendby: "bot",
              });
            }
          } else if (result.responseType === "remedy") {
            addMessage({
              text: result.response,
              sendby: "bot",
            });
          }

          if (doctor) {
            const date = new Date(doctor.earliestSlot);
            const doctorName = doctor.name.replace(/^Dr\.?\s*/i, "");
            addMessage({
              text: `I recommend Dr. ${doctorName} from ${doctor.specialty}\nAvailable: ${date.toLocaleString()}`,
              sendby: "bot",
            });
            addMessage({
              text: `Would you like to book this appointment with Dr. ${doctorName}?`,
              sendby: "bot",
            });
            setAwaitingBookingConfirmation({ doctor, slot: doctor.earliestSlot });
          } else {
            addMessage({
              text: "No suitable doctors are available at the moment. Please try again later or contact our support team.",
              sendby: "bot",
            });
          }
          return;
        }

        if (result.intent === "booking") {
          if (result.isVague) {
            addMessage({
              text: result.response,
              sendby: "bot",
            });
            setAwaitingBookingDetails(true);
            return;
          }

          addMessage({
            text: result.response,
            sendby: "bot",
          });
          const doctor = await suggestDoctor(result.department, input);

          if (doctor) {
            const date = new Date(doctor.earliestSlot);
            const doctorName = doctor.name.replace(/^Dr\.?\s*/i, "");
            addMessage({
              text: `I recommend Dr. ${doctorName} from ${doctor.specialty}\nAvailable: ${date.toLocaleString()}`,
              sendby: "bot",
            });
            addMessage({
              text: `Would you like to book this appointment with Dr. ${doctorName}?`,
              sendby: "bot",
            });
            setAwaitingBookingConfirmation({ doctor, slot: doctor.earliestSlot });
          } else {
            addMessage({
              text: "No suitable doctors are available at the moment. Please try again later or contact our support team.",
              sendby: "bot",
            });
          }
          return;
        }

        addMessage({
          text: result.response || "I'm here to help with your health concerns. Please describe any symptoms or ask about appointments.",
          sendby: "bot",
        });
        return;
      }

      // Handle non-logged-in users
      console.log("handleSend - Non-logged-in user detected");
      const result = await getIntentAndResponse(input);

      if (result.intent === "symptoms") {
        const isCriticalCondition = isCritical(input);
        if (isCriticalCondition) {
          addMessage({
            text: "Your symptoms sound very serious. Please seek immediate medical attention or visit an emergency room.",
            sendby: "bot",
          });
          if (result.department === "Pediatric Care") {
            addMessage({
              text: "For your child's symptoms, a pediatric specialist is recommended.",
              sendby: "bot",
            });
          }
        } else if (result.responseType === "remedy") {
          addMessage({
            text: result.response,
            sendby: "bot",
          });
        }
        addMessage({
          text: "Please log in to book an appointment with a doctor.",
          sendby: "bot",
        });
        return;
      }

      if (result.intent === "booking") {
        addMessage({
          text: "Please log in to book an appointment.",
          sendby: "bot",
        });
        return;
      }

      if (result.intent === "cancellation") {
        addMessage({
          text: "Please log in to cancel an appointment.",
          sendby: "bot",
        });
        return;
      }

      addMessage({
        text: result.response || "Please describe any symptoms you're experiencing or ask about medical concerns.",
        sendby: "bot",
      });
    } catch (error) {
      console.error("Error handling input:", error);
      addMessage({
        text: "Sorry, something went wrong. Please try again or contact support.",
        sendby: "bot",
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const Dialog = ({ type, data, state, onClose }) => {
    if (!user?.uid) {
      console.warn("Dialog attempted to render for non-logged-in user");
      return null;
    }
    return (
      <div
        ref={dialogRef}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]"
      >
        {type === "booking" && (
          <>
            {state === "form" && (
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Book Appointment</h2>
                <p>
                  Doctor: {data.doctor.name.replace(/^Dr\.?\s*/i, "")} ({data.doctor.specialty})
                </p>
                <p>
                  Time: {new Date(data.slot).toLocaleString()}
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={async () => {
                      try {
                        const bookingId = await bookAppointment(data.doctor, data.slot);
                        setDialog({
                          type: "booking",
                          data: { doctor: data.doctor, slot: data.slot, bookingId },
                          state: "confirmation",
                        });
                      } catch (error) {
                        addMessage({
                          text: "Failed to book appointment. Please try again.",
                          sendby: "bot",
                        });
                        onClose();
                      }
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
                  >
                    Book
                  </button>
                  <button
                    onClick={() => {
                      addMessage({
                        text: "Booking cancelled.",
                        sendby: "bot",
                      });
                      onClose();
                    }}
                    className="bg-gray-300 text-black px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            {state === "confirmation" && (
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Appointment Booked</h2>
                <p>
                  Doctor: {data.doctor.name.replace(/^Dr\.?\s*/i, "")} ({data.doctor.specialty})
                </p>
                <p>
                  Time: {new Date(data.slot).toLocaleString()}
                </p>
                <p>
                  Booking ID: {data.bookingId}
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={onClose}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {type === "cancellation" && (
          <>
            {state === "form" && (
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Cancel Appointment</h2>
                {data.bookings.length === 0 ? (
                  <p>No confirmed appointments found.</p>
                ) : (
                  data.bookings.map((booking) => (
                    <div key={booking.id} className="mb-4 p-2 border rounded">
                      <p>Booking ID: {booking.id}</p>
                      <p>
                        Doctor: {booking.doctorName.replace(/^Dr\.?\s*/i, "")} ({booking.doctorSpecialty})
                      </p>
                      <p>
                        Time: {new Date(
                          booking.timeslot.seconds
                            ? booking.timeslot.seconds * 1000
                            : booking.timeslot.toDate()
                        ).toLocaleString()}
                      </p>
                      <button
                        onClick={async () => {
                          try {
                            const bookingId = await cancelAppointment(booking.id);
                            setDialog({
                              type: "cancellation",
                              data: {
                                cancelledBooking: {
                                  id: bookingId,
                                  doctorName: booking.doctorName,
                                  doctorSpecialty: booking.doctorSpecialty,
                                  timeslot: booking.timeslot,
                                },
                              },
                              state: "confirmation",
                            });
                          } catch (error) {
                            addMessage({
                              text: "Failed to delete appointment. Please try again.",
                              sendby: "bot",
                            });
                            onClose();
                          }
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded mt-2"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => {
                      addMessage({
                        text: "Cancellation aborted.",
                        sendby: "bot",
                      });
                      onClose();
                    }}
                    className="bg-gray-300 text-black px-4 py-2 rounded"
                  >
                    Cancel Operation
                  </button>
                </div>
              </div>
            )}
            {state === "confirmation" && (
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Appointment Deleted</h2>
                <p>Booking ID: {data.cancelledBooking.id}</p>
                <p>
                  Doctor: {data.cancelledBooking.doctorName.replace(/^Dr\.?\s*/i, "")} ({data.cancelledBooking.doctorSpecialty})
                </p>
                <p>
                  Time: {new Date(
                    data.cancelledBooking.timeslot.seconds
                      ? data.cancelledBooking.timeslot.seconds * 1000
                      : data.cancelledBooking.timeslot.toDate()
                  ).toLocaleString()}
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={onClose}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div>
      <div
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer z-[50]"
      >
        💬
      </div>

      {isOpen && (
        <div
          ref={chatRef}
          className="fixed bottom-16 right-6 w-80 bg-white shadow-lg rounded-lg overflow-hidden z-[50]"
        >
          <div className="p-3 bg-blue-600 text-white font-bold flex justify-between items-center">
            Max - Healthcare Assistant
            <button onClick={() => setIsOpen(false)} className="text-white">
              X
            </button>
          </div>
          <div className="p-3 h-60 overflow-y-auto border-b">
            {conversation.map((msg) => (
              <div
                key={msg.id}
                className={`mb-2 p-2 rounded relative ${
                  msg.sendby === "user" ? "bg-gray-300" : "bg-green-200"
                }`}
                style={{ whiteSpace: "pre-wrap" }}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex p-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 p-2 border rounded"
              placeholder="Ask Max..."
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-blue-600 text-white p-2 rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {dialog && user?.uid && (
        <Dialog
          type={dialog.type}
          data={dialog.data}
          state={dialog.state}
          onClose={() => setDialog(null)}
        />
      )}
    </div>
  );
}