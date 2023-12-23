import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Show = () => {
  const { id } = useParams();
  const [member, setMember] = useState([]);

  const getMember = async () => {
    const res = await axios
      .get(`${import.meta.env.VITE_BACK_END_URL}/members/${id}`)
      .then(function (response) {
        setMember(response.data);
      })
      .catch(function (error) {});

    return res;
  };
  useEffect(() => {
    getMember();
  }, []);

  return (
    <div className=" md:mx-auto rounded  w-full overflow-hidden my-6 mx-auto flex justify-center">
      <div className="w-2/3 rounded shadow-xl overflow-hidden my-6 mx-auto  ">
        <div className="h-[140px] bg-gradient-to-r to-base-200 from-primary"></div>
        <div className="px-5 py-2 flex flex-col gap-5 pb-6 dark:bg-secondary ">
          <div className="w-full flex justify-center items-center">
          <div className="avatar indicator  ">
            <div className="h-[10rem] shadow-md w-[10rem] rounded-full border-4 overflow-hidden -mt-20  ">
              <img
                src="/images/avatar.png"
                className="w-full h-full rounded-full object-center object-cover"
              />
            </div>
          </div>
          </div>
         

          <div className="">
            <h3 className="text-xl text-accent  relative font-bold leading-6 uppercase">
              {member?.name}
            </h3>
          </div>

          <div className="flex gap-3 flex-col">
            
            <div className="mb-8 md:mb-0 w-fit p-3 text-xl shadow-md rounded-md flex  justify-center items-center text-primary ">
            Email: <span className=" rounded-md    text-accent ">
                {member?.email}
              </span>
            </div>
            <div className="mb-8 w-fit md:mb-0 p-3 text-xl shadow-md rounded-md flex  justify-center items-center text-primary"> ID:
              <span className=" rounded-md    text-accent ">
               {member?.id}
              </span>
            </div>

            <div className="mb-8 w-fit md:mb-0 p-3 text-xl shadow-md rounded-md flex  justify-center items-center text-primary"> Phone: 
              <span className=" rounded-md    text-accent ">
              {member?.phone}
              </span>
            </div>
            <div className="mb-8 w-fit md:mb-0 p-3  text-xl shadow-md rounded-md flex  justify-center items-center text-primary">Membership Type:
              <span className=" rounded-md    text-accent ">
               {member?.membership_type}
              </span>
            </div>
            <div className="mb-8 w-fit md:mb-0 p-3 text-xl shadow-md rounded-md flex  justify-center items-center text-primary">Membership start date:
              <span className=" rounded-md    text-accent ">
               {member?.memb_start_date}
              </span>
            </div>
          </div>

          

          <div className="flex gap-3 flex-wrap w-3/4 "></div>
        </div>
      </div>
    </div>
  );
};

export default Show;
