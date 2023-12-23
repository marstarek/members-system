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
      <ToastContainer position="top-center"
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
          <p className="mb-4 text-accent">Are you sure you want to delete this member ?</p>
        <div className="flex justify-center items-center space-x-4">
            <button data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border  hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 border-[#A1A1A1] dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={closeModal}>
            No, cancel
          </button>
          <button type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
            Yes, I'm sure
          </button>
        </div>
      </div>
    </form>
    </div>
  )
}

export default DeleteForm
