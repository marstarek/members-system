import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'


export default function Modal({ children, isOpen, closeModal, setIsOpen, openModal, refetch ,title}) {

    return (
        <>


            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10 bg-base-300" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-base-300 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h1"
                                        className="text-3xl font-bold text-center text-accent py-3 uppercase"
                                    >
                                        {title}

                                    </Dialog.Title>

                                    <div className="risk_form w-full">
                                        <div className="flex row">

                                            <div className="flex w-full  flex-wrap justify-center items-center text-center ">

                                                {children}
                                            </div>


                                        </div>




                                    </div>

                                    <button type="button" className="absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-full" onClick={closeModal}>
                                        <span className="text-gl font-semibold text-white">x</span>
                                    </button>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
