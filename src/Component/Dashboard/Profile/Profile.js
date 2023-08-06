import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import auth from "../../../firebase/firebase.init";
import UserProfile from "../UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { handleReload } from "../../../Features/Boolean/booleanSlice";
import { Outlet } from "react-router-dom";
import DetailsUpdate from "./DetailsUpdate";

const Profile = () => {
  const { register, handleSubmit } = useForm();
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  // const [user] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState([]);
  const [reload, setReload] = useState(false);
  // const { reload } = useSelector((state) => state.boolean);

  useEffect(() => {
    fetch(`https://redux-server-53il.onrender.com/userInfo/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
        setReload(!reload);
      });
  }, [user, reload]);

  // console.log(reload);

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
    <div className=" overflow-y-hidden lg:px-4 navStyle lg:m-4 rounded-xl">
      <div className="card card-compact lg:w-100 lg:ml-10 my-4 ">
        <div>
          <div className="flex justify-between">
            <h2 className="text-2xl lg:text-3xl font-bold">Details</h2>
            <label for="my-modal-6" class="btn modal-button mr-2">
              Edit
            </label>
          </div>
          <hr />

          <DetailsUpdate />

          {/* TABLE */}
          <table class="w-[100%] lg:w-[40%]">
            <tbody>
              <tr className="py-4">
                <td class=" text-xl font-normal">Name : </td>
                <td class=" text-xl font-normal">
                  {user.displayName ? user.displayName : "N/A"}
                </td>
              </tr>
              <tr className="py-4">
                <td class=" text-xl font-normal">Email : </td>
                <td class=" text-xl font-normal">
                  {user.email ? user.email : "N/A"}
                </td>
              </tr>
              <tr className="py-4">
                <td class=" text-xl font-normal">Date of Birth : </td>
                <td class=" text-xl font-normal">
                  {userInfo.birthDate ? userInfo.birthDate : "N/A"}
                </td>
              </tr>
              <tr className="py-4">
                <td class=" text-xl font-normal">Address : </td>
                <td class=" text-xl font-normal">
                  {userInfo.address ? userInfo.address : "N/A"}
                </td>
              </tr>
              <tr className="py-4">
                <td class=" text-xl font-normal">Phone Number : </td>
                <td class=" text-xl font-normal">
                  {userInfo.phone ? userInfo.phone : "N/A"}
                </td>
              </tr>
              <tr className="py-4">
                <td class=" text-xl font-normal">LinkedIn : </td>
                <td class=" text-xl font-normal">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={userInfo.profileLink}
                  >
                    {userInfo.profileLink ? "Visit" : "N/A"}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
