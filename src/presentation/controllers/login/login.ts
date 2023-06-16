import { Authentication, EmailValidator, Controller, HttpRequest, HttpResponse } from './login-protocols'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helper'

export class LoginController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const accessTokenOrError = await this.authentication.auth({ email, password })
      if (accessTokenOrError.isLeft()) {
        return unauthorized(accessTokenOrError.value)
      }
      return await Promise.resolve(ok(''))
    } catch (error: any) {
      return serverError(error)
    }
  }
}
