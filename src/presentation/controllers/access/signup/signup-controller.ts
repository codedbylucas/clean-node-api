import { AddAccount } from '@/domain/contracts'
import { badRequest, ok, serverError } from '@/presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/contracts'

export class SignUpController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addAccount: AddAccount
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validation = this.validation.validate(httpRequest.body)
      if (validation.isLeft()) {
        return badRequest(validation.value)
      }
      const { name, email, password } = httpRequest.body
      const accessToken = await this.addAccount.add({ name, email, password })
      if (accessToken.isLeft()) {
        return badRequest(accessToken.value)
      }
      return ok({ accessToken: accessToken.value })
    } catch (error: any) {
      return serverError(error)
    }
  }
}
