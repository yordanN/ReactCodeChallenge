
const removeDuplicates = (myArr, prop) => {
  return myArr.filter((obj, pos, arr) => {
    return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos
  })
}

const stripFunctions = (array, roles) => {
  return array?.map((person) => ({
    ...person,
    functions: person.functions.filter((x) => roles.includes(x.function)),
  }))
}

const handleProgressBar = (from) => {
  const monthsPassed = moment().diff(from, 'months')
  if (monthsPassed < 24) {
    return `linear-gradient(90deg, #DC172F ${monthsPassed}%, white ${monthsPassed}%)`
  }
  if (monthsPassed < 55) {
    return `linear-gradient(90deg, #FEBE0E ${monthsPassed}%, white ${monthsPassed}%)`
  }
  if (monthsPassed >= 55) {
    return `linear-gradient(90deg, #4EA206 ${monthsPassed}%, white ${monthsPassed}%)`
  }
}

const boardLast = (a, b) => {
  if (a.functionReal === 'BOARD OF DIRECTORS') return 1
  if (b.functionReal === 'BOARD OF DIRECTORS') return -1
  return 0
}

const getColor = (description) => {
  if (description === 'strong') return 'green'
  if (description === 'manual') return 'green'
  if (description === 'weak') return 'orange'
}

export const setManagementData = (
  managementRoles,
  data,
) => {
  const returnValue = []
  stripFunctions(removeDuplicates(data, 'name'), managementRoles)
    ?.filter((x) => x.functions.length)
    ?.forEach((person) => {
      person?.functions?.forEach((func) => {
        returnValue.push({
          name: (
              person?.name
          ),
          position: func?.title,
          from:
            func?.valid_from
              ? func?.valid_from
              : '-',
          seniority:
            func?.valid_from ? (
              <div>
                <HumanDate date={moment(func?.valid_from)} format="duration" />
                <div
                  className={classes.progressBar}
                  style={{
                    background: handleProgressBar(moment(func?.valid_from)),
                  }}
                ></div>
              </div>
            ) : (
              '-'
            ),
          // Change the 2 to a actual variable when you get the data
          otherPosition:
            person?.active_company_relations?.length - 1 > 0 ? (
              <Link
                to={navigation.relationOverview({
                  id: person.personal_id,
                  country,
                })}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: 500,
                      marginRight: '0.5rem',
                      textDecoration: 'none',
                    }}
                  >
                    {person.active_company_relations.length - 1}
                  </Typography>
                  <Typography style={{ fontStyle: 'italic' }}>
                    <FormattedMessage
                      id={intl.companyRoles('other-positions')}
                    />
                  </Typography>
                </div>
              </Link>
            ) : (
              '-'
            ),
          otherPositionsOrder: person?.active_company_relations?.length
            ? person?.active_company_relations?.length
            : 0,
          highlights: connectedBancrupcies?.[person.personal_id] ? (
            <Highlights
              content={(open, onClose) => (
                <ConnectedBankruptcies
                  open={open}
                  onClose={onClose}
                  title={
                    <FormattedMessage
                      id={intl.companyRoles('analysis-of-bankruptcies')}
                    />
                  }
                  data={{
                    [person.personal_id]:
                      connectedBancrupcies?.[person.personal_id],
                  }}
                />
              )}
            />
          ) : (
            <Typography style={{ paddingLeft: '2rem' }}>-</Typography>
          ),
          pep: person?.politically_exposed_persons ? (
            <>
              <Tooltip
                title={person?.politically_exposed_persons.description}
                placement="top"
              >
                <Typography
                  style={{
                    color: getColor(
                      person?.politically_exposed_persons.description_code,
                    ),
                    cursor: 'default',
                  }}
                >
                  PEP
                </Typography>
              </Tooltip>
            </>
          ) : (
            '-'
          ),
          seniorityOrder: func?.valid_from,
          highlightsOrder: connectedBancrupcies?.[person.personal_id]?.length
            ? connectedBancrupcies?.[person.personal_id]?.length
            : 0,
          functionReal: func?.function,
        })
      })
    })
  return returnValue.sort((a, b) => boardLast(a, b))
}
