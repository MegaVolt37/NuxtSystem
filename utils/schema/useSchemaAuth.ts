import type { Schema } from "yup"
import { object, string, number, array } from "yup"

export const useSchemaAuth = () => {
  const { t } = useI18n()

  const validationSchema: Schema = object().shape({
    profitTo: number().nullable(),
    profitFrom: number().nullable(),
    socialLinks: array()
  })

  return { validationSchema }
}