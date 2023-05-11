import { call, put } from '@redux-saga/core/effects';
import { setAppStatus } from '~/store/actions/actions';
import { RequestStatus } from '~/store/reducers/appReducer';
import { RegisterUser } from '~/store/sagas/sagasActions/actions/registerUser';

import axios from 'axios';
import Router from 'next/router';
import { Routes } from '~/store/sagas/user/loginUserSaga';
import { toast } from 'react-toastify';

export function* registerUserWorker({ payload }: RegisterUser) {
    try {
        yield put(setAppStatus({ status: RequestStatus.LOADING }));

        yield axios.post('http://localhost:4000/auth/register', payload);

        yield call(toast, 'Success!');

        yield call(Router.push, Routes.LOGIN);
    } catch (error: any) {
        yield call(toast, 'Check your credentials (password should contains min 4 symbols');
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
