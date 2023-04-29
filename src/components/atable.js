import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

export default function ATable({ rows , columns }) {
  return (
    <div style={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={columns}
      paginationModel={{ page: 0, pageSize: 5 }}
      checkboxSelection
    />
  </div>
  );
}
