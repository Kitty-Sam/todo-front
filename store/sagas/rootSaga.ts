import { takeLatest } from '@redux-saga/core/effects';
import { FETCH_ALL_USERS, FETCH_FRIENDS, LOGIN_USER, REGISTER_USER } from '~/store/sagas/sagasActions/type';
import { fetchAllUsersWorker } from '~/store/sagas/fetchAllUsersSaga';
import { fetchFriendsWorker } from '~/store/sagas/fetchFriendsSaga';
import { registerUserWorker } from '~/store/sagas/registerUserSaga';
import { loginUserWorker } from '~/store/sagas/loginUserSaga';

export function* watchClickSaga() {
    console.log('run saga');
    yield takeLatest(FETCH_ALL_USERS, fetchAllUsersWorker);
    yield takeLatest(FETCH_FRIENDS, fetchFriendsWorker);
    yield takeLatest(REGISTER_USER, registerUserWorker);
    yield takeLatest(LOGIN_USER, loginUserWorker);
}

export default function* rootSaga() {
    yield watchClickSaga();
}
