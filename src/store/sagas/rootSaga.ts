import { takeLatest } from '@redux-saga/core/effects';
import {
    ADD_DEAL,
    ADD_FRIEND,
    AUTH_ME,
    FETCH_ALL_USERS,
    FETCH_DEALS,
    FETCH_FRIENDS,
    LOGIN_USER,
    LOGOUT_AND_REMOVE_USER,
    LOGOUT_USER,
    OPENED_FRIEND,
    REGISTER_USER,
    REMOVE_DEAL,
    REMOVE_FRIEND,
    UPDATE_DEAL,
    UPDATE_USER,
} from '~/store/sagas/sagasActions/type';
import { fetchAllUsersWorker } from '~/store/sagas/user/fetchAllUsersSaga';
import { fetchFriendsWorker } from '~/store/sagas/friend/fetchFriendsSaga';
import { registerUserWorker } from '~/store/sagas/user/registerUserSaga';
import { loginUserWorker } from '~/store/sagas/user/loginUserSaga';
import { addFriendWorker } from '~/store/sagas/friend/addFriendSaga';
import { removeFriendWorker } from '~/store/sagas/friend/removeFriendSaga';
import { fetchDealsWorker } from '~/store/sagas/deal/fetchDealsSaga';
import { addDealWorker } from '~/store/sagas/deal/addDealSaga';
import { removeDealWorker } from '~/store/sagas/deal/removeDealSaga';
import { updateDealWorker } from '~/store/sagas/deal/updateDealSaga';
import { fetchOpenedFriendWorker } from '~/store/sagas/friend/fetchOpenedFriendSaga';
import { authMeWorker } from '~/store/sagas/user/authMeSaga';
import { logOutUserWorker } from '~/store/sagas/user/logOutUserSaga';
import { updateUserNameWorker } from '~/store/sagas/user/updateUserNameSaga';
import { logOutAndRemoveUserWorker } from '~/store/sagas/user/logOutAndRemoveUserSaga';

export function* watchClickSaga() {
    yield takeLatest(FETCH_ALL_USERS, fetchAllUsersWorker);
    yield takeLatest(FETCH_FRIENDS, fetchFriendsWorker);
    yield takeLatest(REGISTER_USER, registerUserWorker);
    yield takeLatest(LOGIN_USER, loginUserWorker);
    yield takeLatest(ADD_FRIEND, addFriendWorker);
    yield takeLatest(REMOVE_FRIEND, removeFriendWorker);
    yield takeLatest(FETCH_DEALS, fetchDealsWorker);
    yield takeLatest(ADD_DEAL, addDealWorker);
    yield takeLatest(REMOVE_DEAL, removeDealWorker);
    yield takeLatest(UPDATE_DEAL, updateDealWorker);
    yield takeLatest(OPENED_FRIEND, fetchOpenedFriendWorker);
    yield takeLatest(AUTH_ME, authMeWorker);
    yield takeLatest(LOGOUT_USER, logOutUserWorker);
    yield takeLatest(UPDATE_USER, updateUserNameWorker);
    yield takeLatest(LOGOUT_AND_REMOVE_USER, logOutAndRemoveUserWorker);
}

export default function* rootSaga() {
    yield watchClickSaga();
}
