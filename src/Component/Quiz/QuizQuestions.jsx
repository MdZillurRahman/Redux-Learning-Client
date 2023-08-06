import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuizzes } from "../../Features/Quizzes/quizzesSlice";
// import { getQUIZ } from "../../Services/actions/quizActions";
import Loading from "../../Shared/Loading/Loading";
import Result from "../Result/Result";
import Timer from "./Timer";
import { handleIsResult } from "../../Features/Boolean/booleanSlice";

import {
  handleDecrement,
  handleIncrement,
  handleReset,
} from "../../Features/Counter/questionsCounterSlice";
import { fetchQuestion } from "../../Features/Quizzes/questionSlice";
import {
  handleSelectedAns,
  handleSelectedAnsReset,
} from "../../Features/Answer/selectedAnsSlice";
import { handleTotalAns } from "../../Features/Answer/totalAnsSlice";
import {
  handleSelected,
  handleSelectedReset,
} from "../../Features/Answer/selectedSlice";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase/firebase.init";

const QuizQuestions = ({ name }) => {
  const dispatch = useDispatch();
  const [isResult, setIsResult] = useState(false);
  const [result, setResult] = useState(0);
  // const [completed, setCompleted]

  const { isLoading, quizzes, error } = useSelector((state) => state.quizzes);
  const { isLoading1, question, error1 } = useSelector(
    (state) => state.question
  );
  // const { isResult } = useSelector((state) => state.boolean);
  const { count } = useSelector((state) => state.counter);
  const { selectedAns } = useSelector((state) => state.selectedAns);
  const { selected } = useSelector((state) => state.selected);
  const { totalAns } = useSelector((state) => state.totalAns);

  const [user] = useAuthState(auth);

  // console.log(selected);
  // console.log(selectedAns);
  // console.log(totalAns);

  const resultInPercentage =
    (parseInt(totalAns.length) / parseInt(quizzes.length)) * 100;

  useEffect(() => {
    dispatch(fetchQuizzes(name));
    dispatch(fetchQuestion({ name, count }));

    fetch(
      `https://redux-server-53il.onrender.com/userAnswer/${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        const q = data.filter((a) => a.quizTitle === name);
        setResult(q[0]?.result);
        if (q[0].completed === true) {
          setIsResult(true);
        }
      });
  }, [dispatch, count, name, user?.email]);

  const handlePrevious = (e) => {
    e.preventDefault();
    dispatch(handleDecrement());
    dispatch(fetchQuestion({ name, count }));

    // if (count > 0 && count < quizzes.length) {
    //   const q = quizzes.filter((a) => a.id === count);
    //   setQuestion(q[0]);
    // }
  };

  const handleNext = (e) => {
    e.preventDefault();
    dispatch(handleIncrement());
    dispatch(fetchQuestion({ name, count }));
    // if (count > 0 && count < quizzes.length) {
    //   const q = quizzes.filter((a) => a.id === count);
    //   setQuestion(q[0]);
    // }
    dispatch(handleSelectedReset());
    getTotal();
  };

  const getTotal = () => {
    Object.keys(selected).length !== 0 &&
      totalAns.indexOf(selected.id) === -1 &&
      dispatch(handleSelectedAns(selected));
    // selectedAns.push(selected);
    selected.selectedAns === question.ans && dispatch(handleTotalAns("1"));
    // totalAns.push("1");
    // setTotalAns(totalAns);
    // setSelectedAns(selectedAns);
  };

  // console.log(resultInPercentage);

  const userData = {
    email: user?.email,
    quizTitle: name,
    selectedAns: selectedAns,
    result: resultInPercentage.toFixed(2),
    completed: true,
  };

  const finalResult = () => {
    if (resultInPercentage > 40) {
      axios
        .post(
          `https://redux-server-53il.onrender.com/userAnswer`,
          userData
        )
        .then((response) => {
          if (response) {
            // console.log(response);
          }
        });

      // axios
      //   .put(
      //     `https://redux-server-53il.onrender.com/users`,
      //     userData
      //   )
      //   .then((response) => {
      //     if (response) {
      //       console.log(response);
      //     }
      //   });
    }
  };

  const handleSubmit = () => {
    // dispatch(handleIsResult());
    // dispatch(handleReset());
    finalResult();
    setIsResult(true);
    dispatch(handleReset());
  };

  const handleAns = (e) => {
    const answer = e.target.value;
    const d = {
      id: question?.id,
      question: question.question,
      options: question.options,
      ans: question.ans,
      selectedAns: answer,
    };
    dispatch(handleSelected(d));

    // setSelected({
    //   id: question?.id,
    //   question: question.question,
    //   options: question.options,
    //   ans: question.ans,
    //   selectedAns: answer,
    // });
  };

  const isClicked = () => {
     const checked='';
  }

  return (
    <div className="w-full lg:w-[600px] min-h-screen px-4 lg:mx-auto my-auto py-16">
      {isResult === false && (
        <div>
          {count > quizzes.length ? (
            ""
          ) : (
            <div className="flex justify-between mt-8">
              <div>
                <p className="text-2xl text-gray-400">
                  Questions: {count}/{quizzes.length}
                </p>
              </div>
              <Timer maxSec={60} maxMin={4} />
            </div>
          )}
          <div className="mt-8 text-xl">
            {isLoading1 && <Loading />}
            {count > quizzes.length ? (
              <p className="text-green-500 text-center font-bold text-xl">Thanks for your time. Click the button to see your result.</p>
            ) : (
              <p className="font-bold text-3xl my-4">
                {question?.id}.<span>{question?.question}</span>
              </p>
            )}
            <div className="grid grid-cols-1 w-full gap-8">
              {question?.options?.map((a) => (
                <label className="p-3 border-2 rounded">
                  <input
                    onClick={(e) => handleAns(e)}
                    type="radio"
                    name="option"
                    id={question?.id}
                    value={a}
                    className="mr-1 my-2 "
                  />
                  {a}
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-between my-10">
            {count === 1 ? (
              <>
                <div>
                  <button
                    disabled
                    onClick={handlePrevious}
                    className="px-4 py-2 bg-gray-500
                rounded font-bold text-white"
                  >
                    Previous
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 rounded bg-blue-500 font-bold text-white"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : count > quizzes.length ? (
              <>
                <div>
                  <label
                    onClick={handleSubmit}
                    htmlFor="homeModal"
                    className="px-4 py-2 rounded bg-blue-500 font-bold text-white mx-16 lg:mx-40"
                  >
                    See Your Result
                  </label>
                  {/* <button></button> */}
                </div>
              </>
            ) : (
              <>
                <div>
                  <button
                    onClick={handlePrevious}
                    className="px-4 py-2 bg-blue-500
                rounded font-bold text-white"
                  >
                    Previous
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 rounded bg-blue-500 font-bold text-white"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {/* {isChecked && <Result totalAns={totalAns} />} */}
      {/* {isResult && <HomeModal />} */}
      {isResult && (
        <Result
          quiz={name}
          // finalResult={finalResult}
          setIsResult={setIsResult}
          result={result}
          resultInPercentage={resultInPercentage}
        />
      )}
    </div>
  );
};

export default QuizQuestions;
