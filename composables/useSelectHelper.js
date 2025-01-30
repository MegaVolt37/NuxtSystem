export const useSelectsHelper = (schemaManilpulator, filtersEndpoint) => {
  const { setProps } = schemaManilpulator
  const { fetchFilter } = filtersEndpoint

  const getOptions = async (getOptions, fetchFilterOptions, transform = (v) => v) => {
    const { filterName, refs } = getOptions

    setProps(filterName, "list", [])

    if (refs?.length) {
      refs.forEach(name => setProps(name, "list", []))
    }

    setProps(filterName, "loading", true)

    const options = await fetchFilter(...Object.values(fetchFilterOptions))

    setProps(filterName, "loading", false)

    setProps(filterName, "list", transform(options))
  }

  return {
    getOptions
  }
}