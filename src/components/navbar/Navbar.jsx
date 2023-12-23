import { Link, useNavigate } from "react-router-dom";
import Switcher from "../../utilities/Switcher";
import { RiLogoutCircleLine, RiAccountCircleFill } from "react-icons/ri";
import { removeMemberData } from "../../redux/memberSlice";
import { useDispatch } from "react-redux";
import {  useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdSettings } from "react-icons/io";
import { axiosInstance } from "../../hooks/axiosClient";

const Navbar = ({ children }) => {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "ar" : "en";
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  };

  const navigate = useNavigate();
  let dispatch = useDispatch();
  
  const logOut = async () => {
    const response = await axiosInstance
      .post(`/logout`)
      .then((res) => {
        dispatch(removeMemberData());
        localStorage.clear();
        navigate("/");
      })
      .catch(function (error) {
        localStorage.clear();
        navigate("/");
        toast.error(error?.response?.data?.message);
      });
  };

  let member = JSON.parse(localStorage.getItem("member"));


  return (
    <div className="  bg-secondary w-full mx-auto">
      <div className="navbar bg-secondary container mx-auto px-0">
        
        {/* Current Language: {currentLanguage} */}
        <Link to={"/home"} className="navbar-start items-center gap-1">
          <img src="/images/logo.png" className="max-w-[3rem]" alt="" />
          <h2 className="text-white text-md font-semibold ">
          {t("headerTitle")}
            
          </h2>
        </Link>
        <div className="navbar-center text-white flex-none hidden lg:block">
          
        </div>
        <div className="navbar-end text-white">
          <div className="flex justify-center items-center">
            <div className="flex items-center gap-2">
              <h2 className="text-white text-md font-semibold capitalize">
                {member ? member : "Member Profile"}
              </h2>
              <div className="w-10 rounded-full avatar">
                <img
                  src="/images/avatar.png"
                  className=" rounded-full avatar"
                />
              </div>
            </div>

            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar flex flex-col gap-0"
              >
                <IoMdSettings />
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box  text-white w-fit"
              >
                <li className="bg-transparent font-semibold ">
                  <span className="font-semibold flex flex-row justify-center ">
                    <Switcher />
                  </span>
                </li>
                <li className="bg-transparent font-semibold ">
                  <label className="swap">
                    <input type="checkbox" onChange={handleChangeLanguage} />
                    <div className="swap-on">
                      <img
                        src="/images/en.png"
                        className=" w-[1.5rem] h-[1.5rem] rounded-full avatar"
                      />
                    </div>
                    <div className="swap-off">
                      <img
                        src="/images/ar.png"
                        className=" w-[1.5rem] h-[1.5rem] rounded-full avatar"
                      />
                    </div>
                  </label>
                </li>
                <li onClick={logOut}>
                  <span className="font-semibold flex flex-row justify-center ">
                    <RiLogoutCircleLine className="text-[#212529] w-[1.5rem] h-[1.5rem]  " />
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
