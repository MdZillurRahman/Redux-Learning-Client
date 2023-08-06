import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import auth from "../../../firebase/firebase.init";
import UserProfile from "../UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { handleReload } from "../../../Features/Boolean/booleanSlice";

const Details = () => {
    const { register, handleSubmit } = useForm();
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const [reload, setReload] = useState(false);
  // const { reload } = useSelector((state) => state.boolean);

  const onSubmit = (data) => {
    const url = `https://redux-server-53il.onrender.com/userInfo/${user.email}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.upsertedCount === 1) {
          toast("Updated!!");
          setReload(!reload);
          // dispatch(handleReload());
        } else {
          toast.error("Already Updated!!");
        }
      });
  };
    return (
        <div className=" overflow-y-hidden px-4 py-10 bg-white m-4 ">
      <UserProfile></UserProfile>
      <div id="update-profile" className="ml-10 navStyle p-4 rounded-xl my-4">
        <div className="flex justify-between mt-2">
          <h2 className="text-3xl font-bold">Update Profile</h2>
        </div>
        <hr />
        <form
          className="flex flex-col justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span>Email</span>
              </label>
              <input
                type="email"
                value={user.email}
                className="input input-bordered w-full max-w-xs"
                {...register("email")}
              />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span>Date of Birth</span>
              </label>
              <input
                type="text"
                placeholder="dd-mm-yy"
                className="input input-bordered w-full max-w-xs"
                {...register("birthDate", { required: true })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span>Address</span>
              </label>
              <textarea
                type=""
                placeholder="Address"
                className="input input-bordered w-full max-w-xs"
                {...register("address", {
                  required: {
                    value: true,
                  },
                })}
              />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span>Phone Number</span>
              </label>
              <input
                type="phone"
                placeholder="Phone Number"
                className="input input-bordered w-full max-w-xs"
                {...register("phone", {
                  required: {
                    value: true,
                  },
                  pattern: {
                    value: /[0-9]/,
                  },
                })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span>LinkedIn</span>
              </label>
              <input
                type="url"
                placeholder="url"
                className="input input-bordered w-full max-w-xs"
                {...register("profileLink", { required: true })}
              />
            </div>
            <button
              type="submit"
              className="btn btn-sm w-full max-w-xs my-8 hover:text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
    );
};

export default Details;