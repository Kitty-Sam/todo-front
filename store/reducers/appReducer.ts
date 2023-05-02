import { ActionsType, IApp } from './types';
import { AppActions } from '../actions/actionsTypes';

export enum RequestStatus {
  IDLE = 'IDLE',
  FAILED = 'FAILED',
  LOADING = 'LOADING',
  SUCCEEDED = 'SUCCEEDED',
}

const initialState: IApp = {
  status: RequestStatus.IDLE,
  error: false,
};

export const appReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case AppActions.APP_SET_STATUS:
      return { ...state, status: action.payload.status };

    case AppActions.APP_SET_ERROR: {
      return { ...state, error: action.payload.error };
    }
    default:
      return state;
  }
};
