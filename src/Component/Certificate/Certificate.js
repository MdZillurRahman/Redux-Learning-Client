import React, { useContext, useEffect, useState } from "react";
import { exportComponentAsPNG } from "react-component-export-image";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase/firebase.init";
import moment from "moment";
import certificate from "../../assets/Certificate/certificate.png";
import { useSelector } from "react-redux";

const Certificate = () => {
  const { isLoading, routes, error } = useSelector((state) => state.routes);
  const [data, setData] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetch(
      `https://redux-server-53il.onrender.com/userAnswer/${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        // console.log(data.length);
      });
  }, [user?.email]);

  const total = () => {
    const z = data.map((a) => a.result);
    let sum = 0;
    z.forEach((element) => {
      sum += parseFloat(element);
    });
    return sum;
  };

  // console.log(user)
  let certificateWrapper = React.createRef();
  const downloadCertificate = (event) => {
    event.preventDefault();
    exportComponentAsPNG(certificateWrapper, {
      fileName: `certificate_${user.displayName}.png`,
      html2CanvasOptions: { backgroundColor: null },
    });
  };

  return (
    <div
      style={{ fontFamily: "Dancing Script" }}
      className="mt-12 mb-6 text-black"
    >
      <div className="overflow-auto touch-auto">
        <div
          id="certificateWrapper"
          ref={certificateWrapper}
          style={{ boxShadow: "2px 2px 9px 6px #999" }}
          className="relative lg:w-[1000px] mx-auto my-6"
        >
          <p
            style={{ left: "50%", transform: "translate(-50%, 0)" }}
            className="certificate absolute top-[130px] lg:top-[360px] text-2xl lg:text-5xl font-extrabold"
          >
            {user?.displayName}
          </p>
          <p
            style={{ left: "50%", transform: "translate(-50%, 0)" }}
            className="text-black absolute top-[165px] text-[15px] lg:top-[450px] lg:text-[25px] font-semibold text-center w-[270px] lg:w-[630px]"
          >
            in brilliantly completing the redux documentations and holding{" "}
            {parseFloat(total().toFixed(2)) / data.length}% marks in the quizzes
          </p>
          <p className="certificate absolute bottom-[10%] left-[18%] lg:left-[20%] text-[10px] lg:text-[22px] font-extrabold">
            {moment().format("LL")}
          </p>
          <p className="certificate absolute bottom-[10%] right-[15%] lg:right-[16%] text-[10px] lg:text-[22px] font-extrabold">
            ConsoleDotConquest
          </p>
          <img src={certificate} alt="Certificate" />
        </div>
      </div>
      {data.length === routes.length ? (
        <button
          className="btn button btn-outline block mx-auto"
          onClick={downloadCertificate}
        >
          Download
        </button>
      ) : (
        <p className="text-center font-bold text-red-500 text-2xl">You have to get at least 40% in all the quizzes to get the certificate.</p>
      )}
    </div>
  );
};

export default Certificate;
