import React, { useEffect, useState } from 'react'
import TopBar from '../../../components/TopBar'
import '../app.css'
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
import Navbar from '../../../components/Navbar';

function Contacts() {

  const [data,setData] = useState([])
  const navigate = useNavigate()
  const fetchContactDetails = async()=>{
     let res = await axios.get(`${API_URL}/contacts`)
     setData(res.data.contact);
  }
  useEffect(()=>{
    fetchContactDetails();
  },[data])

  const role = sessionStorage.getItem('role')

  const handleDelete = async(row)=>{
    try {
      let res = await axios.delete(`${API_URL}/contacts/${row._id}`)
      toast.success(res.data.message)
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = async(row)=>{
    try {
      navigate(`/edit-contact/${row._id}`)
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

if (role === "admin") {
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
  <TopBar/>
  <Navbar/>
  <div className="contact-page">
    <p> Your Complete Directory for Rural Development Contacts</p>
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

export default Contacts