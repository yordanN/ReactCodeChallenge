import * as React from "react"
import SearchBar from "@/components/SearchBar/SearchBar"
import { Container } from "@mui/material"
import SearchBarResults from "@/components/SearchBar/SearchBarResults"

export default function Home() {
  const [query, setQuery] = React.useState("")

  return (
    <Container maxWidth={false}>
      <SearchBar setQuery={setQuery} />
      <SearchBarResults query={query} />
    </Container>
  )
}
