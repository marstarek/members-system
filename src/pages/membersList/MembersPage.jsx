
import { useState } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { BsPlusCircle } from "react-icons/bs";
import { InputText } from 'primereact/inputtext';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../utilities/Loading';
import Modal from '../../utilities/Modal';
import DeleteForm from '../../components/forms/DeleteForm';
import Table from '../../components/table/Table';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


const MembersPage = () => {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  const [members, setMembers] = useState([]);
  let [selected, setSelected] = useState(null);
  let [isDelOpen, setIsDelOpen] = useState(false);
  function closeDelModal() {
    setIsDelOpen(false);
  }



  function openDelModal(rowData) {
    setIsDelOpen(true);
    setSelected(rowData.id)
  }

  const avatarTemp = (rowData,options) => {
        return <div className="avatar">
        <div className="w-12 mask mask-squircle">
          <img src={`${rowData.avatar}`} />
        </div>
      </div> 
  };

  const fetchMembers = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACK_END_URL}/members`);
    setMembers(res.data)
   
    return res.data
  }
  const { isPending, isError, error, data, isFetching, isPreviousData, refetch } = useQuery({
    queryKey: [`members-${members}`, members],
    queryFn: () => fetchMembers(),
     retry: false,
  })
 
  const cols = [
    { field: 'id', header: 'id', body: '' },
    { header: "avatar", field: 'avatar', body: avatarTemp },
    { field: 'name', header: 'name', body: '' },
    { field: 'email', header: 'email', body: '' },
    { header: "membership type", field: 'membership_type', body: '' },
    { header: "membership start date", field: 'memb_start_date', body: '' },
    { header: "Phone", field: 'phone', body: '' }
  ];
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    membership_type: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    Memb_start_date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    phone: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
  });
  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
  };
  const renderHeader = () => {
    const value = filters['global'] ? filters['global'].value : '';
    return (
    
      <div className="flex justify-between my-3 flex-col items-center gap-2 ">
        <div className='w-2/3'>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-accent sr-only ">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-accent " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e)} className="block w-full p-4 pl-10 text-sm text-accent  border-1  bg-transparent focus:none border-solid border-2 rounded-[3rem] border-[#A1A1A1]" placeholder="Search By name, email, membership type,id, Membership date, phone number" />
          </div>
        </div>
        <div className="flex justify-start ">
          <Link to={'/home/new-member'}>
          <button className='btn border-0 text-white select-none rounded-xl  bg-neutral  lg:w-40 md:w-30  hover:bg-neutral rounded-[3rem]' 
            > {t("addmember")}
              
              </button></Link>
        </div>

      </div>

    );
  };
  return (
      <>
    <div className=' mx-auto'>
      
      {renderHeader()}
      <div className="card">
        {isError ? <span> Error{error.message}</span> : isPending ? <Loading ></Loading> :
          <Table cols={cols} data={data} filters={filters} openDelModal={openDelModal}   ></Table>
        }
      </div>
      <Modal isOpen={isDelOpen} closeModal={closeDelModal} title='Delete!' >
        <DeleteForm isOpen={isDelOpen} closeModal={closeDelModal} setIsOpen={setIsDelOpen} refetch={refetch} selected={selected}  />
      </Modal>





      </div></>
  )
}

export default MembersPage