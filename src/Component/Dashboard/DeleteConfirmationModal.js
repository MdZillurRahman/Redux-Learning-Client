import React from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../Features/Users/usersSlice";
import auth from "./../../firebase/firebase.init.js"


const DeleteConfirmationModal = ({ deletingUser, setDeletingUser }) => {
  const dispatch = useDispatch();

  const removeUser = (email) => {
    fetch(`https://redux-server-53il.onrender.com/users/${email}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        // 'authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          setDeletingUser(null);
          dispatch(fetchUsers());
          toast("User Removed!!");
        }
      });

  };

  return (
    <div>
      <input
        type="checkbox"
        id="delete-confirm-modal"
        className="modal-toggle "
      />
      <div className="modal modal-bottom sm:modal-middle ">
        <div className="modal-box bg-gray-400">
          <h3 className="font-bold text-lg text-red-500">Are You Sure?</h3>
          <p className="py-4">You want to delete {deletingUser.email} </p>
          <div className="modal-action">
            <button
              onClick={() => removeUser(deletingUser.email)}
              className="btn btn-xs"
            >
              OK
            </button>
            <label htmlFor="delete-confirm-modal" className="btn btn-xs">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
