import { takeLatest } from '@redux-saga/core/effects';
import {
    ADD_FRIEND,
    FETCH_ALL_USERS,
    FETCH_DEALS,
    FETCH_FRIENDS,
    LOGIN_USER,
    REGISTER_USER,
    REMOVE_FRIEND,
} from '~/store/sagas/sagasActions/type';
import { fetchAllUsersWorker } from '~/store/sagas/fetchAllUsersSaga';
import { fetchFriendsWorker } from '~/store/sagas/fetchFriendsSaga';
import { registerUserWorker } from '~/store/sagas/registerUserSaga';
import { loginUserWorker } from '~/store/sagas/loginUserSaga';
import { addFriendWorker } from '~/store/sagas/addFriendSaga';
import { removeFriendWorker } from '~/store/sagas/removeFriendSaga';
import { fetchDealsWorker } from '~/store/sagas/fetchDealsSaga';

export function* watchClickSaga() {
    yield takeLatest(FETCH_ALL_USERS, fetchAllUsersWorker);
    yield takeLatest(FETCH_FRIENDS, fetchFriendsWorker);
    yield takeLatest(REGISTER_USER, registerUserWorker);
    yield takeLatest(LOGIN_USER, loginUserWorker);
    yield takeLatest(ADD_FRIEND, addFriendWorker);
    yield takeLatest(REMOVE_FRIEND, removeFriendWorker);
    yield takeLatest(FETCH_DEALS, fetchDealsWorker);
}

export default function* rootSaga() {
    yield watchClickSaga();
}
