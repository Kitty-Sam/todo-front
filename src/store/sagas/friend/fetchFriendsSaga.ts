import { put } from '@redux-saga/core/effects';
import { setAppStatus, setFriends } from '~/store/actions/actions';
import { RequestStatus } from '~/store/reducers/appReducer';
import axios from 'axios';

export function* fetchFriendsWorker() {
    try {
        yield put(setAppStatus({ status: RequestStatus.LOADING }));

        // @ts-ignore
        const { data } = yield axios.get('http://localhost:4000/user/friends', { withCredentials: true });

        yield put(setFriends({ friends: data }));
        yield put(setAppStatus({ status: RequestStatus.SUCCEEDED }));
    } catch (error: any) {
        console.warn(error);
        yield put(setFriends({ friends: [] }));
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
