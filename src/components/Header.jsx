// import React, { useEffect, useRef, useState } from "react";
// import logo from "../assets/images/logo.png";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import userimg from "../assets/images/avatar-icon.png";
// import { BiMenu } from "react-icons/bi";
// //import "../app.css";
// import { firestore } from "../firebase"; // Import Firebase config
// import { collection, query, where, getDocs } from "firebase/firestore";

// const navLinks = [
//   { path: "/home", display: "Home" },
//   { path: "/doctors", display: "Find a Doctor" },
//   { path: "/services", display: "Services" },
//   { path: "/contact", display: "Contact" },
// ];

// const Header = () => {
//   const headerRef = useRef(null);
//   const menuRef = useRef(null);
//   const navigate = useNavigate();
//   const [profileImg, setProfileImg] = useState(userimg); // Default avatar
//   const userEmail = localStorage.getItem("email"); // Get logged-in user email

//   // Sticky Header on Scroll
//   const handleStickyHeader = () => {
//     window.addEventListener("scroll", () => {
//       if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//         headerRef.current.classList.add("sticky__header");
//       } else {
//         headerRef.current.classList.remove("sticky__header");
//       }
//     });
//   };

//   useEffect(() => {
//     handleStickyHeader();
//     return () => window.removeEventListener("scroll", handleStickyHeader);
//   });

//   const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

//   const profile = () => navigate("/user/profile");

//   // Fetch User Profile Image from Firestore
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       if (userEmail) {
//         try {
//           const q = query(collection(firestore, "patients"), where("email", "==", userEmail));
//           const querySnapshot = await getDocs(q);

//           if (!querySnapshot.empty) {
//             const userData = querySnapshot.docs[0].data();
//             setProfileImg(userData.photo || userimg); // Set profile image or default
//           } else {
//             console.log("User not found in Firestore.");
//           }
//         } catch (error) {
//           console.error("Error fetching user profile:", error);
//         }
//       }
//     };

//     fetchUserProfile();
//   }, [userEmail]);

//   return (
//     <header className="header flex items-center" ref={headerRef}>
//       <div className="container">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <div>
//             <img src={logo} alt="Logo" height={50} />
//           </div>

//           {/* Navigation Links */}
//           <div className="navigation" ref={menuRef} onClick={toggleMenu}>
//             <ul className="menu flex items-center gap-[2.7rem]">
//               {navLinks.map((link, index) => (
//                 <li key={index}>
//                   <NavLink
//                     to={link.path}
//                     className={(navClass) =>
//                       navClass.isActive
//                         ? "text-primaryColor text-[16px] leading-7 font-[600]"
//                         : "text-primaryColor text-[16px] leading-7 font-[500] hover:text-textColor"
//                     }
//                   >
//                     {link.display}
//                   </NavLink>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* User Profile Section */}
//           <div className="flex items-center gap-4">
//             {userEmail ? (
//               <button 
//               onClick={profile} 
//               className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
//           >
//               <figure className="w-[30px] h-[30px] rounded-full border-2 border-white overflow-hidden">
//                   <img
//                       src={profileImg}
//                       alt="User Profile"
//                       className="w-full h-full rounded-full"
//                   />
//               </figure>
//               <span className="text-sm font-medium">View Profile</span>
//           </button>
          
          
//             ) : (
//               <Link to={"/login"}>
//                 <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
//                   Book Appointment
//                 </button>
//               </Link>
//             )}

//             {/* Mobile Menu Icon */}
//             <span className="md:hidden" onClick={toggleMenu}>
//               <BiMenu className="w-6 h-6 cursor-pointer" />
//             </span>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/images/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import userimg from "../assets/images/avatar-icon.png";
import { BiMenu } from "react-icons/bi";
import { firestore } from "../firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/doctors", display: "Find a Doctor" },
  { path: "/services", display: "Services" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(userimg);
  const [adminContact, setAdminContact] = useState({ email: '', phone: '', logo: '' });

  const userEmail = localStorage.getItem("email");

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
  const profile = () => navigate("/user/profile");

  // Sticky Header using Tailwind
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        headerRef.current?.classList.add(
          "fixed", "top-0", "left-0", "w-full", "z-50", "shadow-md", "bg-white"
        );
      } else {
        headerRef.current?.classList.remove(
          "fixed", "top-0", "left-0", "w-full", "z-50", "shadow-md", "bg-white"
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch User Profile Image
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (userEmail) {
        try {
          const q = query(collection(firestore, "patients"), where("email", "==", userEmail));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setProfileImg(userData.photo || userimg);
          } else {
            console.log("User not found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [userEmail]);

  // Fetch Admin Contact Info
  useEffect(() => {
    const fetchAdminContact = async () => {
      try {
        const q = query(collection(firestore, 'patients'), where('role', '==', 'admin'), limit(1));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const adminData = querySnapshot.docs[0].data();
          setAdminContact({
            email: adminData.email || 'Not Available',
            phone: adminData.phone || 'Not Available',
            logo: adminData.logo || logo,
          });
        }
      } catch (error) {
        console.error('Error fetching admin contact:', error);
      }
    };

    fetchAdminContact();
  }, []);

  return (
    <header ref={headerRef} className="bg-white transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <img src={adminContact.logo} alt="Logo" height={20} width={160} />
          </div>

          {/* Navigation Links */}
          <div className="navigation hidden md:block" ref={menuRef}>
            <ul className="flex items-center gap-10">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 text-base font-semibold"
                        : "text-gray-700 text-base font-medium hover:text-blue-500"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* User Profile Section */}
          <div className="flex items-center gap-4">
            {userEmail ? (
              <button
                onClick={profile}
                className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
              >
                <figure className="w-[30px] h-[30px] rounded-full overflow-hidden border-2 border-white">
                  <img
                    src={profileImg}
                    alt="User Profile"
                    className="w-full h-full object-cover"
                  />
                </figure>
                <span className="text-sm font-medium">View Profile</span>
              </button>
            ) : (
              <Link to={"/login"}>
                <button className="bg-blue-600 py-2 px-6 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300">
                  Book Appointment
                </button>
              </Link>
            )}

            {/* Mobile Menu Icon */}
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;