import { useReactiveVar, gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { isLoggedInVar, logUserOut } from '../apollo'

const ME_QUERY = gql`
  query me {
    me {
      username
      avatar
    }
  }
`

function useUser() {
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  const { data, error } = useQuery(ME_QUERY, {
    skip: !isLoggedIn,
  })

  useEffect(() => {
    if (data?.me === null) {
      logUserOut()
    }
  }, [data])
  return { data }
}

export default useUser
