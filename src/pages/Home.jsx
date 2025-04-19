import React from 'react'
import heroimg1 from '../assets/images/hero-img01.png'
import heroimg2 from '../assets/images/hero-img02.png'
import heroimg3 from '../assets/images/hero-img03.png'
//import docarun from '../assets/images/docarun.jpg'
// import doc4 from '../assets/images/doc4.webp'
// import doc2 from '../assets/images/doc2.jpeg'
// import doc8 from '../assets/images/doc2.jpeg'
// import doc5 from '../assets/images/doc5.jpeg'
import icon1 from '../assets/images/icon01.png'
import icon2 from '../assets/images/icon02.png'
import icon3 from '../assets/images/icon03.png'

import {Link} from 'react-router-dom'
import {BsArrowRight} from 'react-icons/bs'
import About from '../components/About'
import ServiceList from '../components/services/ServiceList'
import DoctorList from '../components/doctors/DoctorList'
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";





const Home = () => {

  const user=localStorage.getItem("email");
  const db = getFirestore();

  const findLocation = async () => {
    try {
      const patientsRef = collection(db, "patients");
      const q = query(patientsRef, where("role", "==", "admin"));
      const querySnapshot = await getDocs(q);
  
      let locations = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.location) {
          locations.push(data.location);
        }
      });
  
      if (locations.length > 0) {
        // Open the first location in Google Maps
        window.open(locations[0], "_blank"); // Opens in a new tab
      } else {
        console.log("No admin locations found.");
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  return (
    <>
      {/* hero section */}
      
        <section className='hero_section pt-[60px] 2xl:h-[800px]'>
          <div className='container'>
            <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>
              <div>
                <div className='lg:w-[570px]'>
                  <h1 className='text-[36px] leading-[36px] text-headingColor font-[800] md:text-[6
                    60px] md:leading-[70px]'>
                    We Help Patients Live a Healthy,Longer Life
                  </h1>
                  <p className='text_para'>We connect patients with experienced doctors, ensuring timely medical care for a healthier and longer life. Book appointments easily and take charge of your well-being today!</p>
                  
                  {user?(
                  <Link to={'/doctors'}><button className='btn'>Request an Appointment</button>
                  </Link>):<Link to={'/login'}><button className='btn'>Request an Appointment</button>
                  </Link>
                  }
                  </div>

                  <div className='flex flex-wrap justify-center gap-6 mt-8'>
  <div className='flex flex-col items-center text-center'>
    <div className='bg-red-500 text-white text-4xl font-extrabold w-24 h-24 flex items-center justify-center rounded-full shadow-lg'>
      30+
    </div>
    <p className='mt-3 text-lg font-medium text-black'>Years of Experience</p>
  </div>

  <div className='flex flex-col items-center text-center'>
    <div className='bg-amber-300 text-white text-4xl font-extrabold w-24 h-24 flex items-center justify-center rounded-full shadow-lg'>
      15+
    </div>
    <p className='mt-3 text-lg font-medium text-black'>Clinic Locations</p>
  </div>

  <div className='flex flex-col items-center text-center'>
    <div className='bg-green-500 text-white text-4xl font-extrabold w-24 h-24 flex items-center justify-center rounded-full shadow-lg'>
      100%
    </div>
    <p className='mt-3 text-lg font-medium text-black'>Patient Satisfaction</p>
  </div>
</div>

              </div>
               
              <div className='flex gap-[30px] justify-end'>
                    <div>
                      <img className='w-full' src={heroimg1} alt="" />
                    </div>
                    <div className='mt-[30px]'>
                    <img className='w-full mb-[30px]' src={heroimg2} alt="" />
                    <img className='w-full' src={heroimg3} alt="" />


                    </div>
              </div>

            </div>

          </div>

        </section>

        
        <section>
          <div className='container'>
            <div className='lg:w-[470px] mx-auto '>
              <h2 className='heading text-center'>
                    Providing the Best Medical Services
              </h2>
              <p className='text_para text-center'>
              We offer top-quality medical services by connecting you with experienced doctors, ensuring expert care and convenience. Your health is our priority!
              </p>
              </div>

             <div className=' grid-cols-1 lg:grid-cols-1 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px] flex '>
              <div className='py-[30px] px-5'>
                <div className='flex items-center justify-center'>
                 <img src={icon1} alt="" />
                </div>

                <div className='mt-[30px]'>
                  <h2 className='text-center text-headingColor font-[700]'>
                    Find Doctor
                  </h2>
                  <p className='text-textColor text-center font-[400]'>
                  Easily find and book appointments with trusted doctors across various specialties, ensuring the best care for your needs.
                  </p>
                  <Link to='/doctors' className='w-[44px] h-[44px] rounded-full border border-solid border-blue-400 mt-[30px] mx-auto flex items-center 
                  justify-center group hover:bg-blue-600'> 
                    <BsArrowRight className='group-hover:text-white w-6 h-5' />
                 </Link>

                </div>

              </div>

              <div className='py-[30px] px-5'>
                <div className='flex items-center justify-center'>
                 <img src={icon2} alt="" />
                </div>

                <div className='mt-[30px]'>
                  <h2 className='text-center text-headingColor font-[700]'>
                    Find Location
                  </h2>
                  <p className='text-textColor text-center font-[400]'>
                  Locate our nearby clinics and hospitals easily with our integrated map feature, ensuring quick access to medical care.
                  </p>
                  <Link className='w-[44px] h-[44px] rounded-full border border-solid border-blue-400 mt-[30px] mx-auto flex items-center 
                  justify-center group hover:bg-blue-600'> 
                    <BsArrowRight className='group-hover:text-white w-6 h-5' onClick={findLocation} />
                 </Link>

                </div>

              </div>

              <div className='py-[30px] px-5'>
                <div className='flex items-center justify-center'>
                 <img src={icon3} alt="" />
                </div>

                <div className='mt-[30px]'>
                  <h2 className='text-center text-headingColor font-[700]'>
                    Book Appointment
                  </h2>
                  <p className='text-textColor text-center font-[400]'>
                  Schedule your appointment with just a few clicks and get timely medical care at your convenience.
                  </p>
                  <Link to='/doctors' className='w-[44px] h-[44px] rounded-full border border-solid border-blue-400 mt-[30px] mx-auto flex items-center 
                  justify-center group hover:bg-blue-600'> 
                    <BsArrowRight className='group-hover:text-white w-6 h-5' />
                 </Link>

                </div>

              </div>
             </div>

          </div>
        </section>


        {/* about section */}

        <About/>

        {/* services */}

        <section>
          <div className='container'>
            <div className='xl:w-[470px] mx-auto '>
              <h2 className='heading text-center'>Our Medical Services

              </h2>
              <p className='text_para text-center'> We provide comprehensive medical services, including general consultations, specialist care, and diagnostic support, ensuring quality healthcare for all. </p>

            </div>
           <ServiceList/>
          </div>
        </section>

        {/*  doctors and specialists*/}

        <section>
          <div className='container'>
          <div className='xl:w-[470px] mx-auto '>
              <h2 className='heading text-center'>Our Great Doctors </h2>
              <p className='text_para text-center'> Our team of highly skilled and experienced doctors is dedicated to providing compassionate care and effective treatments for all patients. </p>

            </div>
          <DoctorList/>
          </div>
        </section>



      



    </>
  )
}

export default Home