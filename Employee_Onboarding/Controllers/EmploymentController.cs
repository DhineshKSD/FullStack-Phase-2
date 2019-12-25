using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Employee_Onboarding;
using Employee_Onboarding.Accessory_Classes;
using Employee_Onboarding.Models;

namespace Employee_Onboarding.Controllers
{
    public class EmploymentController : ApiController
    {
        private EmployeeOnboardingEntities db = new EmployeeOnboardingEntities();


        [ResponseType(typeof(PreviousEmployment))]
        [Route("api/GetPreviousEmployments")]
        public IHttpActionResult GetPreviousEmployments()
        {
            try
            {
                var listOfPreviousEmployment = db.PreviousEmployments.Select(emp => new
                {
                    PreviousEmployment_id = emp.PreviousEmployment_id,
                    Employee_id = emp.Employee_id,
                    EmployerName = emp.EmployerName,
                    StartDate = emp.StartDate,
                    EndDate = emp.EndDate,
                    Designation = emp.Designation,
                    Salary = emp.Salary
                });

                return Ok(listOfPreviousEmployment.ToList());
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("api/GetPreviousEmployment/{id=id}")]
        [ResponseType(typeof(PreviousEmployment))]
        public IHttpActionResult GetPreviousEmployment(string id)
        {
            try
            {
                var empId = DatabaseAction.GetEmployeeID(id);
                if (empId != null)
                {
                    var listOfPreviousEmployment = db.PreviousEmployments.Where(x => x.Employee_id == empId).Select(emp => new
                    {
                        PreviousEmployment_id = emp.PreviousEmployment_id,
                        Employee_id = emp.Employee_id,
                        EmployerName = emp.EmployerName,
                        StartDate = emp.StartDate,
                        EndDate = emp.EndDate,
                        Designation = emp.Designation,
                        Salary = emp.Salary
                    });
                    return Ok(listOfPreviousEmployment.ToList());
                }
                else
                {
                    return BadRequest("Not Found");
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }
        [HttpPost]
        [Route("api/AddPreviousEmployment/{id=id}")]
        [ResponseType(typeof(PreviousEmployment))]
        public IHttpActionResult AddPreviousEmployment(string id, PreviousEmployment previousemployment)
        {
            try
            {
                previousemployment.Employee_id = DatabaseAction.GetEmployeeID(id);
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.PreviousEmployments.Add(previousemployment);
                db.SaveChanges();
                return Ok("Employee PreviousEmployments Details Successfully Added");
            }

            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }


        [HttpPut]
        [ResponseType(typeof(void))]
        [Route("api/PutPreviousEmployment/{id=id}")]
        public IHttpActionResult PutPreviousEmployment(string id, PreviousEmployment previousemployment)
        {
            try
            {
                previousemployment.Employee_id = DatabaseAction.GetEmployeeID(id);
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }


                db.Entry(previousemployment).State = EntityState.Modified;

                db.SaveChanges();
                return Ok("Previous Employment Details Updated Successfully");
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }
    }
}
