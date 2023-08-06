import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import auth from "../../../firebase/firebase.init";

const Review = () => {
  const { register, handleSubmit, setValue } = useForm();

  const ratingStar = ["1","1.5","2","2.5","3","3.5","4","4.5","5"]

  const [user] = useAuthState(auth);

  const onSubmit = (data) => {
    const url = "https://redux-server-53il.onrender.com/reviews";
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        toast("Review Added");
      });
    setValue(data.comment, "");
    setValue(data.rating, "");
  };

  return (
    <div className="bg-white py-10 text-black navStyle mx-[300px] mt-20">
      <h2 className="text-2xl text-center ">Add A Review</h2>
      <form
        className=" mx-auto w-96 items-center p-4  flex flex-col justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Name</span>
          </label>
          <input
            type="text"
            defaultValue={user.displayName}
            className="input text-black placeholder:text-black input-bordered w-full max-w-xs"
            {...register("name", { required: true, maxLength: 20 })}
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Image URL</span>
          </label>
          <input
            type="url"
            defaultValue={user.photoURL}
            className="input text-black placeholder:text-black input-bordered w-full max-w-xs"
            {...register("picture", { required: true })}
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Ratings</span>
          </label>
          <input
            type=""
            placeholder="Rating"
            className="input text-black placeholder:text-black input-bordered w-full max-w-xs"
            list="ratings"
            {...register("rating", {
              required: {
                value: true,
              },
            })}
          />
          <datalist id="ratings">
              {ratingStar?.map((r) => (
                <option value={r} />
              ))}
            </datalist>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Description</span>
          </label>
          <input
            type="text"
            placeholder="Tool Description"
            className="input text-black placeholder:text-black input-bordered w-full max-w-xs"
            {...register("comment", {
              required: {
                value: true,
              },
            })}
          />
        </div>

        <button type="submit" className="btn btn-outline button  w-24 mt-8">
          Add Review
        </button>
      </form>
    </div>
  );
};

export default Review;
