import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
} from "@mui/material"
import { companyStyles } from "@/components/Company/styles"
import companyRelations from "@/requests/companyRelations"
import Management from "@/components/Management"
import { isEmpty } from "lodash"

const CompanyHighlightsData = ({ id }) => {
  const [isLoading, setIsLoading] = React.useState(id !== null)
  const [relations, setRelations] = React.useState(null)

  React.useEffect(() => {
    if (id != null) {
      setIsLoading(true)
      companyRelations({ id }).then((res) => {
        setRelations(res)
        setIsLoading(false)
      })
    }
  }, [id])

  if (isLoading) {
    // Display a loading indicator while querying for the company's relations data
    return (
      <Card elevation={1} sx={companyStyles.card}>
        <CardHeader title="Relations" />
        <CardContent sx={companyStyles.cardCenteredContent}>
          <CircularProgress />
        </CardContent>
      </Card>
    )
  }

  if (isEmpty(relations)) {
    // Display a message when no relations are found
    return (
      <Card elevation={1} sx={companyStyles.card}>
        <CardHeader title="Relations" />
        <CardContent>
          <Typography variant="text" color="primary">
            No relations found.
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card elevation={1} sx={companyStyles.card}>
      <CardHeader title="Relations" />
      <CardContent>
        <Management relations={relations} />
      </CardContent>
    </Card>
  )
}

export default CompanyHighlightsData
