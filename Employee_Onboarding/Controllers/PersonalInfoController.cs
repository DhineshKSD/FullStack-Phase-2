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
    public class PersonalInfoController : ApiController
    {
        private EmployeeOnboardingEntities db = new EmployeeOnboardingEntities();


        [ResponseType(typeof(PersonalInfo))]
        [Route("api/GetPersonalInfoes")]
        public IHttpActionResult GetPersonalInfoes()
        {
            try
            {
                var listOfPersonalInfo = db.PersonalInfoes.Select(emp => new
                {
                    PersonalInfo_id = emp.PersonalInfo_id,
                    Employee_id = emp.Employee_id,
                    Gender = emp.Gender,
                    DateOfBirth = emp.DateOfBirth,
                    PlaceOfBirth = emp.PlaceOfBirth,
                    MaritalStatus = emp.MaritalStatus,
                    BloodGroup = emp.BloodGroup
                });

                return Ok(listOfPersonalInfo.ToList());
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("api/GetPersonalInfo/{id=id}")]
        [ResponseType(typeof(PersonalInfo))]
        public IHttpActionResult GetPersonalInfo(string id)
        {
            try
            {
                var empId = DatabaseAction.GetEmployeeID(id);
                if (empId != null)
                {
                    var listOfPersonalInfo = db.PersonalInfoes.Where(x => x.Employee_id == empId).Select(emp => new
                    {
                        PersonalInfo_id = emp.PersonalInfo_id,
                        Employee_id = emp.Employee_id,
                        Gender = emp.Gender,
                        DateOfBirth = emp.DateOfBirth,
                        PlaceOfBirth = emp.PlaceOfBirth,
                        MaritalStatus = emp.MaritalStatus,
                        BloodGroup = emp.BloodGroup
                    });
                    return Ok(listOfPersonalInfo.ToList());
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
        [Route("api/AddPersonalInfo/{id=id}")]
        [ResponseType(typeof(PreviousEmployment))]
        public IHttpActionResult AddPersonalInfo(string id, PersonalInfo personalinfo)
        {
            try
            {
                personalinfo.Employee_id = DatabaseAction.GetEmployeeID(id);
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.PersonalInfoes.Add(personalinfo);
                db.SaveChanges();
                return Ok("Employee PersonalInfo Details Successfully Added");
            }

            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }

        [HttpPut]                                                        //All three Proof in a single entry
        [Route("api/PutPersonalInfo/{id=id}")]
        [ResponseType(typeof(Proof))]
        public IHttpActionResult PutPersonalInfo(string id, List<Education> education)
        {
            try
            {
                var empid = DatabaseAction.GetEmployeeID(id);
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                foreach (var vp in education)
                {
                    db.Entry(vp).State = EntityState.Modified;
                }


                db.SaveChanges();
                return Ok("Education Details Updated Successfully");
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }

        [HttpPut]
        [ResponseType(typeof(void))]
        [Route("api/PutPersonalInfo1/{id=id}")]
        public IHttpActionResult PutPersonalInfo1(string id, PersonalInfo personalinfo)
        {
            try
            {
                personalinfo.Employee_id = DatabaseAction.GetEmployeeID(id);
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }


                db.Entry(personalinfo).State = EntityState.Modified;

                db.SaveChanges();
                return Ok("Personalinfo Details Updated Successfully");
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }
    }
}
