import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase/firebase.init";
import logo from "../../assets/Logo/redux-logo.png";
import { GiFireGem } from "react-icons/gi";
import useAdmin from "../../Hooks/UseAdmin";
import { useDispatch, useSelector } from "react-redux";
import  { fetchUsers } from "../../Features/Users/usersSlice";
import {
  handleIsBg,
  handleIsTrue,
  handleReset,
} from "../../Features/Boolean/booleanSlice";

const Navbar = ({ themeToggler, theme }) => {
  const [user] = useAuthState(auth);

  const [admin] = useAdmin(user);

  const { isLoading, users } = useSelector((state) => state.users);
  const { isTrue } = useSelector((state) => state.boolean);
  const { routes } = useSelector((state) => state.routes);
  const [blog, setBlog] = useState('');
  const [isFalse, setIsFalse] = useState(true);
  const q = routes.map((route) => route.content);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    fetch(`https://redux-server-53il.onrender.com/progress/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        for (let i = 0; i < routes.length; i++) {
          const q1 = q[i];
          for (let j = 0; j < q1.length; j++) {
            const q2 = q1[j];
            // console.log(q2);
            if (q2.pathRoute === data?.blog) {
              setBlog(q2.pathRoute);
            }
          }
          setIsFalse(!isFalse);
        }
      });
  }, [dispatch, isFalse]);

  // console.log(blog);


  // showing method for user name character in nav bar
  const name = user?.email;
  var shortName;
  if (name) {
    shortName = name.substr(0, 2).toUpperCase();
  }

  // sign out
  const handleSignOut = () => {
    signOut(auth);
  };

  const handleBg = () => {
    themeToggler();
    dispatch(handleIsBg());
  };

  const handleClass = () => {
    navigate(`/myClasses/${blog}`);
  };

  // console.log(blog);
  const installation = (
    <>
      {admin && (
        <ul className="flex flex-col text-lg">
          <li>
            <Link to="/dashboard/profile">Profile</Link>
          </li>
          <li>
            <Link to="/dashboard/users">All Users</Link>
          </li>
          <li>
            <Link to="/dashboard/inputData">Input Data</Link>
          </li>
          <li>
            <Link to="/dashboard/manageData">Manage Data</Link>
          </li>

          <li>
            <Link to="/dashboard/addQuiz">Add Quiz</Link>
          </li>
        </ul>
      )}

      {!admin && (
        <ul className="flex flex-col text-lg">
          <li>
            <Link to="/dashboard/profile">Profile</Link>
          </li>
          <li>
            <Link to="/dashboard/analysis">Analysis</Link>
          </li>
          <li>
            <Link to="/dashboard/review">Add a Review</Link>
          </li>
          <li>
            <Link to="/dashboard/certificate">Get Certified</Link>
          </li>
          <li>
            <Link to="/dashboard/adminPanel">Credits</Link>
          </li>
        </ul>
      )}
    </>
  );

  const menuItems = (
    <>
      <li>
        <Link to="/home" className="hover:bg-green-100 hover:text-black">
          Home
        </Link>
      </li>
      {!user && (
        <li>
          {/* <label  className="modal-button modal-open" htmlFor="my-modal"> */}
          <Link
            to="/gettingStarted"
            onClick={() => dispatch(handleIsTrue())}
            className=" modal-button modal-open hover:bg-green-100 hover:text-black"
          >
            Getting Started
          </Link>
          {/* </label> */}
          {/*
          <Link to="/tutorial" className="hover:bg-green-100 hover:text-black">
            Tutorial
          </Link> */}
        </li>
      )}
      {/* <li><Link to="/api" className='hover:bg-green-100 hover:text-black'>API</Link></li>
        <li><Link to="/needHelp" className='hover:bg-green-100 hover:text-black'>Need Help</Link></li> */}

      {user && (
        <li>
          <button
            onClick={handleClass}
            // to={`/myClasses/${blog}`}
            className="hover:bg-green-100 hover:text-black"
          >
            My Classes
          </button>
          <Link to="/dashboard" className="hover:bg-green-100 hover:text-black hidden lg:block">
            Dashboard
          </Link>

          <div className="dropdown block lg:hidden">
            <div className="collapse collapse-arrow">
              <input type="checkbox" />
              <div className="collapse-title">
                <Link
                  to="/dashboard"
                  className="hover:bg-green-100 hover:text-black"
                >
                  Dashboard
                </Link>
              </div>
              <div className="collapse-content pl-2">
                <ul className="leading-2">{installation}</ul>
              </div>
            </div>
          </div>

          <Link to="/forum" className="hover:bg-green-100 hover:text-black">
            Forum
          </Link>
        </li>
      )}

      {!user && (
        <li>
          <Link to="/login" className="hover:bg-green-100 hover:text-black">
            Login
          </Link>
        </li>
      )}
      <li>
        <Link to="/contactUs" className="hover:bg-green-100 hover:text-black">
          Contact Us
        </Link>
      </li>
      {user && (
        <button className="lg:hidden" onClick={handleSignOut}>
          Logout &#10162;
        </button>
      )}
    </>
  );

  const dropdownData = (
    <>
      <div className="collapse collapse-arrow">
        <input type="checkbox" />
        <div className="collapse-title  font-medium ">
          <Link to="/gettingStarted">Getting Started</Link>
        </div>
        <div className="collapse-content pl-10">
          <li>
            <Link to="/gettingStarted">Getting Started with Redux</Link>
          </li>
          {/* <li>
            <Link to="/gettingStarted/installation">Installation</Link>
          </li> */}
          <li>
            <Link to="/gettingStarted/whyReduxToolkit">Why Redux toolkit</Link>
          </li>
          <li>
            <Link to="/gettingStarted/coreConcept">Core Concept</Link>
          </li>

          <li>
            <Link to="/gettingStarted/example">Example</Link>
          </li>
        </div>
      </div>
      <div className="collapse collapse-arrow">
        <input type="checkbox" />
        <div className="collapse-title  font-medium ">
          <Link to="/tutorial">Tutorials</Link>
        </div>
        <div className="collapse-content pl-10">
          <p>
            <Link to="/gettingStarted/tutorial">Tutorial Index</Link>
          </p>
          <p>
            <Link to="/gettingStarted/quickStart">Quick Start</Link>
          </p>
          <p>
            <Link to="/gettingStarted/typescriptQuickStart">
              TypeScript Quick start
            </Link>
          </p>
          <p>
            <Link to="/gettingStarted/reduxEssentials">Redux Essentials</Link>
          </p>
          <p>
            <Link to="/gettingStarted/videos">Videos</Link>
          </p>
        </div>
      </div>
      <div>
        {/* <div className="collapse-title  font-medium ">
          <Link to="/usingRedux">Using redux</Link>
        </div> */}
      </div>
      <div>
        <Link className="collapse-title font-medium" to="/login">
          Login
        </Link>
      </div>
    </>
  );

  return (
    <div className="fixed top-0 z-50 navStyle navbar text-white lg:px-4">
      <div className="navbar-start">
        <div className="dropdown navStyle">
          <label tabIndex="0" className="btn btn-ghost md:hidden lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="-ml-5 menu menu-compact dropdown-content p-2 shadow navStyle  rounded-box w-60"
          >
            {isTrue ? dropdownData : menuItems}
          </ul>
        </div>

        <Link
          to="/"
          onClick={() => dispatch(handleReset())}
          className=" normal-case text-xl font-bold "
        >
          <img
            className="mx-12 md:mx-1 lg:mx-6 md:w-40 lg:w-56 lg:h-16"
            src={logo}
            alt=""
          />
        </Link>
      </div>
      <div className="navbar-center hidden md:block lg:flex">
        <ul className="menu menu-horizontal p-0 text-xl">{menuItems}</ul>
      </div>

      <div className="navbar-end items-center">
        {user && !admin && (
          <div className="hidden lg:flex justify-between items-center  bg-[#34495e] w-20 px-2 py-2 rounded-xl mx-8">
            <div>
              <GiFireGem className="text-4xl " />
            </div>
            <div>
              {/* <p className="text-xl font-bold">10</p> */}
              {users?.map(
                (u, index) =>
                  u.email === user.email && (
                    <p className="text-xl font-bold" key={index}>
                      {u.gem}
                    </p>
                  )
              )}
            </div>
          </div>
        )}

        {/* <label className="swap swap-rotate pl-4"> */}
        <div className="cursor-pointer  " onClick={handleBg}>
          {theme === "light" ? (
            <svg
              className="swap-on fill-current w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
          ) : (
            <svg
              className="swap-off fill-current w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          )}
        </div>
        {/* </label> */}

        {user && (
          <div className="dropdown dropdown-end hidden lg:block">
            <label
              tabIndex="0"
              className="avatar placeholder ml-4 cursor-pointer"
            >
              <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                <span className="text-xl text-white font-medium">
                  {shortName}
                </span>
              </div>
            </label>

            <ul
              tabIndex="0"
              className="dropdown-content menu p-2 shadow bg-slate-700 rounded-box w-52"
            >
              <li>
                <button onClick={handleSignOut}>Logout &#10162;</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
