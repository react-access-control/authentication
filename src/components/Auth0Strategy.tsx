import React, { useEffect, useState } from 'react'
import { AuthenticationContext, useAuthentication } from './Authentication'

export function Auth0Strategy(props: any) {
  const provider = useAuthentication()
  const [strategy] = useState({
    login: () => Promise.resolve(console.log('Strategy do login', props)),
    logout: () => Promise.resolve(console.log('Strategy do logout', props))
  })
  useEffect(() => {
    if (provider) {
      provider.registerStrategy(strategy)
    }
  }, [provider, strategy])
  return (
    <AuthenticationContext.Consumer>
      {() => {
        return props.children
      }}
    </AuthenticationContext.Consumer>
  )
}
