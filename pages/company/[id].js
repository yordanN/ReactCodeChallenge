import * as React from "react"
import { useRouter } from "next/router"
import CompanyData from "@/components/Company/CompanyData"

export default function Company() {
  const router = useRouter()
  const { id } = router.query

  return <CompanyData id={id} />
}
