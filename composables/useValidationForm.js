import { useForm,Form } from "vee-validate"

// FIXME: dirty hack
const VEE_VALIDATE_FVL_FORM_KEY = "vee-validate-fvl-form-context"

export const useValidationForm = (options = {}) => {
  const formContext = useForm(options)
  provide(VEE_VALIDATE_FVL_FORM_KEY, formContext)

  return formContext
}
