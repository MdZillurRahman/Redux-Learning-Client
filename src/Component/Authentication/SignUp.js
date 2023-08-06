import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loading from "../../Shared/Loading/Loading";
import registerPic from "../../assets/Register/Welcome.png";
import auth from "../../firebase/firebase.init";
import { useSelector } from "react-redux";
import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { sendEmailVerification } from "firebase/auth";
import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { increment } from "../../Features/GemController/gemSlice";

const SignUp = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [updateProfile, updating, updatingError] = useUpdateProfile(auth);
  const navigate = useNavigate();
  const [sendEmailVerification, sending, error2] =
    useSendEmailVerification(auth);
  const [start, setStart] = useState("");

  const { routes } = useSelector((state) => state.routes);

  useEffect(() => {
    const q = routes.map((route) => route.content);
    const q1 = q[0]?.find((a) => parseInt(a.idNumber) === 1);
    setStart(q1?.pathRoute);
    // console.log(q1);
  }, [routes]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // form submit action
  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    await sendEmailVerification(data.email);
    // console.log(data);

    const currentUser = { email: data.email, role: "", gem: 10 };
    // console.log(currentUser);

    fetch("https://redux-server-53il.onrender.com/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(currentUser),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("data", data.acknowledged);
      });

    const data1 = {
      email: data.email,
      progress: 0,
      blog: start,
      position: 1,
    };

    fetch("https://redux-server-53il.onrender.com/progress", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data1),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("data", data.acknowledged);
      });
  };

  if (loading || updating) {
    return <Loading></Loading>;
  }

  let errorMessage;
  if (error || updatingError) {
    errorMessage = <p className="text-red-500 my-2">{error?.message}</p>;
  }

  if (user) {
    toast.success("account created successfully. verification email sent");
    navigate("/home");
  }

  return (
    <div className="min-h-screen bg-blue-100 pt-32 px-3">
      {/* <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"> */}
      <div className="flex justify-center">
        <div className="hidden md:block lg:block">
          <img className="w-[400px]" src={registerPic} alt="" />
        </div>
        <div className="w-full md:w-80 lg:w-96 navStyle px-2 py-z p-4 lg:px-10 lg:pt-16">
          <h1 className="text-center text-2xl font-bold">Create An Account</h1>
          {errorMessage}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text text-white">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered w-full max-w-xs text-black font-bold"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
              />
              <label className="label">
                {errors.name?.type === "required" && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text text-white">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs font-bold text-black"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Provide a valid Email",
                  },
                })}
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
                {errors.email?.type === "pattern" && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </label>
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text text-white">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs text-black"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Must have 6 characters",
                  },
                })}
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </label>
            </div>
            <input
              className="btn  btn-outline w-full max-w-xs button "
              type="submit"
              value="Sign Up"
            />
          </form>
          <p>
            Already Have An Account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Please Login
            </Link>{" "}
          </p>

          {/* social login process start here
          <div className="divider  text-lg">or</div>
          <SocialLogin></SocialLogin> */}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default SignUp;
