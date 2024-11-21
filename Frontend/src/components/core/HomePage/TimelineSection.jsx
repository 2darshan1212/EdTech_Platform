import React from 'react';
import Logo1 from '../../../assets/Logo1.png';
import Logo2 from '../../../assets/Logo2.png';
import Logo3 from '../../../assets/Logo3.png';
import Logo4 from '../../../assets/Logo4.png';
import timelineImage from '../../../assets/timeline.avif'


const timeline = [
    {
        Logo: Logo1,
        Heading: "Leadership",
        Description: "Fully committed to the success company"
    },
    {
        Logo: Logo2,
        Heading: "Responsibility",
        Description: "Students will always be our top priority"
    },
    {
        Logo: Logo3,
        Heading: "Flexibility",
        Description: "The ability to switch is an important skills"
    },
    {
        Logo: Logo4,
        Heading: "Solve the problem",
        Description: "Code your way to a solution"
    },
];

const TimelineSection = () => {
    return (
        <div className="flex flex-row items-start gap-8 pl-10">
            <div className="relative flex flex-col gap-12">

                <div className="absolute top-0 left-6 h-full border-l-2 border-dashed border-gray-400 z-0"></div>

                {timeline.map((element, index) => {
                    return (
                        <div className="flex items-start gap-6 relative z-10" key={index}>

                            <div className="w-[50px] h-[50px] bg-white flex items-center justify-center shadow-lg rounded-full">
                                <img src={element.Logo} alt="Logo" className="w-[30px] h-[30px] object-contain" />
                            </div>

                            <div>
                                <h2 className='font-semibold text-[18px]'>{element.Heading}</h2>
                                <p className='text-base text-gray-600'>{element.Description}</p>
                            </div>

                        </div>
                    );
                })}
            </div>

            <div className='relative shadow-blue-200'>
                <img src={timelineImage} alt="timelineImage"
                    className='shadow-white object-cover h-[400px] w-[700px]' />

                <div className='absolute bg-caribbeangreen-700  flex flex-row text-white          uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-200 px-7'>
                        <p className='text-3xl font-bold'>10</p>
                        <p className='text-caribbeangreen-400 text-sm '>Years of Experience</p>
                    </div>

                    <div className='flex  gap-5 items-center px-7'>
                        <p className='text-3xl font-bold'>250</p>
                        <p className='text-caribbeangreen-400 text-sm '>Type of Courses</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default TimelineSection;
