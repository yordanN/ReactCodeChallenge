import * as React from "react"
import Link from "next/link"

export default function Home() {
  const [data, setData] = React.useState(null)

  async function handleSearch(event) {
    const value = event.target.value

    const response = await fetch('/api/search?query=' + value)
    const json = await response.json()

    setData(json)
  }

  return (
    <div>
      <input onChange={handleSearch} />
      <div>
        {data != null ? (
          <ul>
            {data.data.map(company => (
              <li><Link href={`/company/${company.local_organization_id.id}`}>{company.company_name}</Link></li>
            ))}
          </ul>
        ) : null}
      </div> 
    </div>
  )
}
