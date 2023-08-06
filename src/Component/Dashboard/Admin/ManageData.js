import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoutes } from "../../../Features/Routes/routesSlice";
import Loading from "../../../Shared/Loading/Loading";

const ManageData = () => {
  const { isLoading, routes } = useSelector((state) => state.routes);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      const url = `https://redux-server-53il.onrender.com/routes/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(fetchRoutes());
        });
    }
  };

  return (
    <div className="flex justify-center my-12">
      <table className="border-2 lg:m-8 w-[80%] lg:w-[50%] bg-gray-400">
        <thead className="bg-gray-200">
          <th className="text-center text-2xl text-black">Routes</th>
          <th className="text-center text-2xl text-black">Delete</th>
        </thead>
        <tbody>
          {isLoading && <Loading />}
          {routes.map((a) => (
            <tr>
              <td className="text-white p-4 font-semibold ">{a.title}</td>
              <td>
                <button
                  onClick={() => handleDelete(a._id)}
                  className="btn btn-outline button m-4 lg:m-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageData;
