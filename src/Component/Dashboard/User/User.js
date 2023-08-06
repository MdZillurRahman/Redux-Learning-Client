import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../../firebase/firebase.init";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../Features/Users/usersSlice";

const User = ({ u, index, setDeletingUser }) => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  const email = {
    email: user?.email,
  };

  const makeAdmin = () => {
    fetch(`https://redux-server-53il.onrender.com/users/admin/${u.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        // 'authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(email),
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error("failed to make an admin");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast("Admin Selected!!");
        }
      });
      dispatch(fetchUsers());
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <td >{u.email}</td>
      <td>
        {u.role !== "admin" && (
          <button onClick={makeAdmin} className="btn btn-xs">
            Make Admin
          </button>
        )}
      </td>
      <td>
        <label
          onClick={() => setDeletingUser(u)}
          htmlFor="delete-confirm-modal"
          className="btn btn-xs modal-button"
        >
          Remove User
        </label>
      </td>
    </tr>
  );
};

export default User;
