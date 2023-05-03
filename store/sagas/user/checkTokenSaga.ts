import { put } from '@redux-saga/core/effects';
import { setAppStatus, setCurrentUser, setIsLogged } from '~/store/actions/actions';
import { RequestStatus } from '~/store/reducers/appReducer';

export function* checkTokenWorker() {
    try {
        yield put(setAppStatus({ status: RequestStatus.LOADING }));
        // @ts-ignore
        const token: string | null = yield JSON.parse(localStorage.getItem('token'));
        // @ts-ignore
        const currentUser: IUser | null = yield JSON.parse(localStorage.getItem('currentUser'));

        // @ts-ignore
        const res = yield fetch(`http://localhost:4000/user/deals`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // @ts-ignore
        const data = yield res.json();

        yield put(setCurrentUser({ currentUser }));

        console.log('data', data);

        if (data?.message?.includes('User is not authorized')) {
            yield put(setIsLogged({ isLogged: false }));
            return;
        }

        yield put(setIsLogged({ isLogged: true }));
        yield put(setAppStatus({ status: RequestStatus.SUCCEEDED }));
        console.log(data);
    } catch (error: any) {
        console.warn(error);
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
