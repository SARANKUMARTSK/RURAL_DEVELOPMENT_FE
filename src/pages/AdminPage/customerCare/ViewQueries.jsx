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
import DeleteOutline from '@mui/icons-material/DeleteOutline';

function ViewQueries() {
  const role = localStorage.getItem('role')
  const today = new Date();
  const formattedToday = format(today, 'yyyy-MM-dd');

  const yesterday = subDays(today, 1);
  const formattedYesterday = format(yesterday, 'yyyy-MM-dd');

  const dayBefore = subDays(today, 2);
  const formattedDayBefore = format(dayBefore, 'yyyy-MM-dd');

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
    

      const fetchCustomerQueries = async()=>{
        try {
          let res = await axios.get(`${API_URL}/customerCare`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}` 
            }
        })
          setData(res.data.query)
        } catch (error) {
          console.log(error);
        }
      } 

      useEffect(()=>{
        fetchCustomerQueries();
      },[data])

      const handleEdit=async(row)=>{
        navigate(`/dashboard/assign-complaint/${row._id}`)
      }

      const handleDelete=async(row)=>{
      try {
        let res = await axios.delete(`${API_URL}/customerCare/${row._id}`, {
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
            accessorKey: 'name', 
            header: 'Query Person',
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          {
            accessorKey: 'phoneNumber', 
            header: 'Contact Number',
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          {
            accessorKey: 'title', 
            header: 'Query Title',
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
            header: "Query Date",
            size: 150,
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          {
            accessorKey: 'city', 
            header: 'City',
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          {
            accessorKey: 'district', 
            header: 'District',
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          {
            accessorFn: (row) => {
              return (
                <div className={`complaint-date-div ${row.status=="New"?"backgroundcolor-orange":""}
                ${row.status=="Solved"?"backgroundcolor-green":"backgroundcolor-red"}`}>
                  {row.status}
                </div>
              );
            },
            header: "Status",
            size: 150,
            muiTableHeadCellProps: { sx: { color: 'green' } },
          },
          {
            accessorFn: (row) => (
              <div>
                {
                  role==="Admin"&&<DeleteOutline onClick={()=>handleDelete(row)} className="delete-icon" />
                }
                &nbsp;&nbsp;&nbsp;&nbsp;
                <PreviewRoundedIcon onClick={()=>navigate(`/dashboard/detailed-view-customer-care/${row._id}`)} className='edit-icon'/>
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
  <nav className='button-end' ><button onClick={()=>navigate('/dashboard/home')}>Back</button></nav>
  <div className='muiTable' style={{ overflow: 'auto' }}>
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

export default ViewQueries