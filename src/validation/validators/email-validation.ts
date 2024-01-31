import { InvalidEmailError } from '@/presentation/errors'
import { EmailValidator, Validation } from '@/presentation/contracts'
import { Either, left, right } from '@/shared/either'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): Either<Error, null> {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return left(new InvalidEmailError(input[this.fieldName]))
    }
    return right(null)
  }
}
