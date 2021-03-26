import * as React from "react"
import { useRouter } from "next/router"
import Management from "./Management"
import { companyRelations } from "pages/requests"

export default function Home() {
  const router = useRouter()
  const { id } = router.query

  const [company, setCompany] = React.useState(null)
  const [highlights, setHighlights] = React.useState(null)
  const [relations, setRelations] = React.useState(null)

  React.useEffect(() => {
    ;(async () => {
      if (id != null) {
        const response = await fetch("/api/company/basics/" + id)
        const { data } = await response.json()

        setCompany(data)
      }
    })()
  }, [id])

  React.useEffect(() => {
    ;(async () => {
      if (id != null) {
        const response = await fetch("/api/company/highlights/" + id)
        const { data } = await response.json()

        if (data != null) {
          setHighlights(
            Object.entries(data).map(([key, value]) => {
              return {
                key,
                ...value,
              }
            }),
          )
        }
      }
    })()
  }, [id])

  React.useEffect(() => {
    if (id != null) {
      companyRelations({ id }).then((res) => {
        setRelations(res)
      })
    }
  }, [id])

  return (
    <div>
      {company != null ? (
        <>
          <h1>{company.company_name}</h1>
          <p>{company.address.city}</p>
        </>
      ) : null}

      {highlights != null ? (
        <>
          <h2>Highlights</h2>
          {highlights.map((highlight) => (
            <div key={highlight.key}>
              <p>
                {highlight.classification === "negative" ? (
                  <span role="img" aria-label="negative">
                    👎
                  </span>
                ) : highlight.classification === "positive" ? (
                  <span role="img" aria-label="positive">
                    👍
                  </span>
                ) : (
                  <span role="img" aria-label="neutral">
                    🤷‍♂️
                  </span>
                )}
                <strong>{highlight.title}</strong>
              </p>
              <p>{highlight.description}</p>
            </div>
          ))}
        </>
      ) : null}
      {relations ? <Management relations={relations} /> : null}
    </div>
  )
}
