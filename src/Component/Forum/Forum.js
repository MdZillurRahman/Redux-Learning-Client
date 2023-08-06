import React, { useEffect, useRef, useState } from "react";
import Discussion from "./Discussion";
import { format } from "date-fns";
import auth from "../../firebase/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { handleIsAskOpen, handleIsLoading, handleIsLoadingForum } from "../../Features/Boolean/booleanSlice";

const Forum = () => {
    const dispatch = useDispatch();
//   const { isLoadingForum,isAskOpen } = useSelector((state) => state.boolean);
    const [discussions, setDiscussions] = useState([]);
    const [isAskOpen, setIsAskOpen] = useState(false);
    const [isValid, setIsValid] = useState();

    const [isLoading, setIsLoading] = useState(false);
    const askedQuestions = useRef(null);
    const date = new Date();
    const formattedDate = format(date, "PP");
    const [user] = useAuthState(auth);

    // console.log(isAskOpen);

    useEffect(() => {
        fetch("https://redux-server-53il.onrender.com/forums")
            .then((res) => res.json())
            .then((data) => {
                setDiscussions(data)
                // dispatch(handleIsLoadingForum());
                setIsLoading(!isLoading);
            });
    }, [dispatch, isLoading]);

    const handlePostQuestion = (e) => {
        e.preventDefault();
        // const ques = getValues("askedQuestions");
        const ques = askedQuestions.current.value;
        // console.log(ques);

        const post = {
            name: user.displayName,
            picture: user.photoURL,
            question: ques,
            date: formattedDate,
        };

        axios.post("https://redux-server-53il.onrender.com/forums", post).then((response) => {
            if (response) {
                toast("Post Created!");
                askedQuestions.current.value = "";
                setIsValid(null);
            }
        });

        // close for mobile
        setIsAskOpen(!isAskOpen);
        // dispatch(handleIsAskOpen())
    };



    return (
        <div className="grid grid-flow-row-dense grid-cols-10 pt-20">
            <div className="col-span-10 md:col-span-8 mx-4 md:mx-20 order-2 md:order-1">
                {discussions.slice(0).reverse().map((discussion, index) => (
                    <Discussion key={index} discussion={discussion}></Discussion>
                ))}
            </div>

            {/* Ask Question section */}
            <div className="md:relative col-span-10 md:col-span-2 mx-4 md:mx-0 rounded-lg md:rounded-none order-1 md:order-2 text-center md:text-left overViewStyle">

                {/* mobile dropdown button */}
                <button
                    className="block md:hidden w-full p-3 font-semibold rounded-lg text-white bg-[#020060]"
                    onClick={() => {
                        setIsAskOpen(!isAskOpen);
                        // dispatch(handleIsAskOpen())
                    }}
                >
                    {isAskOpen ? "Ask Later" : "Ask a Question"}
                </button>

                <div className={`md:fixed md:top-[80px] md:w-[20%] p-4 ${isAskOpen ? 'block' : 'hidden'} md:block`}>
                    <p className="text-xl font-bold my-4">Confused about any topic?</p>
                    <form action="">
                        <label className="text-lg font-semibold" htmlFor="">
                            Ask a question
                        </label>{" "}
                        <br />
                        <textarea
                            type="text"
                            placeholder="Write your question here"
                            className="textarea textarea-bordered w-full mt-3"
                            onChange={(e) => setIsValid(e.target.value)}
                            ref={askedQuestions}
                        />{" "}
                        <br />
                        <button
                            onClick={(e) => handlePostQuestion(e)}
                            className="btn btn-sm w-[70px] mt-2"
                            disabled={!isValid || isValid.trim()===''}
                        >
                            Post
                        </button>
                    </form>
                </div>
            </div>

            {/* top ask button in mobile */}
            {/* <div className="block md:hidden col-span-10 order-first m-2 rounded-md overViewStyle">
                <button
                    className="w-full p-3 font-semibold rounded-lg text-white bg-[#020060]"
                    onClick={() => {
                        setIsAskOpen(!isAskOpen);
                    }}
                >
                    {isAskOpen ? "Ask Later" : "Ask a Question"}
                </button>
                <div className="p-2" style={{ display: isAskOpen ? "block" : "none" }}>
                    <p className="text-xl font-bold my-4 text-center">Confused about any topic?</p>
                    <form action="" className="">
                        <label className="text-lg font-semibold mb-0 pb-0" htmlFor="">
                            <p className="text-center mb-0 pb-0"> Ask a question</p>
                        </label>{" "}
                        <textarea
                            type="text"
                            placeholder="Write your question here"
                            className="textarea textarea-bordered w-full mt-3"
                            ref={askedQuestions}
                        />{" "}
                        <br />
                        <button
                            onClick={(e) => handlePostQuestion(e)}
                            className="btn btn-sm w-[70px] mt-2 block mx-auto"
                        >
                            Post
                        </button>
                    </form>
                </div>
            </div> */}
        </div>
    );
};

export default Forum;
