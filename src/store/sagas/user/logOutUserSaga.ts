import { put } from '@redux-saga/core/effects';
import { setAppStatus, setIsLogged } from '~/store/actions/actions';
import { RequestStatus } from '~/store/reducers/appReducer';
import axios from 'axios';

export function* logOutUserWorker() {
    try {
        yield put(setAppStatus({ status: RequestStatus.LOADING }));

        yield axios.get('http://localhost:4000/auth/logout', { withCredentials: true });

        yield put(setIsLogged({ isLogged: false }));

        yield put(setAppStatus({ status: RequestStatus.SUCCEEDED }));
    } catch (error: any) {
        console.warn(error);
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
