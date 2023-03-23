import { CompanyType } from './../../actions/company/index';
import * as types from '../../types'


interface CompanyState {
  company: CompanyType;
  loading: boolean
  error: string
}

const initialState: CompanyState = {
  company: {
    id: undefined,
    name: '',
    cnpj: '',
    cpf: ''
  },
  loading: false,
  error: ''
} 

export const companyReducer = (state = initialState, action: {
  type: string,
  payload: CompanyType
}) => {
  switch (action.type) {
    case types.GET_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
        company: {
          ...action.payload,
          id: action.payload
        },
        error: ''
      }
    case types.GET_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        company: action.payload,
        error: ''
      }
    case types.GET_COMPANY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    
    case types.GET_COMPANIES_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        company: action.payload,
        error: ''
      }
    
    case types.GET_COMPANIES_LIST_SUCCESS:
      return {
        ...state,
        loading: true,
        company: action.payload,
        error: ''
      }
    
    case types.GET_COMPANIES_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    
    
    default: 
      return state
  }
}