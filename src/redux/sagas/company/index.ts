
import { apiCore } from '@/lib/api';
import { call, put } from '@redux-saga/core/effects';
import { all, takeLatest } from 'redux-saga/effects';
import { CompanyType, getCompaniesListRequest, getCompaniesListRequestSuccess, getCompaniesListRequestFailure, getCompanyRequestSuccess, getCompanyRequestFailure } from '../../actions'
import * as types from './../../types/index'

let companyApi: CompanyType
let errorApi: any
const api = new apiCore()

const companyRequest = async (companyId: number) => { 
  try {
    const request = await api.get(`/company/${companyId}`)
    // const request = await api.get(`/user/companies`)
    companyApi = request.data
    
    return true
  } catch (error) {
    errorApi = error
    return false
  }
  
}
// const companyListRequest = async () => { 
//   try {
//     // const request = await api.get(`/company/${companyId}`)
//     const request = await api.get(`/user/companies`)
//     companyApi = request.data
//     return true
//   } catch (error) {
//     errorApi = error
//     return false
//   }
// }


// export function* companyListData(action: {type: string, payload: number} ) {
//   try {
//     yield call(companyListRequest)
//     yield put(getCompaniesListRequestSuccess(companyApi))
//   } catch (error) {
//     yield put(getCompanyFailure('Falha ao requisitar'))
//   }
// }

export function* companyData(action: {type: string, payload: number} ) {
  try {
    yield call(companyRequest, action.payload)
    yield put(getCompanyRequestSuccess(companyApi))
  } catch (error) {
    yield put(getCompanyRequestFailure('Falha ao requisitar'))
  }
}

export default all([takeLatest(types.GET_COMPANY_REQUEST, companyData)])