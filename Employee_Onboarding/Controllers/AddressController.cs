using System;
using System.Collections.Generic;
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
    public class AddressController : ApiController
    {
        private EmployeeOnboardingEntities db = new EmployeeOnboardingEntities();


        [ResponseType(typeof(Address))]
        [Route("api/GetAddressess")]
        public IHttpActionResult GetAddress()
        {
            try
            {
                var listOfAddress = db.Addresses.Select(emp => new
                {
                    ID = emp.Address_id,
                    PersonalInfo_id = emp.PersonalInfo_id,
                    AddressCode = emp.AddressCode,
                    Address1 = emp.Address1,
                    City = emp.City,
                    State = emp.State,
                    Country = emp.Country
                });

                return Ok(listOfAddress.ToList());
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("api/GetAddress/{id=id}")]
        [ResponseType(typeof(Address))]
        public IHttpActionResult GetPersonalInfo(string id)
        {
            try
            {
                var empId = DatabaseAction.GetEmployeeID(id);
                if (empId != null)
                {
                    var listOfAddress = db.Addresses.Where(x => x.PersonalInfo_id == empId).Select(emp => new
                    {
                        ID = emp.Address_id,
                        PersonalInfo_id = emp.PersonalInfo_id,
                        AddressCode = emp.AddressCode,
                        Address1 = emp.Address1,
                        City = emp.City,
                        State = emp.State,
                        Country = emp.Country
                    });
                    return Ok(listOfAddress.ToList());
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
        [Route("api/AddAddress/{id=id}")]
        [ResponseType(typeof(Address))]
        public IHttpActionResult AddPreviousEmployment(string id, Address address)
        {
            try
            {
                address.PersonalInfo_id = DatabaseAction.GetEmployeeID(id);
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.Addresses.Add(address);
                db.SaveChanges();
                return Ok("Employee Addresses Details Successfully Added");
            }

            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }
    }
}
