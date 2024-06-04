import React from 'react'
import { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { format, subDays } from 'date-fns';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import axios from 'axios'
import {API_URL} from '../../../App'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import PreviewRoundedIcon from '@mui/icons-material/PreviewRounded';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function ComplaintList() {

  const today = new Date();
  const formattedToday = format(today, 'yyyy-MM-dd');

  const yesterday = subDays(today, 1);
  const formattedYesterday = format(yesterday, 'yyyy-MM-dd');

  const dayBefore = subDays(today, 2);
  const formattedDayBefore = format(dayBefore, 'yyyy-MM-dd');

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role')

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
      },[data])


      const handleEdit=async(row)=>{
        navigate(`/dashboard/assign-complaint/${row._id}`)
      }

      const handleDelete=async(row)=>{
        if(role==="Admin"){
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
        }else{
          toast.error('You Are Not Allowed')
        }
      

      }

      const columns = useMemo(
        () => [
          {
            accessorKey: 'userName', 
            header: 'Complainter Name',
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          {
            accessorKey: 'title', 
            header: 'Complaint',
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
            accessorKey: 'department', 
            header: 'Departmant',
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          {
            accessorKey: 'locality', 
            header: 'Village',
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
                ${row.status=="Registered"?"backgroundcolor-orange":""}
                ${row.status==="Solved"?"color-black":""}`}>
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
                <DriveFileRenameOutlineIcon onClick={()=>handleEdit(row)} className="delete-icon" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <PreviewRoundedIcon onClick={()=>navigate(`/dashboard/complaint-detailed-view/${row._id}`)} className='edit-icon'/>
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
  <div className='muiTable'>
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
      />  </div>      
  </>
}

export default ComplaintList

