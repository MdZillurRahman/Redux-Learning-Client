import React from 'react';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../../firebase/firebase.init';

const EducationUpdate = () => {
    const [user] = useAuthState(auth)
    const email = user?.email;

    const handleEducationUpdate = (e) => {
        e.preventDefault()
        const university = e.target.university.value;
        const universitySub = e.target.universitySub.value;
        const universityYear = e.target.universityYear.value;
        const college = e.target.college.value;
        const collegeGroup = e.target.collegeGroup.value;
        const collegeYear = e.target.collegeYear.value;
        const school = e.target.school.value;
        const schoolGroup = e.target.schoolGroup.value;
        const schoolYear = e.target.schoolYear.value;

        console.log(university, universitySub, universityYear, college, collegeYear, collegeGroup, schoolGroup, school, schoolYear,);
        const data = { university, universitySub, universityYear, college, collegeYear, collegeGroup, schoolGroup, school, schoolYear }

        fetch(`https://redux-server-53il.onrender.com/education/${email}`, {
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
    }
    return (
        <div>
            <input type="checkbox" id="education-update" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box">
                    <div class="modal-action">
                        <label for="education-update" class="btn">X</label>
                    </div>
                    <div class="card flex-shrink-0 w-full max-w-sm mx-auto bg-base-100">
                        <div class="card-body">
                            <form onSubmit={handleEducationUpdate}>

                                {/* university------------------------ */}
                                <h3 className="text-center font-bold text-xl">University</h3>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">University</span>
                                    </label>
                                    <input name='university' type="text" placeholder="University" class="input input-bordered" />
                                </div>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Graduation Subject</span>
                                    </label>
                                    <input name='universitySub' type="text" placeholder="Graduation Subject" class="input input-bordered" />
                                </div>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Passing Year</span>
                                    </label>
                                    <input name='universityYear' type="text" placeholder="University passing year" class="input input-bordered" />
                                </div>
                                {/* college-------------------------------- */}
                                <h3 className="text-center font-bold text-xl">College </h3>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">College Name</span>
                                    </label>
                                    <input name='college' type="text" placeholder="College Name" class="input input-bordered" />
                                </div>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Group</span>
                                    </label>
                                    <input name='collegeGroup' type="text" placeholder="Group" class="input input-bordered" />
                                </div>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">College Passing Year</span>
                                    </label>
                                    <input name='collegeYear' type="text" placeholder="College passing year" class="input input-bordered" />
                                </div>
                                {/* high school---------- */}
                                <h3 className="text-center font-bold text-xl">High School</h3>

                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">School Name</span>
                                    </label>
                                    <input name='school' type="text" placeholder="School Name" class="input input-bordered" />
                                </div>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Group</span>
                                    </label>
                                    <input name='schoolGroup' type="text" placeholder="School Group" class="input input-bordered" />
                                </div>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">High School Passing Year</span>
                                    </label>
                                    <input name='schoolYear' type="text" placeholder="High School passing year" class="input input-bordered" />
                                </div>
                                <div class="form-control mt-6">
                                    <input className='btn ' type="submit" value="Save" />
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EducationUpdate;