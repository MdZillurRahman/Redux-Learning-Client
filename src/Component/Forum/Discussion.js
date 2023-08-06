import React from "react";
import { useRef } from "react";
import { useState } from "react";
import Answer from "./Answer";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { format } from "date-fns";
import auth from "../../firebase/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import userPhoto from "../../assets/icon/user1.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  handleIsLoading,
  handleIsShowAll,
} from "../../Features/Boolean/booleanSlice";
import { fetchComment, postComment } from "../../Features/Answer/postCommentSlice";

const Discussion = ({ discussion }) => {
  const { name, picture, question } = discussion;
  const dispatch = useDispatch();
  const [comment, setAnswers] = useState([]);
  const [isValid, setIsValid] = useState();

  const [isShowAll, setIsShowAll] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const inputAnswer = useRef(null);
  const date = new Date();
  const formattedDate = format(date, "PP");
  const [user] = useAuthState(auth);

  // console.log(isLoading);


  let noOfAns;
  comment ? (noOfAns = comment.length) : (noOfAns = 0);

  useEffect(() => {
    // dispatch(fetchComment(discussion._id));
    // setIsLoading(!isLoading);
    // dispatch(handleIsLoading());


    async function Data() {
      const fetchData = await fetch(`https://redux-server-53il.onrender.com/forumsAnswer/${discussion._id}`);
      const res = await fetchData.json();
      setAnswers(res);
      // dispatch(handleIsLoading());
      setIsLoading(prevState => !prevState);
    }
    Data();
  }, [discussion._id, isLoading]);

  const handlePostAnswer = () => {
    const answer = inputAnswer.current.value;

    const answers = {
      ansID: discussion._id,
      name: user.displayName,
      picture: user.photoURL,
      date: formattedDate,
      ans: answer,
    };
    // dispatch(postComment(answers));

    // toast("Comment Created!");
    // inputAnswer.current.value = "";

    console.log(answers);

    axios
      .post("https://redux-server-53il.onrender.com/forumsAnswer", answers)
      .then((response) => {
        if (response) {
          toast("Comment Created!");
          inputAnswer.current.value = "";
          setIsValid(null);
        }
      });

    // setIsAddAnsOpen(!isAddAnsOpen);
  };

  return (
    <div className="relative my-12 outline outline-offset-2 outline-1 outline-[#B3C5EF] rounded overViewStyle">
      <div
        className="grid grid-flow-row-dense grid-cols-10"
        style={{ boxShadow: isShowAll ? "2px 2px 9px 0.1px #B3C5EF" : "" }}
      >
        <div className="col-span-10 lg:col-span-2 pt-9 pl-4 md:border-r-[0.2px] border-b-[0.2px] borderStyle">
          <img
            className="w-[70px] outline outline-offset-0 outline-1 outline-[#B3C5EF] rounded-full absolute top-[-35px]"
            src={picture ? picture : userPhoto}
            alt=""
            style={{ boxShadow: isShowAll ? "2px 2px 9px 0.1px #B3C5EF" : "" }}
          />
          <h2>{name}</h2>
          <p className="text-sm mb-2">{discussion.date}</p>
        </div>
        <div className="col-span-10 lg:col-span-8 p-4 pb-0 border-b-[0.2px] borderStyle overflow-hidden">
          {question}
          <p className="mt-4 mb-2 text-right">{noOfAns} answer(s)</p>
        </div>
      </div>

      {/* post answer */}
      <div
        className="flex justify-between items-center px-2 py-4"
        style={{ boxShadow: isShowAll ? "2px 2px 9px 0.1px #B3C5EF" : "" }}
      >
        <textarea
          ref={inputAnswer}
          onChange={(e) => setIsValid(e.target.value)}
          className="textarea textarea-bordered h-[10px] w-full"
          placeholder="Answer This Question"
        ></textarea>
        <button
          onClick={handlePostAnswer}
          className="btn btn-outline w-[90px] ml-2"
          disabled={!isValid || isValid.trim()===''}
        >
          post
        </button>
      </div>

      {/* answers */}
      <div>
        {noOfAns
          ? !isShowAll
            ? comment
                ?.slice(-1)
                .map((answer, index) => (
                  <Answer key={index} answer={answer}></Answer>
                ))
            : comment
                ?.slice(0)
                .reverse()
                .map((answer, index) => (
                  <Answer key={index} answer={answer}></Answer>
                ))
          : ""}
      </div>

      {/* show all button button */}
      <div className="flex justify-between">
        <button
          className="mx-4 my-1 underline"
          style={{ display: noOfAns > 1 ? "inline" : "none" }}
          onClick={() => {
            // dispatch(handleIsShowAll());
            setIsShowAll(!isShowAll)
          }}
        >
          {isShowAll ? "See Less" : "See All"}
        </button>
        <p
          className="mx-4 my-1"
          style={{ display: noOfAns < 2 ? "inline" : "none" }}
        >
          {noOfAns === 0 ? "No Answer" : "No more"}
        </p>
      </div>
    </div>
  );
};

export default Discussion;
