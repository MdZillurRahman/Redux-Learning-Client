import React, { useEffect } from "react";
import EducationUpdate from "./EducationUpdate";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../../firebase/firebase.init";
import { useSelector } from "react-redux";
import { useState } from "react";

const Educations = () => {
  const [education, setEducation] = useState({});
  const [user] = useAuthState(auth);
  const email = user?.email;
  const { reload } = useSelector((state) => state.boolean);
  useEffect(() => {
    fetch(`https://redux-server-53il.onrender.com/education/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setEducation(data);
        reload();
      });
  }, [user, reload]);
  console.log(education);
  const {
    university,
    universitySub,
    universityYear,
    college,
    collegeYear,
    collegeGroup,
    schoolGroup,
    school,
    schoolYear,
  } = education;
  return (
    <div className="m-4">
      {/* <!-- component --> */}
      <div class="container  mx-auto w-full h-full">
        <div className="flex justify-between">
          <h2 className="text-[#4D4C7D] text-3xl font-bold">Education</h2>
          <label
            for="education-update"
            class="btn modal-button rounded-none btn-sm"
          >
            Update
          </label>
        </div>
        <hr />

        {education ? (
          <div class="relative wrap overflow-hidden p-10 h-full">
            <div
              class="border-2-2 absolute border-opacity-20 border-gray-700 h-full border"
              style={{ left: "50%" }}
            ></div>
            {/* <!-- right timeline --> */}
            <div class="mb-8 flex justify-between items-center w-full right-timeline">
              <div class="order-1 w-5/12"></div>
              <div class="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                <h1 class="mx-auto font-semibold text-lg text-white">1</h1>
              </div>
              <div class="order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
                <time class="mb-1 text-sm font-normal leading-none dark:text-gray-500">
                  {universityYear}
                </time>
                <h3 class="mb-3 font-bold text-gray-800 text-xl">
                  {universitySub}
                </h3>
                <p class="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
                  {university}
                </p>
              </div>
            </div>

            {/* <!-- left timeline --> */}
            <div class="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
              <div class="order-1 w-5/12"></div>
              <div class="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                <h1 class="mx-auto text-white font-semibold text-lg">2</h1>
              </div>
              <div class="order-1 bg-red-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
                <time class="mb-1 text-sm font-normal leading-none  dark:text-gray-500">
                  {collegeYear}
                </time>
                <h3 class="mb-3 font-bold text-white text-xl">
                  {collegeGroup}
                </h3>
                <p class="text-sm font-medium leading-snug tracking-wide text-white text-opacity-100">
                  {college}
                </p>
              </div>
            </div>

            {/* <!-- right timeline --> */}
            <div class="mb-8 flex justify-between items-center w-full right-timeline">
              <div class="order-1 w-5/12"></div>
              <div class="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                <h1 class="mx-auto font-semibold text-lg text-white">3</h1>
              </div>
              <div class="order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
                <time class="mb-1 text-sm font-normal leading-none dark:text-gray-500">
                  {schoolYear}
                </time>
                <h3 class="mb-3 font-bold text-gray-800 text-xl">
                  {schoolGroup}
                </h3>
                <p class="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
                  {school}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>Please update your education section</p>
        )}
      </div>
      <EducationUpdate />
    </div>
  );
};

export default Educations;
