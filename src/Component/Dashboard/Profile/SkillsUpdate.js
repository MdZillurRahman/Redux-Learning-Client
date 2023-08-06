import React, { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase/firebase.init";
import { toast } from "react-toastify";

const SkillsUpdate = () => {
  const [user] = useAuthState(auth);
  const email = user?.email;
  const htmlRef = useRef(null);
  const cssRef = useRef(null);
  const jsRef = useRef(null);
  const tailwindRef = useRef(null);
  const reduxRef = useRef(null);
  const nextJsRef = useRef(null);
  const bootstrapRef = useRef(null);
  const daisyRef = useRef(null);

  const handleSkillsSubmit = (e) => {
    e.preventDefault();
    const html = htmlRef.current.value;
    const css = cssRef.current.value;
    const js = jsRef.current.value;
    const tailwind = tailwindRef.current.value;
    const redux = reduxRef.current.value;
    const nextjs = nextJsRef.current.value;
    const daisy = daisyRef.current.value;
    const bs = bootstrapRef.current.value;

    console.log(html, css, js, tailwind, redux, nextjs, bs, daisy);
    const data = { html, css, js, tailwind, redux, nextjs, bs, daisy, email };

    // fetch(`https://redux-server-53il.onrender.com/skills/${email}`)

    fetch(`https://redux-server-53il.onrender.com/skills/${email}`, {
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
        } else {
          toast.error("Already Updated!!");
        }
      });
    window.scrollTo(0, 0);
  };

  const option = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"];
  return (
    <div className="z-50">
      <input type="checkbox" id="skill-update" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box">
          <div class="modal-action">
            <label for="skill-update" class="btn">
              X
            </label>
          </div>
          <div class="card flex-shrink-0 w-full max-w-sm mx-auto bg-base-100">
            <div class="card-body">
              <form onSubmit={handleSkillsSubmit}>
                <div class="form-control">
                  <label for="html ">Html (Out of 100)</label>

                  <select
                    name="html"
                    className="select select-bordered"
                    id="html"
                  >
                    {option.map((a) => (
                      <option value={a}>{a}</option>
                    ))}
                  </select>
                </div>
                <div class="form-control">
                  <label for="css ">CSS</label>

                  <select
                    name="css"
                    className="select select-bordered"
                    id="css"
                  >
                    {option.map((a) => (
                      <option value={a}>{a}</option>
                    ))}
                  </select>
                </div>
                <div class="form-control">
                  <label for="js ">Javascript</label>

                  <select name="js" className="select select-bordered" id="js">
                    {option.map((a) => (
                      <option value={a}>{a}</option>
                    ))}
                  </select>
                </div>
                <div class="form-control">
                  <label for="tailwind ">Tailwind css</label>

                  <select
                    name="tailwind"
                    className="select select-bordered"
                    id="tailwind"
                  >
                    {option.map((a) => (
                      <option value={a}>{a}</option>
                    ))}
                  </select>
                </div>
                <div class="form-control">
                  <label for="redux ">Redux </label>

                  <select
                    name="redux"
                    className="select select-bordered"
                    id="redux"
                  >
                    {option.map((a) => (
                      <option value={a}>{a}</option>
                    ))}
                  </select>
                </div>
                <div class="form-control">
                  <label for="nextjs ">Next js</label>

                  <select
                    name="nextjs"
                    className="select select-bordered"
                    id="nextjs"
                  >
                    {option.map((a) => (
                      <option value={a}>{a}</option>
                    ))}
                  </select>
                </div>
                <div class="form-control">
                  <label for="bs ">Bootstrap</label>

                  <select name="bs" className="select select-bordered" id="bs">
                    {option.map((a) => (
                      <option value={a}>{a}</option>
                    ))}
                  </select>
                </div>
                <div class="form-control">
                  <label for="daisy ">Daisy ui</label>

                  <select
                    name="daisy"
                    className="select select-bordered"
                    id="daisy"
                  >
                    {option.map((a) => (
                      <option value={a}>{a}</option>
                    ))}
                  </select>
                </div>

                <div class="form-control mt-6">
                  <input className="btn" type="submit" value="Save" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsUpdate;
