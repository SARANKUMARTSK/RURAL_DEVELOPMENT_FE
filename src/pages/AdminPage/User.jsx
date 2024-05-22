import React from 'react'
import { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import axios from 'axios';
import { API_URL } from '../../App';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function User() {


    const [data,setData] = useState([])
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const fetchUserData = async()=>{
      try {
        let res = await axios.get(`${API_URL}/user`, {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}` 
          }
      })
        setData(res.data.user);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
      fetchUserData();
    },[data])


    const handleEdit = async(row)=>{
      navigate(`/dashboard/edit-user/${row._id}`)
    }

   

      const columns = useMemo(
        () => [
          {
            accessorKey: 'name',
            header: 'Name',
            muiTableHeadCellProps: { sx: { color: 'green' } }, 
          },
          {
            accessorKey: 'email', 
            header: 'Email Id',
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          {
            accessorKey: 'phoneNumber', 
            header: 'Phone Number',
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          {
            accessorKey: 'gender', 
            header: 'Gender',
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          {
            accessorKey: 'role', 
            header: 'Role',
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          {
            accessorFn: (row) => (
              <div style={{marginRight:"20px"}} className={  row.status === 'Active' ? "active-button" : 'inActive-button' }>
                 {row.status}
              </div>
            ),
            header: "Status",
            size: 150,
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          {
            accessorKey: 'address.city', 
            header: 'City Name',
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          
          {
            accessorFn: (row) => (
              <div>
                &nbsp;&nbsp;&nbsp;<DriveFileRenameOutlineIcon className="edit-icon" onClick={()=>handleEdit(row)} />
              </div>
            ),
            header: "Action",
            size: 150,
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
        ],
        [],
      );

      

      const table = useMaterialReactTable({
        columns,
        data, 
      });

  return <>
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
  </>
}

export default User