const cookieOptions = {
  secure: true,
  httpOnly: true,
};

const setCookie = (response, cookieName, value, expiration = 86400) => {
  const expirationMilliseconds = expiration * 1000;
  response.cookie(cookieName, value, {
    ...cookieOptions,
    maxAge: expirationMilliseconds,
  });
};

const clearCookie = (response, cookieName) => {
  response.clearCookie(cookieName, cookieOptions);
};

module.exports = { setCookie, clearCookie };
