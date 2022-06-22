import * as React from "react"
import { Box, Typography } from "@mui/material"
import { companyStyles } from "@/components/Company/styles"
import { ThumbDown, ThumbsUpDown, ThumbUp } from "@mui/icons-material"

const highlightClassificationStyle = {
  negative: companyStyles.highlightNegativeBox,
  positive: companyStyles.highlightPositiveBox,
  neutral: companyStyles.highlightNeutralBox,
}

const highlightClassificationIcon = {
  negative: <ThumbDown />,
  positive: <ThumbUp />,
  neutral: <ThumbsUpDown />,
}

const CompanyHighlightItem = ({ highlight }) => {
  return (
    <Box
      sx={[
        companyStyles.highlightBox,
        highlightClassificationStyle[highlight.classification],
      ]}
    >
      {highlight.title && (
        <Box sx={companyStyles.highlightTitleBox}>
          {highlightClassificationIcon[highlight.classification]}
          <Typography
            variant="category"
            color="primary"
            sx={companyStyles.highlightTitle}
          >
            {highlight.title}
          </Typography>
        </Box>
      )}
      {highlight.message && (
        <Typography variant="text" color="primary">
          {highlight.message}
        </Typography>
      )}
    </Box>
  )
}

export default CompanyHighlightItem
