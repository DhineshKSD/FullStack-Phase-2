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
    public class ProofController : ApiController
    {
        private EmployeeOnboardingEntities db = new EmployeeOnboardingEntities();


        [ResponseType(typeof(Proof))]
        [Route("api/GetProofs")]
        public IHttpActionResult GetPreviousEmployments()
        {
            try
            {
                var listOfProof = db.Proofs.Select(emp => new
                {
                    ID = emp.Proof_id,
                    Employee_id = emp.Employee_id,
                    ProofCode = emp.ProofCode,
                    ProofName = emp.ProofName,
                    ProofId = emp.ProofId,
                });

                return Ok(listOfProof.ToList());
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("api/GetProof/{id=id}")]
        [ResponseType(typeof(Proof))]
        public IHttpActionResult GetPreviousEmployment(string id)
        {
            try
            {
                var empId = DatabaseAction.GetEmployeeID(id);
                if (empId != null)
                {
                    var listOfProof = db.Proofs.Where(x => x.Employee_id == empId).Select(emp => new
                    {
                        ID = emp.Proof_id,
                        Employee_id = emp.Employee_id,
                        ProofCode = emp.ProofCode,
                        ProofName = emp.ProofName,
                        ProofId = emp.ProofId,
                    });
                    return Ok(listOfProof.ToList());
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
        [Route("api/AddProof/{id=id}")]
        [ResponseType(typeof(Proof))]
        public IHttpActionResult AddPreviousEmployment(string id, Proof proof)
        {
            try
            {
                proof.Employee_id = DatabaseAction.GetEmployeeID(id);
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.Proofs.Add(proof);
                db.SaveChanges();
                return Ok("Employee proof Details Successfully Added");
            }

            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }
    }
}
