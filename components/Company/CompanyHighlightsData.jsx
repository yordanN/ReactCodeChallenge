import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
} from "@mui/material"
import { companyStyles } from "@/components/Company/styles"
import { useQuery } from "react-query"
import CompanyHighlightItem from "@/components/Company/CompanyHighlightItem"

const fetchCompanyHighlights = async (companyId) =>
  await (
    await fetch(`http://localhost:3000/api/company/highlights/${companyId}`)
  ).json()

const classificationsMap = {
  negative: 0,
  positive: 1,
  neutral: 2,
}

const CompanyHighlightsData = ({ id }) => {
  const { data, isLoading } = useQuery(["company-highlights-data", id], () =>
    fetchCompanyHighlights(id),
  )

  if (isLoading) {
    // Display a loading indicator while querying for the company's highlights data
    return (
      <Card elevation={1} sx={companyStyles.card}>
        <CardHeader title="Highlights" />
        <CardContent sx={companyStyles.cardCenteredContent}>
          <CircularProgress />
        </CardContent>
      </Card>
    )
  }

  // Sort the company's highlights by classification first (negative, positive and neutral) and items with the same
  // classification by weight (from lowest to highest)
  const highlightsSortedArray = Object.entries(data.data).sort(
    (highlightA, highlightB) => {
      if (highlightA[1].classification === highlightB[1].classification) {
        return highlightA[1].weight > highlightB[1].weight ? 1 : -1
      }
      return (
        classificationsMap[highlightA[1].classification] -
        classificationsMap[highlightB[1].classification]
      )
    },
  )

  if (!highlightsSortedArray.length) {
    // Display a message when no highlights are found
    return (
      <Card elevation={1} sx={companyStyles.card}>
        <CardHeader title="Highlights" />
        <CardContent>
          <Typography variant="text" color="primary">
            No highlights found.
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card elevation={1} sx={companyStyles.card}>
      <CardHeader title="Highlights" />
      <CardContent>
        {highlightsSortedArray.map((highlight) => (
          <CompanyHighlightItem key={highlight[0]} highlight={highlight[1]} />
        ))}
      </CardContent>
    </Card>
  )
}

export default CompanyHighlightsData
