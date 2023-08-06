import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { handleAdded } from "../../../Features/Added/AddedSlice";
import { handleAddedOption, handleResetOption } from "../../../Features/Added/AddedOption";
import { postQuizzes } from "../../../Features/Quizzes/quizzesSlice";

const AddQuiz = () => {
  // const [added, setAdded] = useState([]);
  // const [quizRoute, setQuizRoute] = useState([]);
  // const [addedOption, setAddedOption] = useState([]);
  // const [totalAdded, setTotalAdded] = useState([]);
  // const [totalAddedOptions, setTotalAddedOptions] = useState([]);
  const { register, getValues, setValue } = useForm();
  const dispatch = useDispatch();

  // const { routes } = useSelector((state) => state.routes);
  const { added } = useSelector((state) => state.added);
  const { addedOption } = useSelector((state) => state.addedOption);

  // perfectly Working till now
  const handleAddOptions = (e) => {
    e.preventDefault();

    const option = getValues("option");

    dispatch(handleAddedOption(option));
    // setAddedOption(option);
    setValue("option", "");
  };
  // console.log(addedOption);

  const handleAdd = (e) => {
    e.preventDefault();
    const questionNo = getValues("questionNo");
    const question = getValues("question");
    const answer = getValues("answer");
    const q = {
      id: questionNo,
      question: question,
      options: addedOption,
      ans: answer,
    };
    dispatch(handleAdded(q));
    setValue("questionNo", "");
    setValue("question", "");
    setValue("option", "");
    setValue("answer", "");
    dispatch(handleResetOption())
  };

  // useEffect(() => {
  // if (added.length !== 0 && totalAdded.indexOf(added) === -1) {
  //   totalAdded.push(added);
  // }
  // if (
  //   addedOption.length !== 0 &&
  //   totalAddedOptions.indexOf(addedOption) === -1
  // ) {
  //   totalAddedOptions.push(addedOption);
  // }
  // setTotalAddedOptions(totalAddedOptions);

  // dispatch(handleTotalAddedOptions(totalAddedOptions))

  // dispatch(handleTotalAdded(totalAdded))
  // setTotalAdded(totalAdded);

  // const q = routes.map((route) => route.content);
  // for (let i = 0; i < routes.length; i++) {
  //   const z = q[i].find((a) => a.nestedRoute.includes("Quiz"));
  //   const x = z.nestedRoute;
  //   quizRoute.push(x);
  // }
  //  setQuizRoute(quizRoute);
  // }, [dispatch,added, addedOption,totalAdded,totalAddedOptions]);

  // console.log(added);

  const onSubmit = (e) => {
    e.preventDefault();
    const quizTitle = getValues("quizName");
    const docID = getValues("idNumber");

    const variables = {
      route: "",
      nestedRoute: quizTitle,
      content: added,
      docID: docID,
    };

    dispatch(postQuizzes(variables));
    toast("Quiz Created!");
    setValue("quizName", "");
    setValue("idNumber", "");
    // axios
    //   .post("https://redux-server-53il.onrender.com/doc", variables)
    //   .then((response) => {
    //     if (response) {
    //       toast("Quiz Created!");
    //       setValue("quizName", "");
    //       setValue("idNumber", "");
    //     }
    //   });
  };

  // const a = addedOption.map(a => console.log(a))

  return (
    <div>
      <div className=" p-12 lg:p-24 createRouteSection flex justify-center items-center  navStyle ">
        <div>
          <p className=" text-center text-3xl border-b-4 mb-4">
            Create A new Quiz{" "}
          </p>
          <form action="" className="flex flex-col-reverse lg:flex-row gap-20 items-center">
            <div>
              <label htmlFor="">Quiz Name</label>
              <input
                type="text"
                placeholder="Enter Quiz Name"
                list="quizRoutes"
                className="input input-bordered  w-full my-3 text-black"
                {...register("quizName", {
                  required: { value: true },
                })}
              />
              {/* <datalist id="quizRoutes">
              {quizRoute?.map((r) => (
                <option value={r} />
              ))}
            </datalist> */}
              <br />
              <label className="text-center " htmlFor="">
                ID
              </label>
              <input
                type="number"
                placeholder="Enter id number"
                className="input input-bordered w-full my-3 text-black"
                {...register("idNumber", {
                  required: { value: true },
                })}
              />{" "}
              <br />
              <button
                onClick={onSubmit}
                className="btn button btn-outline mt-2"
              >
                Create Quiz
              </button>
            </div>

            <div className=" pt-2 lg:pt-0">
              <label className="text-center " htmlFor="">
               Question ID
              </label>
              <input
                type="text"
                placeholder="Enter Question No."
                className="input input-bordered  w-full my-3 text-black"
                {...register("questionNo", {
                  required: { value: true },
                })}
              />
              <br />
              <label className="text-center" htmlFor="">
                Question
              </label>
              <input
                type="text"
                placeholder="Enter Question"
                className="input input-bordered  w-full my-3 text-black"
                {...register("question", {
                  required: { value: true },
                })}
              />{" "}
              <br />
              <div className="grid grid-cols-1 gap-2 items-center">
                <div>
                  <label className="text-center" htmlFor="">
                    Option
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your Option"
                    className="input input-bordered  w-full my-3 text-black"
                    {...register("option", {
                      required: { value: true },
                    })}
                  />{" "}
                </div>
                <button
                  className="btn btn-outline button mb-8"
                  onClick={handleAddOptions}
                >
                  Add Options
                </button>
              </div>
              <label className="text-center" htmlFor="">
                Answer
              </label>
              <input
                type="text"
                list="options"
                placeholder="Enter Answer"
                className="input input-bordered  w-full my-3 text-black"
                {...register("answer", {
                  required: { value: true },
                })}
              />{" "}
              <datalist id="options">
              {addedOption?.map((r) => (
                <option value={r} />
              ))}
            </datalist>
              <br />

              <button className="btn btn-outline button" onClick={handleAdd}>
                Add Questions
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddQuiz;
