// // import React, { useEffect, useState } from "react";
// // import io from "socket.io-client";

// // const AdmQrcode = () => {
// //   const [qr, setQr] = useState(null);
// //   const [status, setStatus] = useState("loading");

// //   useEffect(() => {
// //     const socket = io("http://localhost:5000", {
// //       withCredentials: true,
// //       reconnection: true,
// //       reconnectionAttempts: 5,
// //       reconnectionDelay: 1000,
// //     });

// //     socket.on("qr", (qrImageUrl) => {
// //       setQr(qrImageUrl); // Always set QR code
// //     });

// //     socket.on("status", (currentStatus) => {
// //       setStatus(currentStatus);
// //     });

// //     // Cleanup on unmount
// //     return () => {
// //       socket.disconnect();
// //     };
// //   }, []);

// //   const handleLogout = () => {
// //     alert("Please log out from WhatsApp on your phone to relink.");
// //   };

// //   return (
// //     <div className="p-10 flex flex-col items-center justify-center gap-4">
// //       <div className="text-2xl font-bold">Hospital WhatsApp QR</div>
// //       <div className="text-md">
// //         Status: <span className="font-semibold">{status}</span>
// //       </div>
// //       <p className="text-gray-500">Scan the QR code to link or relink WhatsApp.</p>
// //       {qr && (
// //         <div className="flex justify-center">
// //           <img src={qr} alt="Hospital WhatsApp QR Code" className="rounded shadow-md" />
// //         </div>
// //       )}
// //       {status === "Authenticated" && (
// //         <p className="text-green-600 font-bold">WhatsApp is connected ✅</p>
// //       )}
// //       {status === "Not authenticated" && (
// //         <p className="text-red-600 font-bold">WhatsApp is not connected. Please scan the QR code to link.</p>
// //       )}
// //       <button
// //         onClick={handleLogout}
// //         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
// //       >
// //         WhatsApp Logout
// //       </button>
// //     </div>
// //   );
// // };

// // export default AdmQrcode;







// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// const AdmQrcode = () => {
//   const [qr, setQr] = useState(null);
//   const [status, setStatus] = useState("loading");

//   useEffect(() => {
//     const socket = io("http://localhost:5000", {
//       withCredentials: true,
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//     });

//     socket.on("qr", (qrImageUrl) => {
//       setQr(qrImageUrl);
//     });

//     socket.on("status", (currentStatus) => {
//       setStatus(currentStatus);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
//       <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-lg w-full mx-auto">
//         <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Hospital WhatsApp Connection</h1>
//         <div className="flex items-center justify-center mb-4">
//           <div className="text-lg font-medium">
//             Status:{" "}
//             {status.includes("Authenticated") ? (
//               <span className="text-green-600 flex items-center">
//                 <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.707-7.293a1 1 0 011.414 0L10 12.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clipRule="evenodd" />
//                 </svg>
//                 Connected
//               </span>
//             ) : (
//               <span className="text-red-600 flex items-center">
//                 <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 10a1 1 0 11-2 0 1 1 0 012 0zm-1-7a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                 </svg>
//                 Not Connected
//               </span>
//             )}
//           </div>
//         </div>
//         {status.includes("Not authenticated") && (
//           <>
//             <p className="text-gray-600 text-center mb-4">Scan the QR code to connect WhatsApp.</p>
//             {qr && (
//               <div className="flex justify-center mb-4">
//                 <img src={qr} alt="Hospital WhatsApp QR Code" className="rounded-lg shadow-md w-48 h-48" />
//               </div>
//             )}
//             <p className="text-red-600 text-center font-medium">WhatsApp is not connected. Please scan the QR code.</p>
//           </>
//         )}
//         {status.includes("Authenticated") && (
//           <p className="text-green-600 text-center font-medium">WhatsApp is connected and ready to send messages.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdmQrcode;








// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// const AdmQrcode = () => {
//   const [qr, setQr] = useState(null);
//   const [status, setStatus] = useState("loading");

//   useEffect(() => {
//     const socket = io("http://localhost:5000", {
//       withCredentials: true,
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//     });

