import { createTheme } from "@mui/material/styles"

export const appTheme = createTheme({
  typography: {
    title: {
      fontSize: "30px",
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: "25px",
    },
    textInput: {
      fontSize: "20px",
    },
    category: {
      fontSize: "20px",
      fontWeight: "bold",
    },
    text: {
      fontSize: "20px",
    },
  },
  palette: {
    primary: {
      main: "rgb(10 55 61)",
    },
    secondary: {
      main: "rgb(65, 65, 65)",
    },
    background: {
      default: "rgb(224 241 244)",
    },
    appBar: {
      primary: "#fff",
    },
    searchBar: {
      background: "#fff",
    },
    highlight: {
      negative: "rgba(181, 55, 55, 0.3)",
      positive: "rgba(38, 88, 15, 0.3)",
      neutral: "rgba(170, 170, 170, 0.3)",
    },
  },
})
