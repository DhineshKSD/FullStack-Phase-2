using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using Employee_Onboarding.Accessory_Classes;
using Employee_Onboarding.Authenticate;
using Employee_Onboarding.Models;
using Employee_Onboarding.Features;

namespace Employee_Onboarding.Controllers
{
    public class TokenController : ApiController
    {
        [HttpPost]
        [Route("token")]
        public IHttpActionResult GetToken(Login login)
        {
            try
            {
                if (DatabaseAction.LoginAttempt(login.userName, login.password, out Employee user) == "Successfull")
                {
                    var roles = "user";
                    if (user.isAdmin == true)
                    {
                        roles = "admin";
                    }
                    IAuthContainerModel model = GetJWTContainerModel(user.UserName, roles);
                    IAuthService authService = new JWTService(model.SecretKey);

                    string token = authService.GenerateToken(model);

                    if (!authService.IsTokenValid(token))
                        throw new UnauthorizedAccessException();
                    else
                    {
                        List<Claim> claims = authService.GetTokenClaims(token).ToList();

                    }
                    return Ok(token);
                }
                else
                {
                    return BadRequest("Invalid Credentials");
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }

        [NonAction]
        #region Private Methods
        private static JWTContainerModel GetJWTContainerModel(string username, string roles)
        {
            return new JWTContainerModel()
            {
                Claims = new Claim[]
                {
                    new Claim(ClaimTypes.Name, username),
                    new Claim(ClaimTypes.Role, roles)
                }
            };
        }
        #endregion
    }
}
