import React from 'react'
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DeleteForm = ({ selected,  closeModal,refetch}) => {
  const { register,
    formState: { errors },
    handleSubmit, 
  } = useForm();
  const onSubmit = async (data) => {
    const res = await axios.delete(`${import.meta.env.VITE_BACK_END_URL}/members/${selected}`)
      .then(function (response) {
        closeModal();
        refetch()
      })
      .catch(function (error) {
        console.log(error, "error")

        toast.error(error.message)

      });
  };
  return (
    <div className='w-full'> 
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

    <form onSubmit={handleSubmit(onSubmit)} >
      <div className="relative  text-center text-accent bg-base-300 rounded-lg  sm:p-5">
          <p className="mb-4 text-accent">Are you sure you want to delete?</p>
        <div className="flex justify-center items-center space-x-4">
            <button data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border  border-[#A1A1A1]  " onClick={closeModal}>
            cancel
          </button>
          <button type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg  focus:ring-4 focus:outline-none   ">
            Delete
          </button>
        </div>
      </div>
    </form>
    </div>
  )
}

export default DeleteForm
