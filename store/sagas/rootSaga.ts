import { takeLatest } from '@redux-saga/core/effects';
import {
    ADD_DEAL,
    ADD_FRIEND,
    FETCH_ALL_USERS,
    FETCH_DEALS,
    FETCH_FRIENDS,
    LOGIN_USER,
    REGISTER_USER,
    REMOVE_DEAL,
    REMOVE_FRIEND,
    UPDATE_DEAL,
} from '~/store/sagas/sagasActions/type';
import { fetchAllUsersWorker } from '~/store/sagas/fetchAllUsersSaga';
import { fetchFriendsWorker } from '~/store/sagas/fetchFriendsSaga';
import { registerUserWorker } from '~/store/sagas/registerUserSaga';
import { loginUserWorker } from '~/store/sagas/loginUserSaga';
import { addFriendWorker } from '~/store/sagas/addFriendSaga';
import { removeFriendWorker } from '~/store/sagas/removeFriendSaga';
import { fetchDealsWorker } from '~/store/sagas/fetchDealsSaga';
import { addDealWorker } from '~/store/sagas/addDealSaga';
import { removeDealWorker } from '~/store/sagas/removeDealSaga';
import { updateDealWorker } from '~/store/sagas/updateDealSaga';

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
}

export default function* rootSaga() {
    yield watchClickSaga();
}
