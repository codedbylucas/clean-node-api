import { LoadSurveysController } from './load-surveys-controller'
import { LoadSurveys } from '../../../../domain/usecases'
import { SurveyModel } from '../../../../domain/models'
import { noContent, ok } from '../../../helpers/http/http-helper'

const makeLoadSurveys = (): LoadSurveys => {
  class LoadSurveyStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return await Promise.resolve(makeFakeSurveys())
    }
  }
  return new LoadSurveyStub()
}

const makeFakeSurveys = (): SurveyModel[] => ([
  {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_url_image',
      answer: 'any_answer'
    }],
    date: new Date()
  },
  {
    id: 'other_id',
    question: 'any_question',
    answers: [{
      image: 'any_url_image',
      answer: 'any_answer'
    }],
    date: new Date()
  }
])

interface SutTypes {
  sut: LoadSurveysController
  loadSurveysStub: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = makeLoadSurveys()
  const sut = new LoadSurveysController(loadSurveysStub)
  return {
    sut,
    loadSurveysStub
  }
}

describe('LoadSurveys Controller', () => {
  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 204 if LoadSurveys is empty', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(
      Promise.resolve([])
    )
    const response = await sut.handle({})
    expect(response).toEqual(noContent())
  })

  test('Should return 200 if LoadSurveys success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({})
    expect(response).toEqual(ok(makeFakeSurveys()))
  })
})
