export type SessionBodyDto = {
    access_token: string,
    authuser: number,
    expires_in: number,
    prompt: string,
    scope: string,
    state: string,
    token_type: string
};
