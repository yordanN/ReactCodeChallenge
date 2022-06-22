import * as React from "react"
import { Container } from "@mui/material"
import SearchBarTitle from "@/components/SearchBar/SearchBarTitle"
import SearchBarInput from "@/components/SearchBar/SearchBarInput"
import { searchStyles } from "@/components/SearchBar/styles"

const SearchBar = ({ setQuery }) => (
  <Container maxWidth="lg" sx={searchStyles.container}>
    <SearchBarTitle />
    <SearchBarInput setQuery={setQuery} />
  </Container>
)

export default SearchBar
