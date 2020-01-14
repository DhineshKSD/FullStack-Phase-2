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
    public class ProofController : ApiController
    {
        private EmployeeOnboardingEntities db = new EmployeeOnboardingEntities();


        [ResponseType(typeof(Proof))]
        [Route("api/GetProofs")]
        public IHttpActionResult GetProofs()
        {
            try
            {
                var listOfProof = db.Proofs.Select(emp => new
                {
                    Proof_id = emp.Proof_id,
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
        public IHttpActionResult GetProof(string id)
        {
            try
            {
                var empId = DatabaseAction.GetEmployeeID(id);
                if (empId != null)
                {
                    var listOfProof = db.Proofs.Where(x => x.Employee_id == empId).Select(emp => new
                    {
                        Proof_id = emp.Proof_id,
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
        public IHttpActionResult AddProof(string id, Proof proof)
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

        [HttpPost]                                                        //All three Proof in a single entry
        [Route("api/AddAllProof/{id=id}")]
        [ResponseType(typeof(Proof))]
        public IHttpActionResult PostProof(string id, List<Proof> proof)
        {
            try
            {
                var empid = DatabaseAction.GetEmployeeID(id);
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                foreach (var vp in proof)
                {
                    db.Proofs.Add(vp);
                }
                db.SaveChanges();
                return Ok("Employee proof Details Successfully Added");
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }

        [HttpPut]                                                        //All three Proof in a single entry
        [Route("api/PutAllProof/{id=id}")]
        [ResponseType(typeof(Proof))]
        public IHttpActionResult PutProof(string id, List<Proof> proof)
        {
            try
            {
                var empid = DatabaseAction.GetEmployeeID(id);
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                foreach (var vp in proof)
                {
                    db.Entry(vp).State = EntityState.Modified;
                }
                

                db.SaveChanges();
                return Ok("Proof Details Updated Successfully");
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return BadRequest();
            }
        }
    }
}
