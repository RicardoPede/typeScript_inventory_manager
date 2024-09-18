export interface AuthState {
    isAuthenticated: boolean;
}

export interface AppState {
    auth: AuthState;
}