import { combineReducers } from 'redux';
import Auth from './Auth';
import Theme from './Theme';
import User from './User';
import Gui from './Gui';

const reducers = combineReducers({
    theme: Theme,
    auth: Auth,
    user: User,
    gui: Gui
});

export default reducers;