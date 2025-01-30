import { FetchOptions } from "ohmyfetch";

export const apiUsers = () => {
  const login = <T>(options: FetchOptions): Promise<T> => {
    return useAPI('auth/jwt/create/',options)
  }
  const register = <T>(options: FetchOptions): Promise<T> => {
    return useAPI('auth/register/',options)
  }
  const logout = <T>(options: FetchOptions): Promise<T> => {
    return useAPI('auth/logout/',options)
  }

  return { login,register,logout }
}