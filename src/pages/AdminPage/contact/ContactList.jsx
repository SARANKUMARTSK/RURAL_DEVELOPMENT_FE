import React, { useEffect, useState } from 'react'
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import axios from 'axios'
import {API_URL} from '../../../App'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


function ContactList() {

   
  const role = localStorage.getItem('role')
  const token = localStorage.getItem('token')
  const [data,setData] = useState([])
  const navigate = useNavigate()
  const fetchContactDetails = async()=>{
     let res = await axios.get(`${API_URL}/contacts`, {
      headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` 
      }
  })
     setData(res.data.contact);
  }
  useEffect(()=>{
    fetchContactDetails();
  },[data])


  const handleDelete = async(row)=>{
    try {
      let res = await axios.delete(`${API_URL}/contacts/${row._id}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
        }
    })
      toast.success(res.data.message)
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = async(row)=>{
    try {
      navigate(`/dashboard/edit-contact/${row._id}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
        }
    })
    } catch (error) {
      console.log(error);
    }
  }
  
let columns = [
  {
    accessorKey: 'name',
    header: 'Name',
    size: 150,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 150,
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
    size: 200,
  },
  {
    accessorKey: 'fax',
    header: 'Fax',
    size: 150,
  },
  {
    accessorKey: 'position',
    header: 'Position',
    size: 150,
  },
  {
    accessorKey: 'city',
    header: 'City',
    size: 150,
  },
  {
    accessorKey: 'district',
    header: 'District',
    size: 150,
  },
];

if (role === "Admin") {
  columns.push({
    accessorFn: (row) => (
      <div>
        <DeleteIcon className="delete-icon" onClick={()=>handleDelete(row)} />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <DriveFileRenameOutlineIcon onClick={()=>handleEdit(row)} className="edit-icon" />
      </div>
    ),
    header: "Action",
    size: 150,
  });
}

const memoizedColumns = useMemo(() => columns, [role]);


  const table = useMaterialReactTable({
    columns,
    data, 
  });


  return <>
 
  <div className="add-contact-button">
    {
      role==="Admin"&&<button onClick={()=>navigate('/dashboard/add-contact')}>+ Add Contact</button>
    }
  </div>
  
  <div className="contact-page">
  <MaterialReactTable
        columns={columns}
        data={data}
        enableGlobalFilterModes
        enableRowNumbers={true}
        initialState={{
          density: "compact",
          showGlobalFilter: true,
        }}
        muiSearchTextFieldProps={{
          placeholder: `Search ${data.length} rows`,
          sx: { minWidth: "300px" },
          variant: "outlined",
        }}
        muiPaginationProps={{
          showRowsPerPage: true,
          shape: "rounded",
        }}
        paginationDisplayMode="pages"
        defaultColumn={{
          minSize: 20,
          maxSize: 9,
          size: 180,
        }}
      />
  </div>
  </>
}

export default ContactList