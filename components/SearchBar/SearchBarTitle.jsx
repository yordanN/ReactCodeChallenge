import * as React from "react"
import { Typography } from "@mui/material"
import { searchStyles } from "@/components/SearchBar/styles"

const SearchBarTitle = () => (
  <Typography
    variant="subtitle"
    color="primary"
    sx={searchStyles.searchBarTitle}
  >
    Search for a company using its name, CVR, phone number or email
  </Typography>
)

export default SearchBarTitle
