import { combineReducers } from 'redux'
import { companyReducer } from './company'

const rootReducer = combineReducers({
  company: companyReducer
})

export default rootReducer