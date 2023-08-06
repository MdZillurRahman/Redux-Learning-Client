import React, { useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const AddRouteContent = () => {
  const [nestedRoute, setNestedRoute] = useState([])
  const inputRoute = useRef(null);
  const inputNestedRoute = useRef(null);
  const inputContent = useRef(null);

  const { routes } = useSelector((state) => state.routes);
 const [docID, setDocID] = useState();

  // console.log(routes);

  const handleRoutes = (e) => {
    e.preventDefault();
    const route = inputRoute.current.value;
    const remaining = routes.filter((a) => a.title === route);
    setNestedRoute(remaining[0]);
  };
  // console.log(nestedRoute.content);

  const handleNestedRoutes = (e) => {
    e.preventDefault();
    const nested = inputNestedRoute.current.value;

    const iD = nestedRoute?.content?.filter(a => a.nestedRoute === nested);
    setDocID(iD[0].idNumber)
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const route = inputRoute.current.value;
    const nestedRoute = inputNestedRoute.current.value;
    const doc = inputContent.current.value;


    const content = {
      route: route,
      nestedRoute: nestedRoute,
      content: doc,
      docID: docID
    };
    // console.log(content);

    axios.post("https://redux-server-53il.onrender.com/doc", content).then((response) => {
      if (response) {
        alert("Post Created!");
      }
    });
    e.target.reset();
  };

  return (
    <div>
      <div className="createRouteSection py-16 lg:py-32 navStyle flex justify-center items-center ">
        <div>
          <p className="my-2 text-center text-3xl">Add Nested Route Content</p>
          <form className="w-full navStyle " onSubmit={handleSubmit}>
            <label>Route Name</label> <br />
            <input
              onChange={(e) => handleRoutes(e)}
              placeholder="Select Route"
              className="border-2 p-2 text-black rounded mb-3 w-full"
              type="text"
              name="route"
              list="routeName"
              ref={inputRoute}
            />
            <datalist id="routeName">
              {routes?.map((route,index) => (
                <option key={index} value={route.title} />
              ))}
            </datalist>{" "}
            <br />
            <label>Nested Route Name</label> <br />
            <input
            onChange={(e) => handleNestedRoutes(e)}
              placeholder="Select Nested Route"
              className="border-2 p-2 rounded mb-3 w-full text-black "
              type="text"
              name="nestedRoute"
              list="nestedRouteName"
              ref={inputNestedRoute}
            />
            <datalist id="nestedRouteName">
              {nestedRoute?.content?.map((a, index) => (
                <option key={index} value={a.nestedRoute} />
              ))}
            </datalist>{" "}
            <br />
            <label>Type Your Content</label> <br />

            <textarea
              className="w-full h-[300px] border border-white text-black"
              ref={inputContent}
            />
            <div className="flex flex-col">
              <button className="px-4 py-2 btn button btn-outline" >
                <a href="https://play.tailwindcss.com/" target="_blank" rel="noopener noreferrer">
                  Try Out before you submit
                </a>
              </button> <br />
              <button className="btn button btn-outline ">Add Content</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRouteContent;
