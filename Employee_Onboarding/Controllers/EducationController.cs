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
    public class EducationController : ApiController
    {
        private EmployeeOnboardingEntities db = new EmployeeOnboardingEntities();


        [ResponseType(typeof(Education))]
        [Route("api/GetEducation")]
        public IHttpActionResult GetEducation()
        {
            try
            {
                var listOfEducations = db.Educations.Select(edu => new
                {
                    Education_id = edu.Education_id,
                    Employee_id = edu.Employee_id,
                    Course = edu.Course,
                    Institute = edu.Institute,
                    GradePoint = edu.GradePoint,
                    From = edu.From,
                    To = edu.To,
                    YearOfPassing = edu.YearOfPassing
                });

                return Ok(listOfEducations.ToList());
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("api/GetEducation/{id=id}")]
        [ResponseType(typeof(Education))]
        public IHttpActionResult GetAttendance(string id)
        {
            try
            {
                var empId = DatabaseAction.GetEmployeeID(id);
                if (empId != null)
                {
                    var listOfEducations = db.Educations.Where(x => x.Employee_id == empId).Select(edu => new
                    {
                        Education_id = edu.Education_id,
                        Employee_id = edu.Employee_id,
                        Course = edu.Course,
                        Institute = edu.Institute,
                        GradePoint = edu.GradePoint,
                        From = edu.From,
                        To = edu.To,
                        YearOfPassing = edu.YearOfPassing
                    });
                    return Ok(listOfEducations.ToList());
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
        [Route("api/AddEducation/{id=id}")]
        [ResponseType(typeof(Education))]
        public IHttpActionResult PostEducation(string id, Education education)
        {
            try
            {
                education.Employee_id = DatabaseAction.GetEmployeeID(id);
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.Educations.Add(education);
                db.SaveChanges();
                return Ok("Employee Education Details Successfully Added");
            }

            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }

        [HttpPut]
        [ResponseType(typeof(void))]
        [Route("api/PutEducation/{id=id}")]
        public IHttpActionResult PutEmployee(string id, Education education)
        {
            
            try
            {
                education.Employee_id = DatabaseAction.GetEmployeeID(id);
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }


                db.Entry(education).State = EntityState.Modified;

                db.SaveChanges();
                return Ok("Education Details Updated Successfully");
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("api/removeEducation/{id=id}")]
        [ResponseType(typeof(Education))]
        
        public IHttpActionResult DeleteEducation(int id)
        {
            Education education = db.Educations.Find(id);
            if (education == null)
            {
                return NotFound();
            }

            db.Educations.Remove(education);
            db.SaveChanges();

            return Ok(education);
        }
    }
}
