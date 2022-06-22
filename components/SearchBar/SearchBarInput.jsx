import * as React from "react"
import { TextField } from "@mui/material"
import { searchStyles } from "@/components/SearchBar/styles"

const SearchBarInput = ({ setQuery }) => {
  // When the input value changes, update the query state
  const onInputChange = React.useCallback(
    (event) => setQuery(event.target.value),
    [],
  )

  return (
    <TextField
      label="Search"
      sx={searchStyles.searchBarInput}
      onChange={onInputChange}
      InputProps={{
        type: "search",
      }}
    />
  )
}

export default SearchBarInput
