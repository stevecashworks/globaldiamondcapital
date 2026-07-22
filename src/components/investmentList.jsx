import React, { useMemo, useState } from "react";
import styled from "styled-components";
import {Button} from "react-bootstrap"
import { Link } from "react-router-dom";

const Container = styled.div`
  margin-bottom: 40px;
  width: 100vw;
  overflow-x: auto;
`;

const Title = styled.h4`
  text-align: center;
`;

const DownLineCon = styled.div`
  width: 600px;
  margin: 20px auto;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;



const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead``;

const Tbody = styled.tbody``;

const Tr = styled.tr`
  display: flex;
  width: 100%;
  gap: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 12px 0;
`;

const Th = styled.th`
  flex: 1;
  text-align: left;
`;

const Td = styled.td`
  flex: 1;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 25px;
`;

const PageButton = styled.button`
  border: none;
  background: ${({ active }) => (active ? "#198754" : "#eee")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
`;

const ITEMS_PER_PAGE = 5;

const InvestmentsList = ({ investments }) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [ascending, setAscending] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let data = [...investments];

    // Search
    if (search) {
      data = data.filter((i) =>
        i.plan.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    data.sort((a, b) => {
      let result = 0;

      switch (sortBy) {
        case "amount":
          result = a.amount - b.amount;
          break;

        case "plan":
          result = a.plan.localeCompare(b.plan);
          break;

        default:
          result =
            new Date(a.approvedDate).getTime() -
            new Date(b.approvedDate).getTime();
      }

      return ascending ? result : -result;
    });

    return data;
  }, [investments, search, sortBy, ascending]);

  const total = filtered.reduce((sum, inv) => sum + inv.amount, 0);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <Container>
      <Title>Your Investments</Title>

      <DownLineCon>
        {investments.length === 0 ? (
          <div className="alert alert-success text-center">
            You have no investments yet.
          </div>
        ) : (
          <>
            <Controls>
              <Input
                placeholder="Search plan..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />

              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Sort by Date</option>
                <option value="amount">Sort by Amount</option>
                <option value="plan">Sort by Plan</option>
              </Select>

              <Button  variant="success" onClick={() => setAscending(!ascending)}>
                {ascending ? "Ascending ↑" : "Descending ↓"}
              </Button>
            </Controls>

            <Table>
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>status</Th>
                  <Th>Amount</Th>
                  <Th>Plan</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>

              <Tbody>
                {paginated.map((investment) => (
                  <Tr key={investment._id}>
                    <Td>
                      {new Date(
                        investment.approvedDate
                      ).toLocaleDateString()}
                    </Td>

                    <Td>{investment.status==="approved"?"completed ✔":investment.status}</Td>

                    <Td>${investment.amount}</Td>

                    <Td>{investment.plan}</Td>
                    <Td><Button  variant="success" as={Link} to={`/reinvest?id=${investment._id}`}>ReInvest</Button></Td>
                  </Tr>
                ))}

                <Tr
                  style={{
                    fontWeight: 600,
                    fontSize: "1.1rem",
                  }}
                >
                  <Td>Total</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td>${total}</Td>
                </Tr>
              </Tbody>
            </Table>

            {totalPages > 1 && (
              <Pagination>
                {Array.from({ length: totalPages }, (_, i) => (
                  <PageButton
                    key={i}
                    active={page === i + 1}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </PageButton>
                ))}
              </Pagination>
            )}
          </>
        )}
      </DownLineCon>
    </Container>
  );
};

export default InvestmentsList;