import React, { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import auth from "../../firebase/firebase.init";

const ShowAnswer = ({ quiz }) => {
  // const { selectedAns } = useSelector((state) => state.selectedAns);
  // console.log(selectedAns);
  const [selectedAns, setSelectedAns] = useState([]);
  const [user] = useAuthState(auth);
  useEffect(() => {
    fetch(`https://redux-server-53il.onrender.com/userAnswer/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        const q = data.filter((a) => a.quizTitle === quiz);
        // console.log(q);
        setSelectedAns(q[0].selectedAns);
        // console.log(q[0].selectedAns);
      });
  }, [quiz, user?.email]);

  return (
    <div className="rounded">
      <h2 className="text-3xl font-bold text-center ">Answer</h2>

      {selectedAns.map((q) => (
        <div className="card w-[90%] mx-auto shadow-lg p-4">
          <p className="font-bold text-xl">
            {q.id}. {q.question}
          </p>

          {q?.options?.map((option) =>
            option === q.ans ? (
              <p className="border bg-green-400 text-white my-2 ml-4 p-2">
                {option}
              </p>
            ) : option !== q.selectedAns ? (
              <p className="border my-2 ml-4 p-2">{option}</p>
            ) : (
              <p className="border bg-red-500 my-2 ml-4 p-2">{option}</p>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default ShowAnswer;
