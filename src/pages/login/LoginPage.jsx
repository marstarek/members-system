import LoginForm from "../../components/forms/LoginForm"

const LoginPage = () => {
    return (

        <div className='w-full h-screen flex justify-evenly items-center flex-col bg-base-300 ' >
            <div className=' flex flex-row row-cols-2 justify-center  flex-wrap container items-center' >
                <div className=" p-2  min-w-[20rem]  lg:w-1/2 xl:w-1/2 border-0  flex  lg:border-r-2  xl:border-r-2 lg:flex  xl:flex  justify-center items-center    border-r-blue   ">
                <img src="/images/loginimg.png" className="w-full" />
      
                    </div>
                <div className="p-4 min-w-[20rem] w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 justify-center items-center flex">
                  <LoginForm/>
                </div>



            </div>
        </div>



















    )
}

export default LoginPage
