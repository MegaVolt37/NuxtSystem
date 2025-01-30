export const useFiltersEndpoint = ({ mode = "root", clientId = 0 }) => {
  const nuxtApp = useNuxtApp()
  console.log(nuxtApp.$api.users.login)

  let fetchEndpoint = nuxtApp.$api.menu.categoriesAll

  switch (mode) {
    case "root":
      fetchEndpoint = nuxtApp.$api.menu.categoriesAll
      break
    case "mine":
      fetchEndpoint = nuxtApp.$api.menu.categoriesAll
      break
    case "client":
      fetchEndpoint = nuxtApp.$api.menu.categoriesAll(clientId)
      break
    case "favorites":
      fetchEndpoint = nuxtApp.$api.menu.categoriesAll
      break
    case "references":
      fetchEndpoint = nuxtApp.$api.menu.categoriesAll
      break
  }

  const fetchFilter = async (fetchName, queryName, id) => {
    const isReference = mode === "references"
    const query = isReference ? `${queryName}Id` : queryName

    return fetchEndpoint(fetchName, { params: { [query]: id } })
  }

  return {
    fetchEndpoint,
    fetchFilter
  }
}