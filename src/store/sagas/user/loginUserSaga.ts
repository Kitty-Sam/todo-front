import { call, put } from '@redux-saga/core/effects';
import { setAppStatus, setCurrentUser, setIsLogged } from '~/store/actions/actions';
import { RequestStatus } from '~/store/reducers/appReducer';
import { LoginUser } from '~/store/sagas/sagasActions/actions/loginUser';
import Router from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';

export enum Routes {
    HOME = '/',
    LOGIN = '/login',
}
export function* loginUserWorker({ payload }: LoginUser) {
    try {
        yield put(setAppStatus({ status: RequestStatus.LOADING }));

        yield axios.post('http://localhost:4000/auth/login', payload, { withCredentials: true });

        // @ts-ignore
        const { data } = yield axios.post(
            'http://localhost:4000/user/get-user-by-email',
            { email: payload.email },
            { withCredentials: true },
        );

        yield put(
            setCurrentUser({
                currentUser: {
                    name: data.name,
                    email: data.email,
                    friends: data.friends,
                    deals: data.deals,
                    id: data.id,
                },
            }),
        );

        yield put(setIsLogged({ isLogged: true }));
        yield call(Router.push, Routes.HOME);
        yield put(setAppStatus({ status: RequestStatus.SUCCEEDED }));
        yield call(toast, `Welcome back ${data.name}`);
    } catch (error: any) {
        yield call(toast, 'Check credentials');
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
