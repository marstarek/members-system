import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { AiOutlineStop } from "react-icons/ai";
import { Paginator } from 'primereact/paginator';
import { Link, useNavigate, useRouteError } from "react-router-dom";

export default function Table({ cols,  data,  filters,  openDelModal  }) {
    const navigate = useNavigate()
    const MoveToEdit = (id) => {
        navigate(`/home/edit-member/${id}`)
    }
    const MoveToShow = (id) => {
        navigate(`/home/show-member/${id}`)
    }

    const ActionsTemplate = (rowData, options) => {
        return <>

            <div className="dropdown dropdown-left dropdown-end  ">
                <label tabIndex={0} className="w-8 h-8 flex border-2 justify-center items-center rounded-md cursor-pointer"><BsThreeDotsVertical className='text-black'></BsThreeDotsVertical></label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-[#a3a4a5] rounded-box w-52 text-accent">
                    <li onClick={() => MoveToEdit(rowData.id)} >
                        <Link className='hover:text-black'>
                            Edit
                        </Link>
                    </li>
                    <li onClick={() => MoveToShow(rowData.id)} >
                        <Link className='hover:text-black'>
                            Details
                        </Link>
                    </li>
                    <li onClick={() => openDelModal(rowData)}>
                        <Link className='hover:text-black'>
                            Delete
                        </Link>
                    </li>
                </ul>
            </div>


        </ >
    };
    return (
        <div ><DataTable paginator  rows={30} rowsPerPageOptions={[5, 10, 25, 50]} editMode="row" dataKey="id" className='text-accent  ' stripedRows filters={filters} showGridlines value={data} tableStyle={{ minWidth: '50rem',overflow:"inherit" }} scrollable scrollHeight="600px"  >
                        {cols.map((col, index) => (
                <Column key={index} sortable field={col.field} header={col.header} body={col.body} />
                        ))}
                        <Column header="actions" style={{ flex: '0 0 4rem' }} body={ActionsTemplate}></Column>
                    </DataTable>
                
        

        </div>
    );
}
