import * as React from "react"
import { CircularProgress, Container, Grid, Typography } from "@mui/material"
import SearchBarResult from "@/components/SearchBar/SearchBarResult"
import { searchStyles } from "@/components/SearchBar/styles"
import { useQuery } from "react-query"
import { isEmpty } from "lodash"

const fetchCompanies = async (query) =>
  await (await fetch(`/api/search?query=${query}`)).json()

const SearchBarResults = ({ query }) => {
  const { data, isLoading } = useQuery(
    ["companies", query],
    () => fetchCompanies(query),
    { enabled: Boolean(query) },
  )

  if (isLoading) {
    // Display a loading indicator while querying for the results
    return (
      <Container sx={searchStyles.searchResultsContainer}>
        <CircularProgress sx={searchStyles.searchLoadingIndicator} />
      </Container>
    )
  }

  if (!isEmpty(query) && isEmpty(data?.data)) {
    // No companies found that match the search value
    return (
      <Container sx={searchStyles.searchResultsContainer}>
        <Typography variant="text" color="primary">
          No companies found!
        </Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={searchStyles.searchResultsContainer}>
      <Grid container spacing={2}>
        {data?.data.map((option) => (
          <Grid
            item
            key={option.local_organization_id.id}
            xs={12}
            md={6}
            lg={4}
          >
            <SearchBarResult company={option} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default SearchBarResults
