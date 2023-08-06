import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { postRoutes } from "../../../Features/Routes/routesSlice";

const AddNestedRoute = () => {
  const [added, setAdded] = useState([]);
  const [totalAdded, setTotalAdded] = useState([]);
  const { register, getValues, setValue } = useForm();
  const { routes } = useSelector((state) => state.routes);
  const dispatch = useDispatch();

  const totalLength =()=>{
    const z = routes.map(a => a.content.length);
    let sum =0;
    z.forEach((element) => {
      sum += element;
    });
    return sum;
  }
  totalLength();

  useEffect(() => {
    if (added.length !== 0 && totalAdded.indexOf(added) === -1) {
      totalAdded.push(added);
    }

    setTotalAdded(totalAdded);
  }, [totalAdded, added]);

  const handleAdd = (e) => {
    e.preventDefault();
    const nestedRoute = getValues("nestedRoute");
    const pathRoute = getValues("pathName");
    const idNumber = getValues("idNumber");
    setAdded({ nestedRoute: nestedRoute, pathRoute: pathRoute,idNumber:idNumber });
    setValue("nestedRoute", "");
    setValue("pathName", "");
    setValue("idNumber", "");
  };

  // console.log(added);
  // console.log(totalAdded);

  const onSubmit = (e) => {
    e.preventDefault();
    const route = getValues("route");

    const variables = {
      title: route,
      content: totalAdded,
    };

    dispatch(postRoutes(variables));
    toast("Nested Route Created!");
    setValue("route", "");
    setValue("nestedRoute", "");

    // axios.post("https://redux-server-53il.onrender.com/routes", variables).then((response) => {
    //   if (response) {
    //     toast("Nested Route Created!");
    //     setValue("route", "");
    //     setValue("nestedRoute", "");
    //   }
    // });
  };

  return (
    <div>
      <div className="py-16 lg:py-32 px-4 createRouteSection flex justify-center items-center navStyle ">
        <div>
          <p className="my-2 text-center text-3xl ">
            Create A new Nested Route{" "}
          </p>
          <form action="" className="">
            <label htmlFor="">Route Name</label>
            <input
              type="text"
              placeholder="Enter Route Name"
              className="input input-bordered  w-full my-3 text-black"
              {...register("route", {
                required: { value: true },
              })}
            />
            <br />
            <label className="text-center" htmlFor="">
              ID
            </label>
            <input
              type="number"
              value={totalLength() + 1}
              className="input input-bordered w-full my-3 text-black"
              {...register("idNumber", {
                required: { value: true },
              })}
            />{" "}
            <br />
            <label className="text-center" htmlFor="">
              Nested Route Name
            </label>
            <input
              type="text"
              placeholder="Enter Nested Route Name"
              className="input input-bordered  w-full my-3 text-black"
              {...register("nestedRoute", {
                required: { value: true },
              })}
            />{" "}
            <br />
            <label className="text-center" htmlFor="">
              Path Name
            </label>
            <input
              type="text"
              placeholder="Enter Nested path Name"
              className="input input-bordered  w-full my-3 text-black"
              {...register("pathName", {
                required: { value: true },
              })}
            />{" "}
            <div className="flex justify-between">
              <button className="btn btn-outline button " onClick={handleAdd}>
                First ADD
              </button>

              <button onClick={onSubmit} className="btn button btn-outline ">
                Finally Deploy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNestedRoute;
