import * as React from "react"
import { Container, Grid } from "@mui/material"
import { companyStyles } from "@/components/Company/styles"
import CompanyBasicsData from "@/components/Company/CompanyBasicsData"
import CompanyHighlightsData from "@/components/Company/CompanyHighlightsData"
import CompanyRelationsData from "@/components/Company/CompanyRelationsData"

const CompanyData = ({ id }) => {
  return (
    <Container maxWidth={false} sx={companyStyles.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          <CompanyBasicsData id={id} />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <CompanyHighlightsData id={id} />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <CompanyRelationsData id={id} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default CompanyData
