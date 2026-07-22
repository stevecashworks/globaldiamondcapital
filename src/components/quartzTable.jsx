import { AgGridReact } from "ag-grid-react";
import { useMemo, useState } from "react";

function QuartzTable() {
  const [rowData] = useState([
    {
      id: 1,
      name: "Stephen",
      email: "stephen@email.com",
      status: "Active",
      country: "Nigeria",
    },
    {
      id: 2,
      name: "John",
      email: "john@email.com",
      status: "Inactive",
      country: "Canada",
    },
    {
      id: 3,
      name: "Mary",
      email: "mary@email.com",
      status: "Pending",
      country: "USA",
    },
    {
      id: 4,
      name: "Jane",
      email: "jane@email.com",
      status: "Active",
      country: "Ghana",
    },
  ]);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "ID",
        field: "id",
        width: 90,
      },
      {
        headerName: "Name",
        field: "name",
        flex: 1,
      },
      {
        headerName: "Email",
        field: "email",
        flex: 2,
      },
      {
        headerName: "Country",
        field: "country",
        flex: 1,
      },
      {
        headerName: "Status",
        field: "status",
        flex: 1,
        cellRenderer: (params) => {
          const colors = {
            Active: "#198754",
            Inactive: "#dc3545",
            Pending: "#ffc107",
          };

          return (
            <span
              style={{
                background: colors[params.value],
                color: "white",
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "12px",
              }}
            >
              {params.value}
            </span>
          );
        },
      },
      {
        headerName: "Actions",
        width: 180,
        sortable: false,
        filter: false,
        cellRenderer: (params) => (
          <div
            style={{
              display: "flex",
              gap: "8px",
              height: "100%",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => alert(`Edit ${params.data.name}`)}
            >
              Edit
            </button>

            <button
              onClick={() => alert(`Delete ${params.data.name}`)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      floatingFilter: true,
      resizable: true,
    }),
    []
  );

  return (
    <div
      className="ag-theme-quartz"
      style={{
        height: 500,
        width: "100%",
      }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        animateRows={true}
      />
    </div>
  );
}

export default QuartzTable;