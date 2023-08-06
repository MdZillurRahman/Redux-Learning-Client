import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';
import auth from '../../../firebase/firebase.init';
import ExperienceUpdate from './ExperienceUpdate';
// import Experiences from './Experiences';

const Experiences = () => {
    const [user] = useAuthState(auth)
    const email = user?.email;
    const [experience, setExperience] = useState({})
    const { reload } = useSelector((state) => state.boolean);
    useEffect(() => {
        fetch(`https://redux-server-53il.onrender.com/experience/${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                setExperience(data);
                reload();
            });
    }, [user, reload]);

    const { experience1, description1, time1, experience2, description2, time2, experience3, description3, time3 } = experience;

    console.log(experience);
    return (
        <div className='m-4'>
            <div className="flex justify-between">
                <h2 className="text-[#4D4C7D] text-3xl font-bold">Experiences</h2>
                <label for="experience-update" class="btn modal-button rounded-none btn-sm">Update</label>
            </div>
            <hr />

            {experience ?
                <ol class="relative border-l border-gray-200 dark:border-gray-700 my-8">
                    <li class="mb-10 ml-4">
                        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{time1}</time>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{experience1}</h3>
                        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{description1}</p>

                    </li>
                    <li class="mb-10 ml-4">
                        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{time2}</time>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{experience2}</h3>
                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">{description2}</p>
                    </li>
                    <li class="ml-4">
                        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{time3}</time>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{experience3}</h3>
                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">{description3}</p>
                    </li>
                </ol> : <h2 className='text-center text-2xl font-bold'>Please update your expereince</h2>}
            <ExperienceUpdate />
        </div>
    );
};

export default Experiences;