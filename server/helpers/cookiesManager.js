

const setCookie = (response,cookieName,value,expiration= 86400)=>{


        response.cookie(cookieName, value,{
          secure: true,
          httpOnly: true,
          // converting expiration to milliseconds
          maxAge: expiration * 1000
          }
        )
}

const clearCookie= (response,cookieName)=>{
  response.clearCookie(cookieName)
}


module.exports = {setCookie, clearCookie}