import React from 'react'
import { FaArrowRight } from "react-icons/fa"
import { Link } from 'react-router-dom'
import HighlightText from '../components/core/HomePage/HighlightText'

import CTAButton from '../components/core/HomePage/Button'
import Banner from '../assets/Banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import Footer from '../components/core/common/Footer'


const Home = () => {
  return (
    <div>
      {/* Section 1 */}

      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between">

        <Link to="/signup">

          <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
            <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>

        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with
          <HighlightText text="Coding Skills" />
        </div>

        <div className="mt-4 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from anywhere in the world,and get access toa a wealth of resources, including hands-on projects, quizzes, and peronalized feedback from instructor.
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>



        <div className="flex justify-center items-center mx-3 my-12 shadow-blue-200">
          <video
            muted
            autoPlay
            loop
            className="w-full h-auto max-w-screen-lg">
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section 1 */}

        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className='text-4xl font-semibold'>
                Unlock Your
                <HighlightText text={"coding potential "} />
                with our online cources
              </div>
            }
            subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
            ctabtn1={
              {
                btnText: "try it yourself",
                linkto: "/signup",
                active: true,
              }
            }
            ctabtn2={
              {
                btnText: "learn more",
                linkto: "/login",
                active: false,
              }
            }
            codeblock={`<!DOCTYPE html>
            <html> 
              <head>
                <title>Example</title> 
                <link rel="stylesheet" href="styles.css">
              </head>
              <body>
                <h1><a href="/">Header</a></h1>
                <nav>
                  <a href="one/">One</a>
                  <a href="two/">Two</a>
                  <a href="three/">Three</a>
                </nav>
              </body>
            </html>`}
            codeColor={"text-yellow-25"}
          />
        </div>

        {/* Code Section 2 */}

        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className='text-4xl font-semibold'>
                Start
                <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
            ctabtn1={
              {
                btnText: "Continue Lessson",
                linkto: "/signup",
                active: true,
              }
            }
            ctabtn2={
              {
                btnText: "Learn More",
                linkto: "/login",
                active: false,
              }
            }
            codeblock={`<!DOCTYPE html>
            <html> 
              <head>
                <title>Example</title> 
                <link rel="stylesheet" href="styles.css">
              </head>
              <body>
                <h1><a href="/">Header</a></h1>
                <nav>
                  <a href="one/">One</a>
                  <a href="two/">Two</a>
                  <a href="three/">Three</a>
                </nav>
              </body>
            </html>`}
            codeColor={"text-yellow-25"}
          />
        </div>
        
        <ExploreMore />

      </div>

      {/* Section 2 */}

      <div className='bg-pure-greys-5 text-richblack-700'>
        <div className='homepage_bg h-[310px]'>

          <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
            <div className='h-[150px]'></div>
            <div className='flex flex-row gap-7 text-white'>
              <CTAButton active={true} linkto={"/signup"}>
                <div className='flex items-center gap-3'>
                  Explore full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>

              <CTAButton active={false} linkto={"/signup"}>
                <div>
                  Learn More
                </div>
              </CTAButton>
            </div>

          </div>

        </div>

        <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>

          <div className='flex flex-row gap-5 mb-10 mt-[95px]'>
            <div className='text-4xl font-semibold w-[45%]'>
              Get the Skills you need far a
              <HighlightText text={"Job that is in demand"} />
            </div>

            <div className='flex flex-col gap-10 w-[40%] items-start'>
              <div className='text-[16px]'>
                The mordern StudyNotion is the dictates its won terms. Today, to be a competitive specialist requires more than professional skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div>
                  Learn More
                </div>
              </CTAButton>
            </div>
          </div>

          <TimelineSection />

          <LearningLanguageSection />
          
        </div>



      </div>

      {/* Section 3 */}

      <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-7 bg-richblack-900 text-white'>

        <InstructorSection />

        <h2 className='text-4xl font-semibold mt-10 text-center'>Reviews from other learners</h2>
              {/* rivew slider here */}
      </div>


      {/* Footer */}
      <Footer />


    </div>

  )
}

export default Home 
