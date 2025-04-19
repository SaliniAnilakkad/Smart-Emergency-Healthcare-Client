// import React, { useEffect, useState } from "react";
// import userimg from "../assets/images/avatar-icon.png";
// import { useNavigate } from "react-router-dom";
// import { firestore } from "../firebase";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   doc,
//   updateDoc,
// } from "firebase/firestore";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const MyAccount = () => {
//   const [user, setUser] = useState(null);
//   const [profileImg, setProfileImg] = useState(userimg);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [updatedUser, setUpdatedUser] = useState({});
//   const navigate = useNavigate();
//   const userEmail = localStorage.getItem("email");

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       if (userEmail) {
//         try {
//           const q = query(
//             collection(firestore, "patients"),
//             where("email", "==", userEmail)
//           );
//           const querySnapshot = await getDocs(q);

//           if (!querySnapshot.empty) {
//             const doc = querySnapshot.docs[0];
//             const userData = { ...doc.data(), documentId: doc.id };
//             setUser(userData);
//             setUpdatedUser(userData);
//             setProfileImg(userData.photo || userimg);
//           }
//         } catch (error) {
//           console.error("Error fetching user profile:", error);
//         }
//       }
//     };

//     fetchUserProfile();
//   }, [userEmail]);

//   const handleEdit = () => {
//     setIsModalOpen(true);
//   };

//   const handleChange = (e) => {
//     setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     try {
//       const userRef = doc(firestore, "patients", user.documentId);
//       await updateDoc(userRef, updatedUser);
//       setUser(updatedUser);
//       setIsModalOpen(false);
//       toast.success("Profile updated successfully!");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       toast.error("Failed to update profile.");
//     }
//   };

//   return (
//     <section className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg mt-6">
//       <div className="relative">
//         <button
//           onClick={handleEdit}
//           className="absolute top-0 right-0 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
//         >
//           Edit
//         </button>
//       </div>

//       <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mt-4">
//         <div className="flex-shrink-0">
//           <figure className="rounded-full w-28 h-28 border-4 border-gray-300 p-1 mx-auto md:mx-0">
//             <img
//               src={profileImg}
//               alt="User Avatar"
//               className="rounded-full w-full h-full object-cover"
//             />
//           </figure>
//         </div>

//         <div className="flex-1">
//           <div className="text-center md:text-left">
//             <h3 className="text-2xl font-semibold text-gray-800">
//               {user?.name || "N/A"}
//             </h3>
//             <p className="text-gray-500">{user?.email || "N/A"}</p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm">
//             <div className="bg-gray-100 p-3 rounded">
//               <strong>Age:</strong> {user?.age || "N/A"}
//             </div>
//             <div className="bg-gray-100 p-3 rounded">
//               <strong>Phone:</strong> {user?.phone || "N/A"}
//             </div>
//             <div className="bg-gray-100 p-3 rounded">
//               <strong>Gender:</strong> {user?.gender || "N/A"}
//             </div>
//             <div className="bg-gray-100 p-3 rounded">
//               <strong>Allergy:</strong> {user?.allergy || "N/A"}
//             </div>
//             <div className="bg-gray-100 p-3 rounded col-span-1 sm:col-span-2">
//               <strong>Patient ID:</strong> {user?.documentId || "N/A"}
//             </div>
//           </div>
//         </div>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
//           <div className="bg-white w-[90%] max-w-md p-6 rounded shadow-lg">
//             <h2 className="text-xl font-semibold mb-4 text-center">Edit Profile</h2>
//             <div className="space-y-3">
//               <input
//                 type="text"
//                 name="name"
//                 value={updatedUser.name || ""}
//                 onChange={handleChange}
//                 placeholder="Name"
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="text"
//                 name="age"
//                 value={updatedUser.age || ""}
//                 onChange={handleChange}
//                 placeholder="Age"
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="text"
//                 name="phone"
//                 value={updatedUser.phone || ""}
//                 onChange={handleChange}
//                 placeholder="Phone"
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="text"
//                 name="gender"
//                 value={updatedUser.gender || ""}
//                 onChange={handleChange}
//                 placeholder="Gender"
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="text"
//                 name="allergy"
//                 value={updatedUser.allergy || ""}
//                 onChange={handleChange}
//                 placeholder="Allergy"
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default MyAccount;

import React, { useEffect, useState } from "react";
import userimg from "../assets/images/avatar-icon.png";
import { useNavigate } from "react-router-dom";
import { firestore } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyAccount = () => {
  const [user, setUser] = useState(null);
  const [profileImg, setProfileImg] = useState(userimg);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (userEmail) {
        try {
          const q = query(
            collection(firestore, "patients"),
            where("email", "==", userEmail)
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const userData = { ...doc.data(), documentId: doc.id };
            setUser(userData);
            setUpdatedUser(userData);
            setProfileImg(userData.photo || userimg);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [userEmail]);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const userRef = doc(firestore, "patients", user.documentId);
      await updateDoc(userRef, updatedUser);
      setUser(updatedUser);
      setIsModalOpen(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg mt-6">
      <div className="relative">
        <button
          onClick={handleEdit}
          className="absolute top-0 right-0 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
        >
          Edit
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mt-4">
        <div className="flex-shrink-0">
          <figure className="rounded-full w-28 h-28 border-4 border-gray-300 p-1 mx-auto md:mx-0">
            <img
              src={profileImg}
              alt="User Avatar"
              className="rounded-full w-full h-full object-cover"
            />
          </figure>
        </div>

        <div className="flex-1">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-semibold text-gray-800">
              {user?.name || "N/A"}
            </h3>
            <p className="text-gray-500">{user?.email || "N/A"}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm">
            <div className="bg-gray-100 p-3 rounded">
              <strong>Age:</strong> {user?.age || "N/A"}
            </div>
            <div className="bg-gray-100 p-3 rounded">
              <strong>Phone:</strong> {user?.phone || "N/A"}
            </div>
            <div className="bg-gray-100 p-3 rounded">
              <strong>Gender:</strong> {user?.gender || "N/A"}
            </div>
            <div className="bg-gray-100 p-3 rounded">
              <strong>Allergy:</strong> {user?.allergy || "N/A"}
            </div>
            <div className="bg-gray-100 p-3 rounded">
              <strong>Patient ID:</strong> {user?.documentId || "N/A"}
            </div>
            <div className="bg-gray-100 p-3 rounded">
              <strong>PHID:</strong> {user?.phid || "N/A"}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white w-[90%] max-w-md p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">Edit Profile</h2>
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                value={updatedUser.name || ""}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="age"
                value={updatedUser.age || ""}
                onChange={handleChange}
                placeholder="Age"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="phone"
                value={updatedUser.phone || ""}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="gender"
                value={updatedUser.gender || ""}
                onChange={handleChange}
                placeholder="Gender"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="allergy"
                value={updatedUser.allergy || ""}
                onChange={handleChange}
                placeholder="Allergy"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyAccount;