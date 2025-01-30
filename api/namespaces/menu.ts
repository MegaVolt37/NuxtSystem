import { FetchOptions } from "ohmyfetch";

export const apiMenu = () => {
  const categoriesAll = <T>(options: FetchOptions): Promise<T> => {
    return useAPI('menu/categories/all/',options)
  }

  return { categoriesAll }
}