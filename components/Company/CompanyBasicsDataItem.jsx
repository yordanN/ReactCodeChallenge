import * as React from "react"
import { Box, Typography } from "@mui/material"
import { companyStyles } from "@/components/Company/styles"

const CompanyBasicsDataItem = ({ category, value }) => {
  return (
    <Box sx={companyStyles.basicDataBox}>
      {category && (
        <Typography variant="category" color="primary">
          {category}:
        </Typography>
      )}
      {value && (
        <Typography variant="text" color="primary">
          {value}
        </Typography>
      )}
    </Box>
  )
}

export default CompanyBasicsDataItem
