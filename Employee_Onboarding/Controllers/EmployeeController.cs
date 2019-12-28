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
    public class EmployeeController : ApiController
    {
        private EmployeeOnboardingEntities db = new EmployeeOnboardingEntities();

        // GET: api/Employees
        [HttpGet]
        [Route("api/GetEmployees")]
        public object GetEmployees()
        {
            try
            {
                var listOfEmployees = db.Employees.Select(r => new
                {
                    Employee_id = r.Employee_id,
                    FirstName = r.FirstName,
                    LastName = r.LastName,
                    PersonalEmail = r.PersonalEmail,
                    Contact = r.Contact,
                    JobTitle = r.JobTitle,
                    Department = r.Department,
                    Compensation = r.Compensation,
                    DOJ = r.DOJ,
                    UserName = r.UserName,
                    Password = r.Password,
                    ReportingTo = r.ReportingTo,
                    isAdmin = r.isAdmin,
                });

                return listOfEmployees.ToList();
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }

        }

        // GET: api/Employees/5
        [ResponseType(typeof(Employee))]
        [Route("api/GetEmployee/{id=id}")]
        public IHttpActionResult GetEmployee(long id)
        {
            try
            {
                Employee employee = db.Employees.Find(id);
                if (employee == null)
                {
                    return NotFound();
                }
                return Ok(employee);
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }

        [HttpPut]
        [ResponseType(typeof(void))]
        [Route("api/PutEmployee/{id=id}")]
        public IHttpActionResult PutEmployee(int id, Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != employee.Employee_id)
            {
                return BadRequest();
            }

            db.Entry(employee).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
                return Ok("Updated Successfully");
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }

        // POST: api/Employees

        [HttpPost]
        [Route("api/signup/addEmployee")]
        [ResponseType(typeof(Employee))]
        public object PostEmployee(Employee employee)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                if (DatabaseAction.IsUsernameExist(employee.UserName))
                {
                    return BadRequest("Username Already Exists");
                }
                if (DatabaseAction.IsEmailExist(employee.PersonalEmail))
                {
                    return BadRequest("Email ID Already Exists");
                }
                db.Employees.Add(employee);
                db.SaveChanges();
                return new Response
                {
                    Status = "Success",
                    Message = "Data Successfully"
                };
            }

            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }

        // DELETE: api/Employees/5
        [HttpDelete]
        [Route("api/removeEmployee/{id=id}")]
        [ResponseType(typeof(Employee))]
        public IHttpActionResult DeleteEmployee(int id)
        {
            Employee employee = db.Employees.Find(id);
            if (employee == null)
            {
                return NotFound();
            }

            db.Employees.Remove(employee);
            db.SaveChanges();

            return Ok(employee);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EmployeeExists(int id)
        {
            return db.Employees.Count(e => e.Employee_id == id) > 0;
        }
    }
}
