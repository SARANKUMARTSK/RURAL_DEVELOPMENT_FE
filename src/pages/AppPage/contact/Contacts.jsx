import React from 'react'
import TopBar from '../../../components/TopBar'
import '../app.css'
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';



function Contacts() {

  const data = [
    {
      name: "Mr.Sample Name 01",
      email:"sample01@gmail.com",
      phoneNumber:"9988774455",
      fax:"1234-5678",
      position:"Sample01",
      city:"Pollachi",
      district:"Coimbatore",
    },
    {
      name: "Mr.Sample Name 02",
      email:"sample02@gmail.com",
      phoneNumber:"8877665544",
      fax:"2345-6789",
      position:"Sample02",
      city:"Anaimalai",
      district:"Coimbatore",
    },
    {
      name: "Mr.Sample Name 03",
      email:"sample03@gmail.com",
      phoneNumber:"7788994455",
      fax:"3465-7890",
      position:"Sample03",
      city:"Udumalpet",
      district:"Tiruppur",
    },
    {
      name: "Mr.Sample Name 04",
      email:"sample04@gmail.com",
      phoneNumber:"6677889944",
      fax:"5678-9101",
      position:"Sample04",
      city:"Dharapuram",
      district:"Tiruppur",
    },
  ];



  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', //access nested data with dot notation
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
      {
        accessorFn: (row) => (
          <div>
            <DeleteIcon  className="delete-icon"  />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <DriveFileRenameOutlineIcon  className="edit-icon" />
          </div>
        ),
        header: "Action",
        size: 150,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });


  return <>
  <TopBar/>
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