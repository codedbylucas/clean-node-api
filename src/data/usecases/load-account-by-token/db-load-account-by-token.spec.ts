import { LoadAccountByTokenData } from '../../../domain/usecases'
import { Decrypter } from '../../protocols/criptography'
import { DbLoadAccountByToken } from './db-load-account-by-token'

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (token: string): Promise<string> {
      return await Promise.resolve('any_id')
    }
  }
  return new DecrypterStub()
}

const makeFakeLoadAccountByTokenData = (): LoadAccountByTokenData => ({
  accessToken: 'any_token',
  role: 'admin'
})

interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const sut = new DbLoadAccountByToken(decrypterStub)
  return {
    sut,
    decrypterStub
  }
}

describe('DbLoadAccountByToken UseCase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load(makeFakeLoadAccountByTokenData())
    expect(decryptSpy).toBeCalledWith('any_token')
  })
})