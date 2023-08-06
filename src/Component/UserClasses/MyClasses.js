import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Edit from "../Documentation/Edit";
import { useState } from "react";
import Loading from "../../Shared/Loading/Loading";
import { Link } from "react-router-dom";
import { fetchRoutes } from "../../Features/Routes/routesSlice";
import { useNavigate, useParams } from "react-router";
import QuizQuestions from "../Quiz/QuizQuestions";
import { handleSelectedAnsReset } from "../../Features/Answer/selectedAnsSlice";
import { handleTotalAnsReset } from "../../Features/Answer/totalAnsSlice";
import { handleSelectedReset } from "../../Features/Answer/selectedSlice";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import auth from "../../firebase/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const MyClasses = () => {
  // const navigate = useNavigate();
  // const content = window.localStorage.getItem("finalContent");
  // console.log(content);
  const { blog } = useParams();
  // console.log(blog);

  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const { isLoading, routes } = useSelector((state) => state.routes);

  const [isFalse, setIsFalse] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [position, setPosition] = useState(1);
  // const [final, setFinal] = useState(position);
  const [blog2, setBlog2] = useState(blog);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();

  // const [finalContent, setFinalContent] = useState(blog);

  //const handleQuiz2 = (name) => {
  //   navigate(`/quiz/${name}`);
  //   console.log(name);
  // };

  const q = routes.map((route) => route.content);

  useEffect(() => {
    async function Data() {
      const fetchData = await fetch(
        "https://redux-server-53il.onrender.com/doc"
      );
      const res = await fetchData.json();
      const con = res.filter((a) => a.pathRoute === blog2);
      // console.log(con);
      setTotal(res.length);
      setBlogs(con[0]);
    }
    Data();
  }, [blogs.nestedRoute, blog2]);

  // console.log(blogs);

  useEffect(() => {
    fetch(`https://redux-server-53il.onrender.com/progress/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        for (let i = 0; i < routes.length; i++) {
          const q1 = q[i];
          for (let j = 0; j < q1.length; j++) {
            const q2 = q1[j];
            // console.log(q2);
            if (q2.nestedRoute === data?.blog) {
              setBlog2(q2.pathRoute);
            }
          }
        }
      });
  }, [dispatch, q, routes.length, user?.email]);

  useEffect(() => {
    fetch(`https://redux-server-53il.onrender.com/progress/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setProgress(data?.progress);
        setIsFalse(!isFalse);
        setPosition(data?.position);
      });
  }, [isFalse, user?.email]);

  const handlePrevious = () => {
    const finalId = parseInt(blogs?.docID) - 1;

    for (let i = 0; i < routes.length; i++) {
      const q1 = q[i];
      for (let j = 0; j < q1.length; j++) {
        const q2 = q1[j];
        if (parseInt(q2.idNumber) === finalId) {
          setBlog2(q2.pathRoute);
        }
      }
    }
    window.scrollTo(0, 0);
    dispatch(handleSelectedReset());
    dispatch(handleSelectedAnsReset());
    dispatch(handleTotalAnsReset());
  };

  const handleNext = () => {
    const finalId = parseInt(blogs?.docID) + 1;
    // console.log(finalId);
    // setFinal(finalId);

    for (let i = 0; i < routes.length; i++) {
      const q1 = q[i];
      for (let j = 0; j < q1.length; j++) {
        const q2 = q1[j];
        // console.log(q2);
        if (parseInt(q2.idNumber) === finalId) {
          setBlog2(q2.pathRoute);
        }
      }
    }
    window.scrollTo(0, 0);
    dispatch(handleSelectedReset());
    dispatch(handleSelectedAnsReset());
    dispatch(handleTotalAnsReset());
    saveProgress();
  };

  // console.log(blog2);

  const saveProgress = () => {
    const progressBar = {
      email: user?.email,
      progress: ((position / total) * 100).toFixed(2),
      blog: blogs.pathRoute,
      position: position + 1,
    };

    // console.log(progressBar);
    axios
      .put(`https://redux-server-53il.onrender.com/progress/${user?.email}`, progressBar)
      .then((response) => {
        if (response) {
          // console.log(response);
        }
      });
  };

  const handleFinish = () => {
    const progressBarFinal = {
      email: user?.email,
      progress: 100,
      blog: blogs.pathRoute,
      position: total,
    };
    axios
      .put(`https://redux-server-53il.onrender.com/progress/${user?.email}`, progressBarFinal)
      .then((response) => {
        if (response) {
          // console.log(response);
        }
      });
    navigate("/dashboard/analysis");
  };

  return (
    <div className="mt-20">
      <div className="min-h-screen py-8 lg:py-12 px-4 lg:px-20 flex flex-col lg:flex-row gap-10">
        <div className="lg:w-3/4">
          <p className="text-4xl font-bold mb-6">Redux Documentation</p>
          {isLoading && <Loading />}
          {blogs && <Edit blogs={blogs} />}

          <div className="flex justify-between my-10">
            {position === 1 ? (
              <>
                <button
                  disabled
                  onClick={handlePrevious}
                  className="px-4 py-2 bg-gray-500
                rounded font-bold text-white"
                >
                  Previous
                </button>

                <button
                  onClick={handleNext}
                  className="px-4 py-2 rounded bg-blue-500 font-bold text-white"
                >
                  Next
                </button>
              </>
            ) : (position -1)  === total  ? (
              <>
                <button
                  onClick={handlePrevious}
                  className="px-4 py-2 bg-blue-500
                rounded font-bold text-white"
                >
                  Previous
                </button>

                <button
                  onClick={handleFinish}
                  className="px-4 py-2 rounded bg-blue-500 font-bold text-white"
                >
                  Finish
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handlePrevious}
                  className="px-4 py-2 bg-blue-500
                rounded font-bold text-white"
                >
                  Previous
                </button>

                <button
                  onClick={handleNext}
                  className="px-4 py-2 rounded bg-blue-500 font-bold text-white"
                >
                  Next
                </button>
              </>
            )}
          </div>
        </div>
        <div className="lg:w-[35%]">
          <p className="flex items-center text-xl font-bold gap-2">
            Course Content:{" "}
            <progress
              className="progress progress-info w-40 mt-1"
              value={progress}
              max="100"
              // onChange={handleProgressChange}
            ></progress>{" "}
            {progress}%
          </p>
          {routes.map((route) => (
            <div
              key={route._id}
              className="collapse collapse-arrow bg-gray-200 text-black rounded mt-2"
            >
              <input type="checkbox" />
              <div className="collapse-title  font-medium ">
                <p>{route.title}</p>
                {/* <Link to="/module">{route.title}</Link> */}
              </div>
              <div className="collapse-content pl-6">
                <ul className="leading-10 ">
                  {route?.content.map((a, index) => (
                    <li
                      className="bg-white my-1 p-2 rounded"
                      key={index}
                      onClick={() => {
                        setBlog2(a.nestedRoute);
                      }}
                    >
                      <Link to={`/myClasses/${a.pathRoute}`}>
                        {a.nestedRoute}
                      </Link>
                      {/* <p className="cursor-pointer">{a.nestedRoute}</p> */}
                      {/* <Link to={`/module/${a.pathRoute}`}>{a.nestedRoute}</Link> */}
                    </li>
                  ))}
                  {/* <li>
                    <button
                      onClick={() => {
                        setQuizContent(route.title);
                        setFinalContent("");
                      }}
                    >
                      Quiz
                    </button>
                  </li> */}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyClasses;
