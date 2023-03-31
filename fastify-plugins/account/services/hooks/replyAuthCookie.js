function replyAuthCookie(reply, token) {
    reply.setCookie(
        "shopshop-cookie",
        token,
        {
            path: "/",
            secure: false, // send cookie over HTTPS only
            httpOnly: true,
            sameSite: true // alternative CSRF protection
        }
    );
    return reply;
}

module.exports = replyAuthCookie;