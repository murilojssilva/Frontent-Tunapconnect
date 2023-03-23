import { all } from 'redux-saga/effects'
import company from './company'

export default function* rootSaga(): Generator<any> {
  return yield all([company])
}