import React from "react";
import {
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import {FaGithub, FaGoogle } from "react-icons/fa";
import auth from "../../firebase/firebase.init";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const [signInWithGoogle, user, loading, error1] = useSignInWithGoogle(auth);
  const [signInWithGithub, gitUser, gitLoading, gitError] =
    useSignInWithGithub(auth);
  const { isLoading, users, error2 } = useSelector((state) => state.users);
  const location = useLocation();
  const navigate = useNavigate();

  let from = location.state?.from?.pathname || "/";
  // console.log(user?.user?.email);

  if (user || gitUser) {
    navigate(from, { replace: true });
    // const q = users.map((a) => a.email);

    // for (let i = 0; i < users.length; i++) {
    //   console.log(q[i]);
    //   if (q[i].includes(user?.user?.email)) {
    //     navigate("/home");
    //   } else {
    //     const currentUser = { email: user?.user?.email, role: "", gem: 10 };
    //     console.log(currentUser);

    //     fetch("https://redux-server-53il.onrender.com/users", {
    //       method: "POST",
    //       headers: {
    //         "content-type": "application/json",
    //       },
    //       body: JSON.stringify(currentUser),
    //     })
    //       .then((res) => res.json())
    //       .then((data) => {
    //         console.log("data", data.acknowledged);
    //       });

    //     navigate("/home");
    //   }
    // }
  }

  if(user|| gitUser){
    navigate("/home");
  }

  return (
    <div className="form-control grid grid-cols-2 ">
      <button
        onClick={() => signInWithGoogle()}
        className="m-1  text-xl  btn btn-outline  hover:text-white"
      >
        {" "}
        <FaGoogle />{" "}
      </button>
      {/* <button className="m-1 text-xl  btn bg-base-100 text-black hover:text-white"> <FaFacebook /> </button> */}
      <button
        onClick={() => signInWithGithub()}
        className="m-1 text-xl  btn btn-outline button"
      >
        {" "}
        <FaGithub />{" "}
      </button>
    </div>
  );
};

export default SocialLogin;
