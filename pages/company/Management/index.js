import { setManagementData } from "./utils/setManagementData"
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

const Management = ({ relations }) => {
  console.log("relations", relations)
  const { management, boardOfDirectors } = relations

  const managementData = setManagementData(managementRoles, [
    ...management,
    ...boardOfDirectors,
  ])
  return (
    <div>
      <p>stuff</p>
    </div>
  )
}

export default Management
