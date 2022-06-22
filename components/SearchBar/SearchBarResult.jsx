import * as React from "react"
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material"
import { searchStyles } from "@/components/SearchBar/styles"
import { ArrowForward, Email, Phone } from "@mui/icons-material"
import { useRouter } from "next/router"

const SearchBarResult = ({ company }) => {
  const router = useRouter()

  const onClick = React.useCallback(() => {
    router.push("company/" + company.local_organization_id.id)
  }, [router, company])

  return (
    <Card elevation={1} sx={searchStyles.optionCard}>
      <CardHeader
        action={
          <IconButton
            onClick={onClick}
            disabled={!company.local_organization_id.id}
          >
            <ArrowForward />
          </IconButton>
        }
        title={company.company_name}
        subheader={company.local_organization_id.id}
        sx={searchStyles.cardHeader}
      />
      <CardContent>
        <Box sx={searchStyles.contactBox}>
          <Phone />
          <Typography color="primary" sx={searchStyles.contactValue}>
            {company.phone.phone_number || "N/A"}
          </Typography>
        </Box>
        <Box sx={searchStyles.contactBox}>
          <Email />
          <Typography color="primary" sx={searchStyles.contactValue}>
            {company.email.email || "N/A"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default SearchBarResult
