import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../../firebase/firebase.init';
import { toast } from 'react-toastify';

const ExperienceUpdate = () => {
    const [user] = useAuthState(auth)
    const email = user?.email;

    const handleEducationUpdate = e => {
        e.preventDefault();
        const experience1 = e.target.experience1.value;
        const description1 = e.target.description1.value;
        const time1 = e.target.time1.value;
        const experience2 = e.target.experience2.value;
        const description2 = e.target.description2.value;
        const time2 = e.target.time2.value;
        const experience3 = e.target.experience3.value;
        const description3 = e.target.description3.value;
        const time3 = e.target.time3.value;
        const data = { experience1, description1, time1, experience2, description2, time2, experience3, description3, time3 };

        fetch(`https://redux-server-53il.onrender.com/experience/${email}`, {
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



        console.log(data);

    }
    return (
        <div>
            <input type="checkbox" id="experience-update" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box">
                    <div class="modal-action">
                        <label for="experience-update" class="btn">X</label>
                    </div>

                    <form onSubmit={handleEducationUpdate} className="mt-12">

                        {/* university------------------------ */}
                        <h3 className="text-center font-bold text-xl">Experience 1 </h3>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Position</span>
                            </label>
                            <input name='experience1' type="text" placeholder="Position" class="input input-bordered" />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Description</span>
                            </label>
                            <input name='description1' type="text" placeholder="Description" class="input input-bordered" />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Time</span>
                            </label>
                            <input name='time1' type="text" placeholder="Time" class="input input-bordered" />
                        </div>
                        {/* college-------------------------------- */}
                        <h3 className="text-center font-bold text-xl">Experience 2 </h3>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Position</span>
                            </label>
                            <input name='experience2' type="text" placeholder="Position" class="input input-bordered" />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Description</span>
                            </label>
                            <input name='description2' type="text" placeholder="Description" class="input input-bordered" />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Time</span>
                            </label>
                            <input name='time2' type="text" placeholder="Time" class="input input-bordered" />
                        </div>
                        {/* high school---------- */}
                        <h3 className="text-center font-bold text-xl">Experience 3</h3>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Position</span>
                            </label>
                            <input name='experience3' type="text" placeholder="Position" class="input input-bordered" />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Description</span>
                            </label>
                            <input name='description3' type="text" placeholder="Description" class="input input-bordered" />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Time</span>
                            </label>
                            <input name='time3' type="text" placeholder="Time" class="input input-bordered" />
                        </div>
                        <div class="form-control mt-6">
                            <input className='btn ' type="submit" value="Save" />
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default ExperienceUpdate;