import React, { createContext, useContext, useCallback, useState } from 'react'

export interface AuthenticationProperties {
  children: React.Component
}

export interface AuthenticationStrategy {
  login: () => Promise<void>
  logout: () => Promise<void>
}

export interface AuthenticationProvider {
  registerStrategy(strategy: AuthenticationStrategy): void
}

export interface AuthenticationContextObject
  extends AuthenticationStrategy,
    AuthenticationProvider {}

export const AuthenticationContext = createContext<AuthenticationContextObject>(
  {
    login: () => Promise.resolve(undefined),
    logout: () => Promise.resolve(undefined),
    registerStrategy: () => undefined
  }
)

export const useAuthentication = () => useContext(AuthenticationContext)

export function Authentication(props: AuthenticationProperties) {
  const { children } = props
  const [strategy, setStrategy] = useState<AuthenticationStrategy | null>(null)
  const registerStrategy = useCallback(
    (newStrategy: AuthenticationStrategy) => {
      if (strategy !== newStrategy) {
        setStrategy(newStrategy)
        console.log('Strategy changed', newStrategy)
      }
    },
    [strategy, setStrategy]
  )

  return (
    <AuthenticationContext.Provider
      value={{
        login: () => {
          if (strategy) {
            return strategy.login()
          } else {
            return Promise.resolve(undefined)
          }
        },
        logout: () => {
          if (strategy) {
            return strategy.logout()
          } else {
            return Promise.resolve(undefined)
          }
        },
        registerStrategy
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}
