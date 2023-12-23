
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { ErrorMessage } from '@hookform/error-message';

import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../hooks/axiosClient";
import { SetMemberData, setAuth, setAppTheme, setToken } from "../../redux/memberSlice";
const LoginForm = () => {
    const theme = localStorage.getItem('theme');
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { register,
        formState: { errors },
        handleSubmit,
    } = useForm({ mode: "all" });


    const onSubmit = async (data) => {
        const res = await axiosInstance.post('/auth/login', data).then((res) => {
            dispatch(SetMemberData(res.data.member));
            dispatch(setToken(res.data.access_token));
            dispatch(setAuth(true));
            localStorage.setItem('token', JSON.stringify(res.data.access_token))
            localStorage.setItem('member', JSON.stringify(data.email))
            navigate("/home")
        }
        )
            .catch(function (error) {
                console.log(error)
                toast.error(error?.response?.data?.message)
            });

    };

    useEffect(() => {

    }, [])
    const memberState = useSelector((state) => state.member)

    return (
        <div className="  flex-shrink-0 w-full max-w-3xl  border-0">
            <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />

            <div className="">

                <form onSubmit={handleSubmit(onSubmit)} className="risk_form">
                    <div className="flex row text-accent">
                        <div className="flex w-full  flex-wrap  ">

                             <div className="form-control border-0 w-full sm:w-full md:w-full  py-0  text-start">
                            <label className="label p-1  ">
                                <span className="label-text text-accent text-sm md:text-md lg:text-md font-semibold">Email</span>
                            </label>
                            <input className={`max-h-15  text-accent input input-bordered border-gray-300 rounded-md focus:outline-none ${errors.email ? "text-rose-600" : "null"}  `}
                                type="email"
                                {...register("email", {
                                    required: "Email is required", pattern: {
                                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                        message: "invalid Email"
                                    }
                                })} aria-invalid={errors.name ? "true" : "false"}
                            />
                            <ErrorMessage render={({ message }) => <p className='text-rose-500 text-sm'>{message}</p>} errors={errors} name="email" />

                        </div>
                            <hr ></hr>
                            <div className="form-control border-0 w-full sm:w-full md:w-full  py-0  text-start">
                            <label className="label p-1  ">
                                <span className="label-text text-accent text-sm md:text-md lg:text-md font-semibold">password</span>
                            </label>
                            <input className={`max-h-15  text-accent input input-bordered border-gray-300 rounded-md focus:outline-none   `}
                                type="password" autoComplete='true'
                                {...register("password", {
                                    required: "Password is required", minLength: { value: 8, message: "Password must have at least 8 characters" },
                                })} aria-invalid={errors.name ? "true" : "false"}
                                /> 
                                
                                {/*  pattern:{value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ ,message:"Invalid Password"} */}
                            <ErrorMessage render={({ message }) => <p className='text-rose-500 text-sm'>{message}</p>} errors={errors} name="password" />

                        </div>
                        </div>


                    </div>




                    <div className="flex justify-center mt-4">

                        <button type="submit" className="bg-primary hover:bg-secondary border-0  text-white transition duration-500  btn   py-0 text-md md:text-lg justify-center content-center ">Login</button>




                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm