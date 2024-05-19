import React from 'react'
import { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import axios from 'axios'
import {API_URL} from '../../App'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ComplaintList() {

    
    const [data,setData] = useState([])
    const navigate = useNavigate()
    const token = sessionStorage.getItem('token')
      const fetchComplaints = async()=>{
        try {
          let res = await axios.get(`${API_URL}/complaints`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}` 
            }
        })
          setData(res.data.complaint)
        } catch (error) {
          console.log(error);
        }
      } 

      useEffect(()=>{
        fetchComplaints();
      },[])

      const handleEdit=async(row)=>{
        navigate(`/edit-complaint/${row._id}`)
      }

      const handleDelete=async(row)=>{
      try {
        let res = await axios.delete(`${API_URL}/complaints/${row._id}`, {
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

      const columns = useMemo(
        () => [
          {
            accessorKey: 'userName',
            header: 'Name',
            muiTableHeadCellProps: { sx: { color: 'green' } }, 
          },
          {
            accessorKey: 'userPhoneNumber', 
            header: 'Phone Number',
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          {
            accessorKey: 'district', 
            header: 'District',
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          {
            accessorKey: 'city', 
            header: 'City',
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          {
            accessorKey: 'department', 
            header: 'Departmant',
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          {
            accessorKey: 'title', 
            header: 'Complaint',
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          {
            accessorKey: 'status', 
            header: 'Status',
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          {
            accessorFn: (row) => (
              <div>
                <DeleteIcon className="delete-icon" onClick={()=>handleDelete(row)} />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <DriveFileRenameOutlineIcon onClick={()=>handleEdit(row)} className="edit-icon" />
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

export default ComplaintList