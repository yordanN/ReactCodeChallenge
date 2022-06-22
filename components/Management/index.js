import { setManagementData } from "./utils/setManagementData"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { companyStyles } from "@/components/Company/styles"
const managementRoles = [
  "MANAGEMENT",
  "ADMINISTRATION",
  "CHIEF EXECUTIVE OFFICER",
  "BOARD OF DIRECTORS",
  "CHAIRMAN",
  "DEPUTY CHAIRMAN",
  "DEPUTY",
  "STAKEHOLDER",
]

const tableHeaderColumnNames = {
  name: "Name",
  position: "Position",
  from: "From",
  seniority: "Seniority",
  functionReal: "Function",
}

const Management = ({ relations }) => {
  const { management, boardOfDirectors } = relations

  const managementData = setManagementData(managementRoles, [
    ...management,
    ...boardOfDirectors,
  ])

  if (!managementData.length) {
    // No data found, return
    return (
      <Typography variant="text" color="primary">
        No relations found.
      </Typography>
    )
  }

  // Sort by seniority order
  managementData.sort(
    (mdA, mdB) => new Date(mdA.seniorityOrder) - new Date(mdB.seniorityOrder),
  )

  // Adapt table to mui
  const keys = Object.keys(managementData[0])
  return (
    <Table>
      <TableHead>
        <TableRow>
          {keys.map(
            (key) =>
              tableHeaderColumnNames[key] && (
                <TableCell
                  key={`only keys ${key}`}
                  sx={companyStyles.relationsTableHeaderCell}
                >
                  {tableHeaderColumnNames[key]}
                </TableCell>
              ),
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {managementData.map((data, i) => (
          <TableRow key={i}>
            {keys.map(
              (key) =>
                tableHeaderColumnNames[key] && (
                  <TableCell
                    key={key}
                    sx={companyStyles.relationsTableBodyCell}
                  >
                    {data[key]}
                  </TableCell>
                ),
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Management
