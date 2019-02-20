import { combineReducers } from 'redux';
import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { tickets, create } from './tickets.reducer';
import { users } from './users.reducer';


const rootReducer = combineReducers({
    alert,
    authentication,
    registration,
    tickets,
    create,
    users
});

export default rootReducer;