import React from 'react'
import { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import axios from 'axios';
import { API_URL } from '../../../App';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../../components/TopBar';
import PreviewIcon from '@mui/icons-material/Preview';
import { format, subDays } from 'date-fns';

function ViewAnnouncement() {
  const today = new Date();
  const formattedToday = format(today, 'yyyy-MM-dd');

  const yesterday = subDays(today, 1);
  const formattedYesterday = format(yesterday, 'yyyy-MM-dd');

  const dayBefore = subDays(today, 2);
  const formattedDayBefore = format(dayBefore, 'yyyy-MM-dd');


    const [data,setData] = useState([])
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const fetchAnnounceentData = async()=>{
      try {
        let res = await axios.get(`${API_URL}/announcement`, {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}` 
          }
      })
        setData(res.data.announcement);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
      fetchAnnounceentData();
    },[data])

    const handleDetailedView=async(e)=>{
      navigate(`/detailed-announcement-view/${e._id}`)
    }

  
      const columns = useMemo(
        () => [
          {
            accessorKey: 'department',
            header: 'Department',
            muiTableHeadCellProps: { sx: { color: 'green' } }, 
          },
          {
            accessorFn: (row) => (
              <div>
                 {row.createdAt?row.createdAt.split('T')[0]:""}
              </div>
            ),
            header: "Announced Date",
            size: 150,
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          {
            accessorKey: 'schemeDetails.title', 
            header: 'Title',
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          {
            accessorKey: 'beneficiaries', 
            header: 'Beneficiaries',
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          {
            accessorFn: (row) => (
              <div className={`complaint-date-div ${row.endingDate===formattedToday?"backgroundcolor-orange":""}
              ${row.endingDate>formattedToday?"backgroundcolor-green":""}
              ${row.endingDate<formattedToday?"backgroundcolor-red":""}`}>
                 {row.endingDate?row.endingDate.split('T')[0]:""}
              </div>
            ),
            header: "Ending Date",
            size: 150,
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          {
            accessorKey: 'concernDistrict', 
            header: 'Concern Districts',
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          
          {
            accessorFn: (row) => (
              <div>
                &nbsp;&nbsp;&nbsp;<PreviewIcon className="edit-icon" onClick={()=>handleDetailedView(row)} />
              </div>
            ),
            header: "Detailed View",
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
  <TopBar/>
  <nav className='button-end'>
    <button onClick={()=>navigate('/landing-page')}>Home</button>
  </nav>
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

export default ViewAnnouncement