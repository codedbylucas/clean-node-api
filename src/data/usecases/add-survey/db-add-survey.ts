import { Survey } from '../../../domain/entities/survey'
import { AddSurvey, AddSurveyData, AddSurveyResponse } from '../../../domain/usecases/add-survey'
import { left, right } from '../../../shared/either'
import { AddSurveyRepository } from '../../protocols/db/survey/add-survey-repository'

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepository: AddSurveyRepository) {}

  async add (data: AddSurveyData): Promise<AddSurveyResponse> {
    const survey = Survey.create(data)
    if (survey.isLeft()) {
      return left(survey.value)
    }
    await this.addSurveyRepository.add(data)
    return right(null)
  }
}
