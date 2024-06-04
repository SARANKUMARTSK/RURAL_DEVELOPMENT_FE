import React from 'react'
import { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../App';
import toast from 'react-hot-toast';
import { format, subDays } from 'date-fns';
import PreviewRoundedIcon from '@mui/icons-material/PreviewRounded';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function WasteList() {

    const navigate = useNavigate()

    const [data,setData] = useState([])
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

  const today = new Date();
  const formattedToday = format(today, 'yyyy-MM-dd');

  const yesterday = subDays(today, 1);
  const formattedYesterday = format(yesterday, 'yyyy-MM-dd');

  const dayBefore = subDays(today, 2);
  const formattedDayBefore = format(dayBefore, 'yyyy-MM-dd');

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
    const handleDelete =async(e)=>{
      if(role==='Admin'){
        try {
          let res = await axios.delete(`${API_URL}/waste/${e._id}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}` 
            }
        })
          toast.success(res.data.message)
        } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message||"Something Went Wrong")
        }
      }else{
        toast.error('You Are Not Allowed')
      }
    }



    const handleEdit = async(row)=>{
      navigate(`/dashboard/assign-waste-query/${row._id}`)
    }

      const columns = useMemo(
        () => [
          {
            accessorKey: 'userName',
            header: 'Query Person',
            muiTableHeadCellProps: { sx: { color: 'green' } }, 
          },
          {
            accessorKey: 'type', 
            header: 'Query',
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          {
            accessorFn: (row) => {
              const complaintDate = row.createdAt.split('T')[0];
              let backgroundColor = '';
    
              if (complaintDate === formattedToday) {
                backgroundColor = 'backgroundcolor-green';
              } else if (complaintDate === formattedYesterday) {
                backgroundColor = 'backgroundcolor-orange';
              } else if (complaintDate <= formattedDayBefore) {
                backgroundColor = 'backgroundcolor-red';
              }
    
              return (
                <div className={`complaint-date-div ${backgroundColor}`}>
                  {complaintDate}
                </div>
              );
            },
            header: "Complaint Date",
            size: 150,
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
            accessorFn: (row) => {
              return (
                <div className={`complaint-date-div ${row.status=="Assigned"?"backgroundcolor-green":""}
                ${row.status=="Registered"?"backgroundcolor-orange":""}`}>
                  {row.status}
                </div>
              );
            },
            header: "Status",
            size: 150,
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          {
            accessorKey: 'assignedTo',
            header: 'Assigned Person',
            muiTableHeadCellProps: { sx: { color: 'green' } }, 
          },
          {
            accessorFn: (row) => (
              <div>
                <PreviewRoundedIcon className="edit-icon" onClick={()=>navigate(`/dashboard/waste-detailed-view/${row._id}`)} />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <DriveFileRenameOutlineIcon onClick={()=>handleEdit(row)} className="delete-icon" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <DeleteOutlineIcon onClick={()=>handleDelete(row)} className="delete-icon" />
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