import { put } from '@redux-saga/core/effects';
import { setAppStatus, setCurrentUser, setIsLogged } from '~/store/actions/actions';
import { RequestStatus } from '~/store/reducers/appReducer';
import { IUser } from '~/store/reducers/authReducer';

export function* logOutUserWorker() {
    try {
        yield put(setAppStatus({ status: RequestStatus.LOADING }));

        yield localStorage.clear();

        yield put(
            setCurrentUser({
                currentUser: {} as IUser,
            }),
        );

        yield put(setIsLogged({ isLogged: false }));

        yield put(setAppStatus({ status: RequestStatus.SUCCEEDED }));
    } catch (error: any) {
        console.warn(error);
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
