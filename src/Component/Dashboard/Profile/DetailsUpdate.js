import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import auth from "../../../firebase/firebase.init";
import UserProfile from "../UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { handleReload } from "../../../Features/Boolean/booleanSlice";
import { Outlet } from "react-router-dom";


const DetailsUpdate = () => {
    const { register, handleSubmit } = useForm();

    const [user] = useAuthState(auth);
    const dispatch = useDispatch();

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
                    dispatch(handleReload());
                } else {
                    toast.error("Already Updated!!");
                }
            });
    };
    return (
        <div>
            <input type="checkbox" id="my-modal-6" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <div id="update-profile" className="ml-10 text-black  p-4 rounded-xl my-4">
                        <div className="flex justify-between items-center my-2">
                            <h2 className="text-3xl font-bold">Update Profile</h2>
                            <div class="modal-action">
                                <label for="my-modal-6" class="btn">X</label>
                            </div>
                        </div>
                        <hr />

                        <form
                            className="flex flex-col justify-center"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="">
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

                            <div className="">
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

                            <div className="">
                                <div className="form-control w-full max-w-xs modal-action">
                                    <label className="label">
                                        <span>LinkedIn</span>
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="url"
                                        className="input input-bordered w-full max-w-xs"
                                        {...register("profileLink", { required: true })}
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-sm px-4 py-2 mt-2 hover:text-white"
                                    >
                                        Update
                                    </button>
                                </div>

                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DetailsUpdate;