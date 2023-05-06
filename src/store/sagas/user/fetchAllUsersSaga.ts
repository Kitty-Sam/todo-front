import { put, select } from '@redux-saga/core/effects';
import { setAllUsers, setAppStatus } from '~/store/actions/actions';
import { RequestStatus } from '~/store/reducers/appReducer';

import axios from 'axios';
import { IUser } from '~/store/reducers/userReducer';
import { getCurrentUser } from '~/store/selectors/userSelector';

export function* fetchAllUsersWorker() {
    try {
        yield put(setAppStatus({ status: RequestStatus.LOADING }));

        const currentUser: IUser = yield select(getCurrentUser);

        // @ts-ignore
        const { data } = yield axios.get('http://localhost:4000/user/users', { withCredentials: true });

        const normalizeData: IUser[] = data.map((el: any) => ({
            id: el._id,
            name: el.name,
            email: el.email,
            deals: el.deals,
            friends: el.friends,
        }));

        yield put(setAllUsers({ allUsers: normalizeData.filter((user) => user.email !== currentUser.email) }));
        yield put(setAppStatus({ status: RequestStatus.SUCCEEDED }));
    } catch (error: any) {
        console.warn(error);
        yield put(setAllUsers({ allUsers: [] }));
        yield put(setAppStatus({ status: RequestStatus.FAILED }));
    }
}
