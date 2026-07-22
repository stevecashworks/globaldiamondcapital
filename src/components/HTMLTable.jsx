import styled from "styled-components";

const data = [
  {
    id: "MO-001",
    name: "Stephen Chigbu",
    facility: "Lagos University Teaching Hospital",
    state: "Lagos",
    email: "stephen.chigbu@examplehospital.com",
    status: "Active",
  },
  {
    id: "MO-002",
    name: "Grace Okafor",
    facility:
      "Federal Medical Centre with a Very Long Name That Should Wrap Correctly Instead Of Overflowing",
    state: "Abuja",
    email:
      "grace.okafor@examplehospital.com",
    status: "Pending",
  },
  {
    id: "MO-003",
    name: "John Bello",
    facility: "University College Hospital Ibadan",
    state: "Oyo",
    email:
      "johnbelloaveryveryveryveryverylongemailaddress@examplehospital.com",
    status: "Inactive",
  },
];

export default function MedicalOfficerTable() {
  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Facility</th>
            <th>State</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.facility}</td>
              <td>{item.state}</td>
              <td>{item.email}</td>
              <td>
                <Status status={item.status}>
                  {item.status}
                </Status>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
}

/* ------------------ STYLES ------------------ */

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;

  background: white;
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.04);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  thead {
    background: #fafafa;
  }

  th,
  td {
    width: calc(100% / 6);
    padding: 18px;

    text-align: left;
    vertical-align: top;

    white-space: normal;
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  th {
    color: #64748b;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  tbody td {
    border-top: 1px solid rgba(15, 23, 42, 0.08);
  }

  th:not(:last-child),
  td:not(:last-child) {
    border-right: 1px solid rgba(15, 23, 42, 0.05);
  }

  tbody tr {
    transition: background 0.25s ease;
  }

  tbody tr:hover {
    background: rgba(59, 130, 246, 0.04);
  }
`;

const Status = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 6px 14px;
  border-radius: 999px;

  font-size: 13px;
  font-weight: 600;

  ${({ status }) => {
    switch (status) {
      case "Active":
        return `
          background: rgba(34,197,94,.15);
          color:#15803d;
        `;

      case "Pending":
        return `
          background: rgba(245,158,11,.15);
          color:#b45309;
        `;

      case "Inactive":
        return `
          background: rgba(239,68,68,.15);
          color:#b91c1c;
        `;

      default:
        return `
          background:#ececec;
          color:#444;
        `;
    }
  }}
`;