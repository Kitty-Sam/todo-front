//app actions
export enum AppActions {
    APP_SET_ERROR = 'app_set_error',
    APP_SET_STATUS = 'app_set_status',
}

//auth actions
export enum AuthActions {
    IS_LOGGED = 'is_logged',
    SET_CURRENT_USER = 'set_current_user',
    SET_TOKEN = 'set_token',
}

//user actions
export enum UserActions {
    ADD_DEAL = 'add_deal',
    REMOVE_DEAL = 'remove_deal',
    UPDATE_DEAL = 'update_deal',
    ADD_FRIEND = 'add_friend',
    REMOVE_FRIEND = 'remove_friend',
    FETCH_ALL_USERS = 'fetch_all_users',
    FETCH_FRIENDS = 'fetch_friends',
    FETCH_DEALS = 'fetch_deals',
}
