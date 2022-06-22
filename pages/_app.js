import * as React from "react"
import {
  AppBar,
  Button,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material"
import { appTheme } from "@/themes/theme"
import { QueryClient, QueryClientProvider } from "react-query"
import RisikaLogo from "@/components/Logos/RisikaLogo"
import { useRouter } from "next/router"

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient()

  const router = useRouter()
  const onLogoClick = React.useCallback(() => {
    router.push("/")
  }, [router])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline enableColorScheme />
        <AppBar position="sticky" color="appBar">
          <Toolbar disableGutters>
            <Button onClick={onLogoClick}>
              <RisikaLogo />
            </Button>
            <Typography variant="title" color="primary">
              Companypedia
            </Typography>
          </Toolbar>
        </AppBar>
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default MyApp
