//app actions
export enum AppActions {
    APP_SET_ERROR = 'app_set_error',
    APP_SET_STATUS = 'app_set_status',
}

//auth actions
export enum AuthActions {
    IS_LOGGED = 'is_logged',
    SET_CURRENT_USER = 'set_current_user',
}

//user actions
export enum UserActions {
    FETCH_ALL_USERS = 'fetch_all_users',
    FETCH_FRIENDS = 'fetch_friends',
    FETCH_DEALS = 'fetch_deals',
    FETCH_OPENED_FRIEND = 'fetch_opened_friend',
}