//     socket.on("qr", (qrImageUrl) => {
//       setQr(qrImageUrl);
//     });

//     socket.on("status", (currentStatus) => {
//       setStatus(currentStatus);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
//       <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-lg w-full mx-auto">
//         <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Hospital WhatsApp Connection</h1>
//         <div className="flex items-center justify-center mb-4">
//           <div className="text-lg font-medium flex items-center space-x-2">
//             <span>Status:</span>
//             {status.includes("Authenticated") ? (
//               <span className="text-green-600 flex items-center">
//                 <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.707-7.293a1 1 0 011.414 0L10 12.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clipRule="evenodd" />
//                 </svg>
//                 Connected
//               </span>
//             ) : (
//               <span className="text-red-600 flex items-center">
//                 <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 10a1 1 0 11-2 0 1 1 0 012 0zm-1-7a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                 </svg>
//                 Not Connected
//               </span>
//             )}
//           </div>
//         </div>
//         {status.includes("Not authenticated") && (
//           <>
//             <p className="text-gray-600 text-center mb-4">Scan the QR code to connect WhatsApp.</p>
//             {qr && (
//               <div className="flex justify-center mb-4">
//                 <img src={qr} alt="Hospital WhatsApp QR Code" className="rounded-lg shadow-md w-48 h-48" />
//               </div>
//             )}
//             <p className="text-red-600 text-center font-medium">WhatsApp is not connected. Please scan the QR code.</p>
//           </>
//         )}
//         {status.includes("Authenticated") && (
//           <p className="text-green-600 text-center font-medium">WhatsApp is connected and ready to send messages.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdmQrcode;








// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// const AdmQrcode = () => {
//   const [qr, setQr] = useState(null);
//   const [status, setStatus] = useState("loading");

//   useEffect(() => {
//     const socket = io("http://localhost:5000", {
//       withCredentials: true,
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//     });

//     socket.on("qr", (qrImageUrl) => {
//       setQr(qrImageUrl);
//     });

//     socket.on("status", (currentStatus) => {
//       setStatus(currentStatus);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const handleResetWhatsApp = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/reset-whatsapp", {
//         method: "POST",
//         credentials: "include",
//       });
//       const data = await response.json();
//       console.log(data.message);
//       alert("WhatsApp session reset. Please wait for a new QR code and scan it with your phone.");
//     } catch (err) {
//       console.error("Error resetting WhatsApp:", err);
//       alert("Failed to reset WhatsApp session. Please contact support.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
//       <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-lg w-full mx-auto">
//         <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Hospital WhatsApp Connection</h1>
//         <div className="flex items-center justify-center mb-4">
//           <div className="text-lg font-medium flex items-center space-x-2">
//             <span>Status:</span>
//             {status.includes("Authenticated") ? (
//               <span className="text-green-600 flex items-center">
//                 <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.707-7.293a1 1 0 011.414 0L10 12.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clipRule="evenodd" />
//                 </svg>
//                 Connected
//               </span>
//             ) : (
//               <span className="text-red-600 flex items-center">
//                 <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 10a1 1 0 11-2 0 1 1 0 012 0zm-1-7a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                 </svg>
//                 Not Connected
//               </span>
//             )}
//           </div>
//         </div>
//         {status.includes("Not authenticated") && (
//           <>
//             <p className="text-gray-600 text-center mb-4">Scan the QR code to connect WhatsApp.</p>
//             {qr && (
//               <div className="flex justify-center mb-4">
//                 <img src={qr} alt="Hospital WhatsApp QR Code" className="rounded-lg shadow-md w-48 h-48" />
//               </div>
//             )}
//             <p className="text-red-600 text-center font-medium">WhatsApp is not connected. Please scan the QR code.</p>
//           </>
//         )}
//         {status.includes("Authenticated") && (
//           <p className="text-green-600 text-center font-medium">WhatsApp is connected and ready to send messages.</p>
//         )}
//         <button
//           onClick={handleResetWhatsApp}
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
//           title="Click this if WhatsApp won't connect after scanning the QR code."
//         >
//           Reset WhatsApp Session
//         </button>
//         <p className="text-sm text-gray-500 mt-2 text-center">
//           <strong>When to use Reset:</strong> Click this button only if WhatsApp stays disconnected after scanning the QR code or if you see errors. It will create a new QR code for you to scan with your phone. Wait a moment after clicking.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AdmQrcode;



// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// const AdmQrcode = () => {
//   const [qr, setQr] = useState(null);
//   const [status, setStatus] = useState("loading");
//   const [isResetting, setIsResetting] = useState(false);

//   useEffect(() => {
//     const socket = io("http://localhost:5000", {
//       withCredentials: true,
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//     });

//     socket.on("qr", (qrImageUrl) => {
//       setQr(qrImageUrl);
//     });

//     socket.on("status", (currentStatus) => {
//       setStatus(currentStatus);
//       setIsResetting(false); // Reset loading state when status updates
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const handleResetWhatsApp = async () => {
//     if (window.confirm("Are you sure? This will reset the WhatsApp session and require a new QR scan. Use only if connection fails after multiple attempts!")) {
//       setIsResetting(true);
//       try {
//         const response = await fetch("http://localhost:5000/api/reset-whatsapp", {
//           method: "POST",
//           credentials: "include",
//         });
//         const data = await response.json();
//         console.log(data.message);
//         alert("WhatsApp reset! Wait 3-5 minutes, then scan the new QR code with your phone.");
//       } catch (err) {
//         console.error("Error resetting WhatsApp:", err);
//         alert("Reset failed. Try again or contact support.");
//         setIsResetting(false);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
//       <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-lg w-full mx-auto">
//         <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Hospital WhatsApp Connection</h1>
//         <div className="flex items-center justify-center mb-4">
//           <div className="text-lg font-medium flex items-center space-x-2">
//             <span>Status:</span>
//             {status.includes("Authenticated") ? (
//               <span className="text-green-600 flex items-center">
//                 <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.707-7.293a1 1 0 011.414 0L10 12.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clipRule="evenodd" />
//                 </svg>
//                 Connected
//               </span>
//             ) : (
//               <span className="text-red-600 flex items-center">
//                 <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 10a1 1 0 11-2 0 1 1 0 012 0zm-1-7a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                 </svg>
//                 Not Connected
//               </span>
//             )}
//           </div>
//         </div>
//         {status.includes("Not authenticated") && (
//           <>
//             <p className="text-gray-600 text-center mb-4">Scan the QR code to connect WhatsApp.</p>
//             {qr && (
//               <div className="flex justify-center mb-4">
//                 <img src={qr} alt="Hospital WhatsApp QR Code" className="rounded-lg shadow-md w-48 h-48" />
//               </div>
//             )}
//             <p className="text-red-600 text-center font-medium">WhatsApp is not connected. Please scan the QR code to connect WhatsApp.</p>
//           </>
//         )}
//         {status.includes("Authenticated") && (
//           <p className="text-green-600 text-center font-medium">WhatsApp is connected, and the session is active..</p>
//         )}
//         <button
//           onClick={handleResetWhatsApp}
//           className={`mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full ${isResetting ? "opacity-50 cursor-not-allowed" : ""}`}
//           disabled={isResetting}
//           title="Danger: Reset only if WhatsApp won’t connect after many tries."
//         >
//           {isResetting ? "Resetting..." : "Reset WhatsApp Session"}
//         </button>
//         <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-300">
//           <p className="text-sm text-gray-700 mb-2">
//             <strong className="text-gray-900">When to Reset WhatsApp</strong>
//           </p>
//           <p className="text-sm text-gray-700 mb-2">
//             The reset button is for emergencies only! Use in extreme situations.
//           </p>
//           <ul className="text-sm text-gray-700 list-disc list-inside mb-2">
//             <li>
//               <strong>If Whatsapp is connected & Working:</strong> Do NOT click the button. It disconnects WhatsApp, requiring a new QR scan.
//             </li>
//             <li>
//               <strong>If Whatsapp is connected but noticed few errors:</strong> Confirm that errors persists, click the reset button, log out manually on phone connected, wait 3-5 minutes till the new QR appears, scan new QR.Wait a few minutes. Retry or contact support if needed.
//             </li>
//             <li>
//               <strong>If Whatsapp not Connected:</strong> Scan QR first. If it fails multiple times, click the reset button, wait 3-5 minutes, scan new QR. Retry if needed.
//             </li>
//             <li>
//               <strong>If it takes Too Long to display QR:</strong> If no QR in 5 minutes or no connect in 5-10 minutes, refresh page, wait 3-5 minutes, check again. Contact support if still failed. Avoid multiple clicks.
//             </li>
//           </ul>
//           <p className="text-sm text-gray-700 mt-2">
//             <strong className="text-gray-900">Notes:</strong> No auto-logout; manually log out the whatsapp session in the phone. New QR links to a new session. Wait 3-5 minutes. Use as last resort.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdmQrcode;




// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// const AdmQrcode = () => {
//   const [qr, setQr] = useState(null);
//   const [status, setStatus] = useState("loading");
//   const [isResetting, setIsResetting] = useState(false);

//   useEffect(() => {
//     const socket = io("http://localhost:5000", {
//       withCredentials: true,
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//     });

//     socket.on("qr", (qrImageUrl) => {
//       setQr(qrImageUrl);
//     });

//     socket.on("status", (currentStatus) => {
//       setStatus(currentStatus);
//       setIsResetting(false); // Reset loading state when status updates
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const handleResetWhatsApp = async () => {
//     if (window.confirm("Are you sure? This will reset the WhatsApp session and require a new QR scan. Use only if connection fails after multiple attempts!")) {
//       setIsResetting(true);
//       try {
//         const response = await fetch("http://localhost:5000/api/reset-whatsapp", {
//           method: "POST",
//           credentials: "include",
//         });
//         const data = await response.json();
//         if (!response.ok) throw new Error(data.error || "Failed to reset session");
//         alert("WhatsApp reset! Wait 3-5 minutes, then scan the new QR code with your phone.");
//       } catch (err) {
//         console.error("Error resetting WhatsApp:", err);
//         alert(err.message || "Failed to fetch. Try again or contact support.");
//         setIsResetting(false);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
//       <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-lg w-full mx-auto">
//         <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Hospital WhatsApp Connection</h1>
//         <div className="flex items-center justify-center mb-4">
//           <div className="text-lg font-medium flex items-center space-x-2">
//             <span>Status:</span>
//             {status.includes("Authenticated") ? (
//               <span className="text-green-600 flex items-center">
//                 <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.707-7.293a1 1 0 011.414 0L10 12.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clipRule="evenodd" />
//                 </svg>
//                 Connected
//               </span>
//             ) : status.includes("Error") ? (
//               <span className="text-red-600 flex items-center">
//                 <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 10a1 1 0 11-2 0 1 1 0 012 0zm-1-7a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                 </svg>
//                 {status.replace("Error: ", "")}
//               </span>
//             ) : (
//               <span className="text-red-600 flex items-center">
//                 <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 10a1 1 0 11-2 0 1 1 0 012 0zm-1-7a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                 </svg>
//                 Not Connected
//               </span>
//             )}
//           </div>
//         </div>
//         {status.includes("Not authenticated") && (
//           <>
//             <p className="text-gray-600 text-center mb-4">Scan the QR code to connect WhatsApp.</p>
//             {qr && (
//               <div className="flex justify-center mb-4">
//                 <img src={qr} alt="Hospital WhatsApp QR Code" className="rounded-lg shadow-md w-48 h-48" />
//               </div>
//             )}
//             <p className="text-red-600 text-center font-medium">WhatsApp is not connected. Please scan the QR code to connect.</p>
//           </>
//         )}
//         {status.includes("Authenticated") && (
//           <p className="text-green-600 text-center font-medium">WhatsApp is connected.</p>
//         )}
//         <button
//           onClick={handleResetWhatsApp}
//           className={`mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full ${isResetting ? "opacity-50 cursor-not-allowed" : ""}`}
//           disabled={isResetting}
//           title="Danger: Reset only if WhatsApp won’t connect after many tries."
//         >
//           {isResetting ? "Resetting..." : "Reset WhatsApp Session"}
//         </button>
//         <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-300">
//           <p className="text-sm text-gray-700 mb-2">
//             <strong className="text-gray-900">When to Reset WhatsApp</strong>
//           </p>
//           <p className="text-sm text-gray-700 mb-2">
//             The reset button is for emergencies only! Use in extreme situations.
//           </p>
//           <ul className="text-sm text-gray-700 list-disc list-inside mb-2">
//             <li>
//               <strong>If WhatsApp is connected and working:</strong> Do NOT click the button. It disconnects WhatsApp, requiring a new QR scan.
//             </li>
//             <li>
//               <strong>If WhatsApp is connected but you notice errors:</strong>
//               <ul className="list-disc list-inside ml-4 mt-1">
//                 <li>Confirm errors persist, then click the reset button and confirm pop-up.</li>
//                 <li>The button shows "Resetting..." and creates a new QR only after you log out manually from the linked phone number's whatsapp.</li>
//                 <li>Manually log out on your phone, wait 3-5 minutes, scan new QR.</li>
//                 <li>Retry or contact support if it fails.</li>
//               </ul>
//             </li>
//             <li>
//               <strong>If WhatsApp is not connected:</strong>
//               <ul className="list-disc list-inside ml-4 mt-1">
//                 <li>Scan QR first. If it fails multiple times, click the reset and confirm pop-up.</li>
//                 <li>Wait 3-5 minutes, then scan new QR. Retry if needed.</li>
//               </ul>
//             </li>
//             <li>
//               <strong>If it takes too long to display a QR:</strong>
//               <ul className="list-disc list-inside ml-4 mt-1">
//                 <li>If no QR in 5 minutes or no connect in 5-10 minutes, refresh page.</li>
//                 <li>Wait 3-5 minutes, check again. Contact support if failed. Avoid multiple clicks.</li>
//               </ul>
//             </li>
//           </ul>
//           <p className="text-sm text-gray-700 mt-2">
//             <strong className="text-gray-900">Notes:</strong> No auto-logout; manually log out if connected before resetting. New QR starts a new session (may log out old on same phone). Wait 3-5 minutes. Use as last resort.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdmQrcode;



import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const AdmQrcode = () => {
  const [qr, setQr] = useState(null);
  const [status, setStatus] = useState("loading");
  const [isResetting, setIsResetting] = useState(false);
  const [qrTimeout, setQrTimeout] = useState(false);

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    socket.on("connect", () => {
      console.log("Socket.IO connected");
    });

    socket.on("qr", (qrImageUrl) => {
      console.log("Received QR code");
      setQr(qrImageUrl);
      setQrTimeout(false);
    });

    socket.on("status", (currentStatus) => {
      console.log("Status updated:", currentStatus);
      setStatus(currentStatus);
      setIsResetting(false);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket.IO connection error:", err);
      setStatus("Error: Failed to connect to server");
    });

    socket.on("disconnect", () => {
      console.log("Socket.IO disconnected");
      setStatus("Disconnected from server, reconnecting...");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (status.includes("Not authenticated") && !qr) {
      const timer = setTimeout(() => {
        setQrTimeout(true);
      }, 30000); // 30 seconds
      return () => clearTimeout(timer);
    }
  }, [status, qr]);

  const handleResetWhatsApp = async () => {
    if (
      window.confirm(
        "Are you sure? This will reset the WhatsApp session and require a new QR scan. Use only if connection fails after multiple attempts!"
      )
    ) {
      setIsResetting(true);
      try {
        const response = await fetch("http://localhost:5000/api/reset-whatsapp", {
          method: "POST",
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to reset WhatsApp session");
        }
        setQr(null);
        setStatus("loading");
        setQrTimeout(false);
        alert(data.message || "WhatsApp session reset. Please wait 10-30 seconds for a new QR code, then scan it.");
      } catch (err) {
        console.error("Error resetting WhatsApp:", err);
        alert(`Failed to reset WhatsApp: ${err.message}. Please try again or contact support.`);
        setIsResetting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-lg w-full mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Hospital WhatsApp Connection</h1>
        <div className="flex items-center justify-center mb-4">
          <div className="text-lg font-medium flex items-center space-x-2">
            <span>Status:</span>
            {status.includes("Authenticated") ? (
              <span className="text-green-600 flex items-center">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.707-7.293a1 1 0 011.414 0L10 12.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Connected
              </span>
            ) : status.includes("Error") ? (
              <span className="text-red-600 flex items-center">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 10a1 1 0 11-2 0 1 1 0 012 0zm-1-7a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {status.replace("Error: ", "")}
              </span>
            ) : (
              <span className="text-red-600 flex items-center">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 10a1 1 0 11-2 0 1 1 0 012 0zm-1-7a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Not Connected
              </span>
            )}
          </div>
        </div>
        {status.includes("Not authenticated") && (
          <>
            <p className="text-gray-600 text-center mb-4">Scan the QR code to connect WhatsApp.</p>
            {qr ? (
              <div className="flex justify-center mb-4">
                <img src={qr} alt="Hospital WhatsApp QR Code" className="rounded-lg shadow-md w-48 h-48" />
              </div>
            ) : qrTimeout ? (
              <p className="text-red-600 text-center font-medium">
                No QR code received. Please try resetting again or contact support.
              </p>
            ) : (
              <p className="text-gray-600 text-center font-medium">Waiting for QR code...</p>
            )}
            <p className="text-red-600 text-center font-medium">
              WhatsApp is not connected. Please scan the QR code when it appears.
            </p>
          </>
        )}
        {status.includes("Authenticated") && (
          <p className="text-green-600 text-center font-medium">WhatsApp is connected.</p>
        )}
        <button
          onClick={handleResetWhatsApp}
          className={`mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full ${
            isResetting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isResetting}
          title="Danger: Reset only if WhatsApp won’t connect after many tries."
        >
          {isResetting ? "Resetting..." : "Reset WhatsApp Session"}
        </button>
        <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-300">
          <p className="text-sm text-gray-700 mb-2">
            <strong className="text-gray-900">When to Reset WhatsApp</strong>
          </p>
          <p className="text-sm text-gray-700 mb-2">
            The reset button is for emergencies only! Use in extreme situations.
          </p>
          <ul className="text-sm text-gray-700 list-disc list-inside mb-2">
            <li>
              <strong>If WhatsApp is connected and working:</strong> Do NOT click the button. It disconnects WhatsApp,
              requiring a new QR scan.
            </li>
            <li>
              <strong>If WhatsApp is connected but you notice errors:</strong>
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>Confirm errors persist, then click the reset button and confirm pop-up.</li>
                <li>
                  The button shows "Resetting..." and creates a new QR only after you log out manually from the linked
                  phone number's WhatsApp.
                </li>
                <li>Manually log out on your phone, wait 10-30 seconds, scan new QR.</li>
                <li>Retry or contact support if it fails.</li>
              </ul>
            </li>
            <li>
              <strong>If WhatsApp is not connected:</strong>
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>Scan QR first. If it fails multiple times, click the reset and confirm pop-up.</li>
                <li>Wait 10-30 seconds, then scan new QR. Retry if needed.</li>
              </ul>
            </li>
            <li>
              <strong>If it takes too long to display a QR:</strong>
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>If no QR in 30 seconds, refresh page.</li>
                <li>Wait 10-30 seconds, check again. Contact support if failed. Avoid multiple clicks.</li>
              </ul>
            </li>
          </ul>
          <p className="text-sm text-gray-700 mt-2">
            <strong className="text-gray-900">Notes:</strong> No auto-logout; manually log out if connected before
            resetting. New QR starts a new session (may log out old on same phone). Wait 10-30 seconds. Use as last resort.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdmQrcode;