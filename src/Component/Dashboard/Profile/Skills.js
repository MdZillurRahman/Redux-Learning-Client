import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import SkillsUpdate from './SkillsUpdate';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../../firebase/firebase.init';
import Loading from './../../../Shared/Loading/Loading';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Skills = () => {
    const [skills, setSkills] = useState({})
    const [user] = useAuthState(auth);
    const email = user?.email;
    const { reload } = useSelector((state) => state.boolean);
    useEffect(() => {
        fetch(`https://redux-server-53il.onrender.com/skills/${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                setSkills(data);
                reload();
            });
    }, [user, reload]);
    const { html, css, js, tailwind, redux, nextjs, bs, daisy } = skills;
    return (
        <div className='py-12 px-4 bg-white'>


            <div className="flex justify-between">
                <h2 className="text-[#4D4C7D] text-3xl font-bold">Skills</h2>
                <label for="skill-update" class="btn modal-button rounded-none btn-sm">Update</label>
            </div>
            <hr />

            {/* ----------------------------- */}
            {skills ?
                <div className="grid grid-cols-1 py-8 lg:grid-cols-2 gap-8">
                    <div class="w-full bg-gray-200 rounded-full  dark:bg-gray-700">
                        <div class="bg-[#4D4C7D] text-white font-bold uppercase pl-2  rounded-full" style={{ width: `${html}%` }}>html</div>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full  dark:bg-gray-700">
                        <div class="bg-[#4D4C7D] text-white font-bold uppercase pl-2  rounded-full" style={{ width: `${css}%` }}>css</div>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full  dark:bg-gray-700">
                        <div class="bg-[#4D4C7D] text-white font-bold uppercase pl-2 relative  rounded-full" style={{ width: `${js}%` }}><p className='aboslute top-0 left-0'>javascript</p></div>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full  dark:bg-gray-700">
                        <div class="bg-[#4D4C7D] text-white font-bold uppercase pl-2 relative  rounded-full" style={{ width: `${tailwind}%` }}><p className='aboslute top-0 left-0'>tailwindCss</p></div>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full  dark:bg-gray-700">
                        <div class="bg-[#4D4C7D] text-white font-bold uppercase pl-2  rounded-full" style={{ width: `${redux}%` }}>redux</div>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full  dark:bg-gray-700">
                        <div class="bg-[#4D4C7D] text-white font-bold uppercase pl-2  rounded-full" style={{ width: `${nextjs}%` }}>nextJS</div>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full  dark:bg-gray-700">
                        <div class="bg-[#4D4C7D] text-white font-bold uppercase pl-2  rounded-full" style={{ width: `${daisy}%` }}>DaisyUI</div>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full  dark:bg-gray-700">
                        <div class="bg-[#4D4C7D] text-white font-bold uppercase pl-2  rounded-full" style={{ width: `${bs}%` }}>bootstrap</div>
                    </div>
                </div> : <p>Please update your skills</p>}
            {/* ----------------------------- */}
            <SkillsUpdate />

        </div>
    );
};

export default Skills;