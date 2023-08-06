import React, { PureComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RechartsQuizMarks from "./RechartsQuizMarks";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase/firebase.init";

const Analysis = () => {
  const { isLoading, routes, error } = useSelector((state) => state.routes);
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [user] = useAuthState(auth);
  useEffect(() => {
    fetch(`https://redux-server-53il.onrender.com/userAnswer/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setData(data);
      });
  }, [user?.email]);

  useEffect(() => {
    fetch(`https://redux-server-53il.onrender.com/progress/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setProgress(data?.progress);
      });
  }, [user?.email]);

  return (
    <div>
      <div className=" m-4  p-4">
        <div className="grid mb-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <div class="card bg-base-100 shadow-xl">
            <figure class="p-5">
              <div
                class="radial-progress  bg-[#4ADE80] text-[#4D4C7D] border-4 border-green"
                style={{ "--value": progress }}
              >
                {parseInt(progress)}%
              </div>
            </figure>
            <div class="card-body p-5 items-center text-center">
              <h2 class="card-title text-3xl font-bold text-[#4D4C7D]">
                Documentation read
              </h2>
            </div>
          </div>

          <div class="card bg-base-100 shadow-xl ">
            <figure class="p-5">
              <div
                class="radial-progress  bg-[#4ADE80] text-[#4D4C7D] border-4 border-green"
                style={{ "--value": (data.length/routes.length)*100 }}
              >
                {(data.length/routes.length)*100}%
              </div>
            </figure>
            <div class="card-body p-5 items-center text-center">
              <h2 class="card-title text-3xl font-bold text-[#4D4C7D]">
                Quiz Completed
              </h2>
            </div>
          </div>

          <div class="card bg-base-100 shadow-xl p-4">
            {/* <figure class="p-5">
              <div
                class="radial-progress  bg-[#4ADE80] text-[#4D4C7D] border-4 border-green"
                style={{ "--value": 70 }}
              >
                70%
              </div>
            </figure> */}
            <div class="card-body p-5 items-center text-center">
              <h2 class="card-title text-3xl font-bold text-[#4D4C7D]">
                Obtained score
              </h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      Quiz
                    </th>
                    <th>
                      Marks
                    </th>
                  </tr>
                </thead>
                <tbody>
                    {data.map(a=>
                  <tr>
                      <td>{a.quizTitle}</td>
                      <td>{a.result}</td>
                  </tr>
                      )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* marks chart */}
        <div class="card bg-base-100 shadow-xl mt-8">
          <div class="card-body">
            <h2 class="card-title text-3xl font-bold text-[#4D4C7D] text-center">
              Quiz Marks History
            </h2>
            <RechartsQuizMarks data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
