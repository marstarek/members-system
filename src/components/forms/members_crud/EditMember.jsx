
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {useParams} from "react-router-dom";
const EditMember = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const [data, setData] = useState(null);
  const [dOB, setDOB] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },setValue,
    control,
  } = useForm({ mode: "onBlur" });
  const onSubmit = async (data) => {
    const res = await axios
      .put(`${import.meta.env.VITE_BACK_END_URL}/members/${id}`,{
        ...data,
        avatar: "/images/avatar.png",
      })
      .then(function (response) {
        navigate('/home')

      })
      .catch(function (error) {});
  };
    const calcDob = (idNumber) => { 
        const birthdateStr = idNumber.slice(0, 7);
        const cen = parseInt(birthdateStr.slice(0, 1)); 
        const year = parseInt(birthdateStr.slice(1, 3)); 
        const month = parseInt(birthdateStr.slice(3, 5)) 
        const day = parseInt(birthdateStr.slice(5, 8));
        console.log( month, day,cen)
        const dob = `19${year}/${month}/${day}`
        setValue('dob', dob)

         setDOB(dob)
        return dob
    }
    const getMember = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACK_END_URL}/members/${id}`)
        .then(function (response) {
          setData(response.data)
          setValue('name', response.data?.name)
          setValue('email', response.data?.email)
          setValue('membership_type', response.data?.membership_type)
          setValue('memb_start_date', response.data?.memb_start_date)
          setValue('phone', response.data?.phone)
          setValue('dob', response.data?.dob)
          setValue('Subscribe', response.data?.Subscribe)
          setValue('id', response.data?.id)
          setValue('Gender', response.data?.Gender)
          setValue('address', response.data?.address)
        console.log(response.data)
      })
      .catch(function (error) {});

      return res
    }
  useEffect(() => {
    getMember()
    }, [])
  return (
    <div className="p-2  rounded-xl  w-full bg-base-300">
      <div className="text-center text-3xl py-3">
        <h1 className="text-secondary">EDIT MEMBER</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="risk_form">
        <div className="flex row flex-wrap">
          <div className="flex w-full  flex-row  flex-wrap  ">
            <div className="form-control border-0 w-full sm:w-full md:w-1/2 lg:w1/2  px-2  py-0  text-start">
              <label className="label p-1  ">
                <span className="label-text text-accent text-sm md:text-md lg:text-md font-semibold">
                  Member Name{" "}
                </span>
              </label>
              <input
                className={`max-h-9  text-accent input input-bordered border-gray-300 rounded-md focus:outline-none   `}
                type="text"
                {...register("name", {
                 
                  pattern: { value: /^[a-zA-Z ]+$/, message: "invalid Name" },
                })}
                aria-invalid={errors.name ? "true" : "false"}
              />
              <ErrorMessage
                errors={errors}
                render={({ message }) => (
                  <p className="text-rose-500 text-sm">{message}</p>
                )}
                name="name"
              />
            </div>
            <div className="form-control border-0 w-full sm:w-full md:w-1/2 lg:w1/2  px-2  py-0  text-start">
              <label className="label p-1  ">
                <span className="label-text text-accent text-sm md:text-md lg:text-md font-semibold">
                  Email
                </span>
              </label>
              <input
                className={`max-h-9  text-accent input input-bordered border-gray-300 rounded-md focus:outline-none ${
                  errors.email ? "text-rose-600" : "null"
                }  `}
                type="email"
                {...register("email", {
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "invalid Email",
                  },
                })}
                aria-invalid={errors.name ? "true" : "false"}
              />
              <ErrorMessage
                render={({ message }) => (
                  <p className="text-rose-500 text-sm">{message}</p>
                )}
                errors={errors}
                name="email"
              />
            </div>
          </div>

    
          <div className="flex w-full  flex-row  flex-wrap ">
            <div className="form-control border-0 w-full sm:w-full md:w-1/2 lg:w1/2  px-2  py-0  text-start">
              <label className="label p-1  ">
                <span className="label-text text-accent text-sm md:text-md lg:text-md font-semibold">
                  Phone number
                </span>
              </label>
              <Controller
                name="phone"
                control={control}
                rules={{
               
                  validate: (value) => isValidPhoneNumber(value),
                }}
                render={({ field: { onChange, value } }) => (
                  <PhoneInput
                    value={value}
                    onChange={onChange}
                    defaultCountry="EG"
                    id="phone"
                    className="max-h-9  text-accent input input-bordered border-gray-300 rounded-md focus:outline-none"
                  />
                )}
              />

              
              {errors.phone && errors.phone.type === "validate" && (
                <p className="text-rose-500 text-sm">invalid phone number</p>
              )}
            </div>
            <div className="form-control border-0 w-full sm:w-full md:w-1/2 lg:w1/2  px-2  py-0  text-start">
              <label className="label p-1  ">
                <span className="label-text text-accent text-sm md:text-md lg:text-md font-semibold">
                  address
                </span>
              </label>
              <input
                className={`max-h-9  text-accent input input-bordered border-gray-300 rounded-md focus:outline-none ${
                  errors.address ? "text-rose-600" : "null"
                }  `}
                type="address"
                {...register("address", {
                })}
                aria-invalid={errors.name ? "true" : "false"}
              />
              <ErrorMessage
                render={({ message }) => (
                  <p className="text-rose-500 text-sm">{message}</p>
                )}
                errors={errors}
                name="address"
              />
            </div>
          </div>

          <div className="flex w-full  flex-row  flex-wrap ">
            <div className="form-control text-start  border-0 w-full sm:w-full md:w-1/2 lg:w1/2  px-2 lg:w-1/2 xl:w-1/2 py-0">
              <label className="label p-1">
                <span className="label-text text-accent text-sm md:text-md lg:text-md font-semibold">
                  Membership Type
                </span>
              </label>
              <select
                className={`text-accent max-h-9  min-h-fit select select-bordered border-gray-300 w-full  rounded-md focus:outline-none `}
                name="membership_type"
                {...register("membership_type", {
                })}
                aria-invalid={errors.membership_type ? "true" : "false"}
                defaultValue={""}
              >
                <option disabled></option>

                <option value="VIP">VIP</option>
                <option value="Premium">Premium</option>
                <option value="Basic">Basic</option>
              </select>
              <ErrorMessage
                render={({ message }) => (
                  <p className="text-rose-500 text-sm">{message}</p>
                )}
                errors={errors}
                name="membership_type"
              />
            </div>
            <div className="form-control border-0 w-full sm:w-full md:w-1/2 lg:w1/2  px-2   py-0  text-start">
              <label className="label p-1  ">
                <span className="label-text text-accent text-sm md:text-md lg:text-md font-semibold">
                  Membership Start Date
                </span>
              </label>
              <input
                className={`max-h-9  text-accent input input-bordered border-gray-300 rounded-md focus:outline-none   `}
                type="date"
                {...register("memb_start_date", {
                })}
              />
              <ErrorMessage
                errors={errors}
                render={({ message }) => (
                  <p className="text-rose-500 text-sm">{message}</p>
                )}
                name="memb_start_date"
              />
            </div>
          </div>
          <div className="flex w-full  flex-row  flex-wrap ">
           
            <div className="form-control border-0 w-full sm:w-full md:w-1/2 lg:w1/2  px-2   py-0  text-start">
              <label className="label p-1  ">
                <span className="label-text text-accent text-sm md:text-md lg:text-md font-semibold">
                Date of Birth 
                </span>
              </label>
              <input
                className={'max-h-9  text-black input input-bordered border-gray-300 rounded-md focus:outline-none opacity-70 pointer-events-none  cursor-not-allowed '} defaultValue={dOB}
                type="text"
                {...register("dob", {
                })}
              />
              <ErrorMessage
                errors={errors}
                render={({ message }) => (
                  <p className="text-rose-500 text-sm">{message}</p>
                )}
                name="dob"
              />
                      </div>
            <div className="form-control border-0 w-full sm:w-full md:w-1/2 lg:w1/2  px-2   py-0  text-start">
              <label className="label p-1  ">
                <span className="label-text text-accent text-sm md:text-md lg:text-md font-semibold">
                  Id
                </span>
              </label>
              <input
                className={`max-h-9  text-accent input input-bordered border-gray-300 rounded-md focus:outline-none   `}
                type="text"
                {...register("id", {
                  minLength: { value: 14, message: "id must be 14 digits " }, maxLength: { value: 14, message: "id must be 14 digits " }, pattern: {
                    value: /(2|3)[0-9][1-9][0-1][1-9][0-3][1-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d\d\d\d\d/, message: "invalid id number "
                    },
                    validate:(value)=>{calcDob(value)}
                })}
              />
              <ErrorMessage
                errors={errors}
                render={({ message }) => (
                  <p className="text-rose-500 text-sm">{message}</p>
                )}
                name="id"
              />
                      </div>















                
          </div>
          <div className="flex w-full  flex-row  flex-wrap ">
          <div className="form-control text-start  border-0 w-full sm:w-full md:w-1/2 lg:w1/2  px-2 lg:w-1/2 xl:w-1/2 py-0">
              <label className="label p-1  ">
                <span className="label-text text-accent text-sm md:text-md lg:text-md font-semibold">
                  Gender
                </span>
              </label>
              <div className="flex w-full  flex-row  flex-wrap gap-2 ">
                <label className="label cursor-pointer">
                  <span className="label-text pe-2 text-accent">Male</span>
                  <input
                    type="radio"
                    name="Gender"
                    value="Male"
                    className="radio radio-primary"
                    {...register("Gender", {
             
                    })}
                  />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text pe-2 text-accent">Female</span>
                  <input
                    type="radio"
                    name="Gender"
                    value="Female"
                    className="radio radio-primary"
                    {...register("Gender", {
             
                    })}
                  />{" "}
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text pe-2 text-accent">Other</span>
                  <input
                    type="radio"
                    name="Gender"
                    value="Other"
                    className="radio radio-primary"
                    {...register("Gender", {
            
                    })}
                  />{" "}
                </label>
              </div>
            </div>
            <div className="form-control text-start  border-0 w-full sm:w-full md:w-1/2 lg:w1/2  px-2 lg:w-1/2 xl:w-1/2 py-0 flex-row items-center">
              <label className="label p-1">
                <span className="label-text text-accent text-sm md:text-md lg:text-md font-semibold">
                  Subscribe to Newsletter{" "}
                </span>
              </label>
              <input
                type="checkbox"
                className={" checkbox checkbox-primary   "}
                name="Subscribe"
                {...register("Subscribe")}
              />

              <ErrorMessage
                render={({ message }) => (
                  <p className="text-rose-500 text-sm">{message}</p>
                )}
                errors={errors}
                name="Subscribe"
              />
            </div>
          </div>
                  









        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="border-0 text-white select-none   bg-secondary rounded-md lg:w-40 md:w-30  hover:bg-neutral transition duration-500  btn   py-0 text-sm md:text-md lg:text-md justify-center content-center"
          >
            edit Member
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMember;
