import { combineReducers } from 'redux';
import { appReducer } from './appReducer';
import { authReducer } from '~/store/reducers/authReducer';
import { userReducer } from '~/store/reducers/userReducer';

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    user: userReducer,
});

export type AppStoreType = ReturnType<typeof rootReducer>;
