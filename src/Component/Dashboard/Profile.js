import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../firebase/firebase.init';
import UserProfile from './UserProfile';

const Profile = () => {
    const { register, handleSubmit } = useForm();
    const [user] = useAuthState(auth);
    const [reload, setReload] = useState(false);

    const onSubmit = data => {
        const url = `http://localhost:5000/userInfo/${user.email}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.upsertedCount === 1) {
                    toast("Updated!!");
                    setReload(!reload);
                }
                else {
                    toast.error("Already Updated!!")
                }

            })
    };


    return (

        <div className=' overflow-y-hidden py-16 bg-white m-4'>
            <UserProfile reload={reload}></UserProfile>
            <div className="px-2  py-2  my-4 mx-2  navStyle">
                <div className="flex justify-between mt-12">
                    <h2 className=" text-3xl py-2  font-bold">Update Profile</h2>
                    {/* <button className="btn btn-sm rounded-none">edit</button> */}
                </div>
                <hr />
                <form className='flex  lg:justify-start md:justify-center justify-center w-80 px-2' onSubmit={handleSubmit(onSubmit)}>
                    <div className='w-full'>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" value={user.email} className="input input-bordered w-full max-w-xs" {...register("email")} />
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Date of Birth</span>
                        </label>
                        <input type="text" placeholder="dd-mm-yy" className="input input-bordered w-full max-w-xs" {...register("birthDate", { required: true })} />
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <input type="" placeholder='Address' className="input input-bordered w-full max-w-xs" {...register("address",
                            {
                                required: {
                                    value: true
                                }
                            }
                        )} />
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input type="phone" placeholder="Phone Number" className="input input-bordered w-full max-w-xs" {...register("phone", {
                            required: {
                                value: true
                            },
                            pattern: {
                                value: /[0-9]/
                            }
                        })} />
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">LinkedIn</span>
                        </label>
                        <input type="url" placeholder="url" className="input input-bordered w-full max-w-xs" {...register("profileLink", { required: true })} />
                    </div>
                    <button type='submit' className="btn  button btn-sm w-full max-w-xs my-8 hover:text-white">Update</button>

                    </div>
                </form>



            </div>
        </div>

    );
};


export default Profile;