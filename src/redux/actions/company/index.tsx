import * as types from '../../constants'

interface getCompanyRequestReturn {
  type: string
  payload: number
}
interface getCompaniyRequestSuccessReturn {
  type: string
  payload: CompanyType
}

interface getCompaniesListRequestFailureReturn {
  type: string
  payload: string
}

interface getCompaniesListRequestReturn {
  type: string
}
interface getCompaniesListRequestSuccessReturn {
  type: string
  payload: CompanyType[]
}

interface getCompaniesListRequestFailureReturn {
  type: string
  payload: string
}

export type CompanyType = {
  id?: number
  name?: string
  cpf?: string | null
  cnpj?: string | null
}

//**** one ******//

export function getCompanyRequest(companyId: number):getCompanyRequestReturn {
  return {
    type: types.GET_COMPANY_REQUEST,
    payload: companyId
  }
}

export function getCompanyRequestSuccess(company: CompanyType):getCompaniyRequestSuccessReturn {
  return {
    type: types.GET_COMPANY_SUCCESS,
    payload: company
  }
}
export function getCompanyRequestFailure(error: string):getCompaniesListRequestFailureReturn {
  return {
    type: types.GET_COMPANY_SUCCESS,
    payload: error
  }
}

//**** list ******//

export function getCompaniesListRequest():getCompaniesListRequestReturn {
  return {
    type: types.GET_COMPANIES_LIST_REQUEST,
  }
}

export function getCompaniesListRequestSuccess(company: CompanyType[]):getCompaniesListRequestSuccessReturn {
  return {
    type: types.GET_COMPANIES_LIST_SUCCESS,
    payload: company
  }
}
export function getCompaniesListRequestFailure(error: string):getCompaniesListRequestFailureReturn {
  return {
    type: types.GET_COMPANIES_LIST_SUCCESS,
    payload: error
  }
}