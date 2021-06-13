import React, { useContext } from 'react'
import { UserContextContent } from '../types/user'

export const UserContext = React.createContext<UserContextContent>({
    setUser: () => {},
})

export const useUserContext = () => useContext(UserContext)
