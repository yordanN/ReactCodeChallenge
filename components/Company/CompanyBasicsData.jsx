import * as React from "react"
import { Card, CardContent, CardHeader, CircularProgress } from "@mui/material"
import { companyStyles } from "@/components/Company/styles"
import { useQuery } from "react-query"
import CompanyBasicsDataItem from "@/components/Company/CompanyBasicsDataItem"

const fetchCompanyData = async (companyId) =>
  await (
    await fetch(`http://localhost:3000/api/company/basics/${companyId}`)
  ).json()

const formatCompanyAddress = (addressData) => {
  let address = ""
  if (addressData.street && addressData.number) {
    address += addressData.number + " " + addressData.street
  }
  if (addressData.city) {
    address += ", " + addressData.city
  }
  if (addressData.country) {
    address += ", " + addressData.country
  }
  if (addressData.zipcode) {
    address += ", " + addressData.zipcode
  }
  return address || "N/A"
}

const CompanyBasicsData = ({ id }) => {
  const { data, isLoading } = useQuery(["company-data", id], () =>
    fetchCompanyData(id),
  )

  if (isLoading) {
    // Display a loading indicator while querying for the company's basics data
    return (
      <Card elevation={1} sx={companyStyles.card}>
        <CardHeader title="General company information" />
        <CardContent sx={companyStyles.cardCenteredContent}>
          <CircularProgress />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card elevation={1} sx={companyStyles.card}>
      <CardHeader title="General company information" />
      <CardContent>
        <CompanyBasicsDataItem category="Name" value={data.data.company_name} />
        <CompanyBasicsDataItem
          category="VAT"
          value={data.data.vat ? "Yes" : "No"}
        />
        <CompanyBasicsDataItem
          category="Email"
          value={data.data.email.email || "N/A"}
        />
        <CompanyBasicsDataItem
          category="Phone"
          value={data.data.phone.phone_number || "N/A"}
        />
        <CompanyBasicsDataItem category="Score" value={data.data.score} />
        <CompanyBasicsDataItem
          category="Address"
          value={formatCompanyAddress(data.data.address)}
        />
        <CompanyBasicsDataItem category="Status" value={data.data.status} />
        <CompanyBasicsDataItem
          category="Type"
          value={`${data.data.company_type.long} (${data.data.company_type.short})`}
        />
        <CompanyBasicsDataItem
          category="Main industry code"
          value={
            data.data.main_industry_code.code
              ? `${data.data.main_industry_code.code} (${data.data.main_industry_code.description})`
              : "N/A"
          }
        />
        <CompanyBasicsDataItem
          category="Registered capital"
          value={
            data.data.registered_capital.value
              ? `${data.data.registered_capital.value} (${data.data.registered_capital.currency})`
              : "N/A"
          }
        />
        <CompanyBasicsDataItem
          category="Date of incorporation"
          value={
            data.data.date_of_incorporation
              ? data.data.date_of_incorporation
              : "N/A"
          }
        />
        <CompanyBasicsDataItem
          category="Local organization id"
          value={
            data.data.local_organization_id.id
              ? `${data.data.local_organization_id.id} (${data.data.local_organization_id.country})`
              : "N/A"
          }
        />
        {data.data.company_secondary_names && (
          <>
            <CompanyBasicsDataItem category="Secondary names" />
            {data.data.company_secondary_names.map((secondaryNameObj) => (
              <CompanyBasicsDataItem
                key={secondaryNameObj.name}
                value={`${secondaryNameObj.name} (${
                  secondaryNameObj.valid_from || "N/A"
                } - ${secondaryNameObj.valid_to || "N/A"})`}
              />
            ))}
          </>
        )}
        <CompanyBasicsDataItem
          category="Risk assessment"
          value={data.data.risk_assessment || "N/A"}
        />
      </CardContent>
    </Card>
  )
}

export default CompanyBasicsData
