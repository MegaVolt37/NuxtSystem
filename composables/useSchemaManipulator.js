export const useSchemaManipulator = (schema) => {
  const setProps = (item, props, value) => {
    if (!schema.value?.[item]) return

    schema.value[item][props] = value
  }

  return {
    setProps
  }
}
