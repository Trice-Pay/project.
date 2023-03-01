/**
 *  Import node modules
 */
import { combineReducers } from 'redux'

/**
 *  Import reducers
 *  All reducers used in the app must be declared here!
 */
import users from './users.reducer'
import needs from './needs.reducer'

/**
 *  Combine the reducers
 */
const reducers = combineReducers({
  users,
  needs,
})

/**
 *  Export the combined reducers
 */
export default reducers
