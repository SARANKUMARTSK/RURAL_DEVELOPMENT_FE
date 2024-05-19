import React from 'react'
import { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../App';
import toast from 'react-hot-toast';

function WasteList() {

    const navigate = useNavigate()

    const [data,setData] = useState([])
    const token = localStorage.getItem('token')

    const fetchWasteQueries = async()=>{
      try {
        let res = await axios.get(`${API_URL}/waste`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}` 
            }
        })
        setData(res.data.waste)
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
       fetchWasteQueries();
    },[data])


    const handleDelete = async(row)=>{
      try {
        let res = await axios.delete(`${API_URL}/waste/${row._id}`, {
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
      navigate(`/edit-waste/${row._id}`)
    }

      const columns = useMemo(
        () => [
          {
            accessorKey: 'userName',
            header: 'Name',
            muiTableHeadCellProps: { sx: { color: 'green' } }, 
          },
          {
            accessorKey: 'phoneNumber', 
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
            accessorKey: 'type', 
            header: 'Type',
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          {
            accessorKey: 'quantity', 
            header: 'Quantity',
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

export default WasteList