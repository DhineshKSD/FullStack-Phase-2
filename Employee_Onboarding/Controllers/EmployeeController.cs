using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
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
       // public string PasswordBeforeHash;

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
                    MailStatus = r.MailStatus,
                    Salt=r.Salt,
                    HashedPassword=r.HashedPassword,
                    SubmissionStatus=r.SubmissionStatus,

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

        [ResponseType(typeof(Employee))]
        [Route("api/GetEmployeeByUserId/{id=id}")]
        public IHttpActionResult GetEmployeeByUserId(string id)
        {
            try
            {
                var empId = DatabaseAction.GetEmployeeID(id);
                Employee employee = db.Employees.Find(empId);
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

        [HttpGet]
        [Route("api/GetEmployeeById/{id=id}")]
        [ResponseType(typeof(Employee))]
        public IHttpActionResult GetPersonalInfo(string id)
        {
            try
            {
                var empId = DatabaseAction.GetEmployeeID(id);
                Employee employee = db.Employees.Find(empId);
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
                return Ok("Employee Details Updated Successfully");
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }

        [HttpPut]
        [ResponseType(typeof(void))]
        [Route("api/PutEmployeeByUserId/{id=id}")]
        public IHttpActionResult EmployeeByUserId(string id, Employee employee)
        {
            var empId = DatabaseAction.GetEmployeeID(id);
            try
            {
                employee.Employee_id = DatabaseAction.GetEmployeeID(id);
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }


                db.Entry(employee).State = EntityState.Modified;

                db.SaveChanges();
                return Ok("Employee Details Updated Successfully");
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
               // PasswordBeforeHash = employee.Password;
                employee.HashedPassword= Hash.GenerateHash(employee.Password);
                employee.Salt = Hash.GenerateSalt(64);
                db.Employees.Add(employee);
                db.SaveChanges();
                LogFile.AddEmployeeLog(employee.FirstName, employee.Employee_id, employee.JobTitle, employee.Department, employee.DOJ);
                return new Response
                {
                    Status = "Success",
                    Message = "Employee Data Posted Successfully"
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

        [HttpGet]
        [Route("api/SendMail/{id=id}")]
        [ResponseType(typeof(Employee))]
        public object SendMail(int id)
        {
            try
            {
                Employee employee = db.Employees.Find(id);

                var userName = employee.UserName;
                var pass = employee.Password;
                Mail.EmailGeneration(employee.PersonalEmail, employee.FirstName, userName, pass);

                return new Response
                {
                    Status = "Success",
                    Message = "Mail Sent Successfully"
                };
            }

            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
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
