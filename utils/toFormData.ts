export const toFormData = (obj: {[key: string]: any}) => {
  const formData = new FormData()

  Object.entries(obj).forEach(([key, value]) => formData.set(key, value))

  return formData
}
