import { Validation, CompareFieldsValidation, RequiredFieldValidation, ValidationComposite, OnlyRequiredFieldsValidation } from '../../../../../validation/validators'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(
    new OnlyRequiredFieldsValidation(requiredFields),
    new CompareFieldsValidation('password', 'passwordConfirmation')
  )
  return new ValidationComposite(validations)
}
