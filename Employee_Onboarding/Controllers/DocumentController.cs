using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using Employee_Onboarding.Accessory_Classes;
using Employee_Onboarding.Models;

namespace Employee_Onboarding.Controllers
{
    public class DocumentController : ApiController
    {
        private EmployeeOnboardingEntities1 db = new EmployeeOnboardingEntities1();

        [HttpGet]
        [Route("api/GetEmployeeDetailsById/{id=id}")]
        [ResponseType(typeof(Employee))]
        public IHttpActionResult GetDetailsForPdf(string id)
        {
            try
            {
                var empId = DatabaseAction.GetEmployeeID(id);
                DatabaseAction.PassDetails(empId);
                if (empId == null)
                {
                    return NotFound();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }
    }
}


