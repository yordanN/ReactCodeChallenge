import * as React from "react"
import {useRouter} from "next/router"

export default function Home() {
  const router = useRouter()
  const {id} = router.query

  const [company, setCompany] = React.useState(null)
  const [highlights, setHighlights] = React.useState(null)

  React.useEffect(() => {
    (async () => {
      if (id != null) {
        const response = await fetch("/api/company/basics/" + id)
        const {data} = await response.json()

        setCompany(data)
      }
    })()
  }, [id])

  React.useEffect(() => {
    (async () => {
      if (id != null) {
        const response = await fetch("/api/company/highlights/" + id)
        const {data} = await response.json()

        if (data != null) {
          setHighlights(
            Object.entries(data).map(([key, value]) => {
              return {
                key,
                ...value,
              }
            })
          )
        }
      }
    })()
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
                  <span>👎</span>
                ) : highlight.classification === "positive" ? (
                    <span>👍</span>
                ) : (
                  <span>🤷‍♂️</span>
                )}
                <strong>{highlight.title}</strong>
              </p>
              <p>{highlight.description}</p>
            </div>
          ))}
        </>
      ) : null}
    </div>
  )
}
