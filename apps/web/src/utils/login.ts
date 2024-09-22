export const getLoginHref = () => {
    const p = new URLSearchParams();
    p.set('client_id','514588497257-9knr5ftbqe8aliodn7tku5507grna6tq.apps.googleusercontent.com');
    p.set('redirect_uri',process.env.NEXT_PUBLIC_REDIRECT_URI);
    p.set('response_type','code');
    p.set('scope','https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile');
    p.set('access_type','offline');
    p.set('prompt','consent');
    return "https://accounts.google.com/o/oauth2/v2/auth?"+p.toString();
}

export const getCurrentTimeInSeconds = (): number => {
    const t = new Date().getTime();
    return parseInt(String(t / 1000));
};

export const isExpired = (timeInSeconds: number): boolean => {
    return timeInSeconds - getCurrentTimeInSeconds() < 0;
};
