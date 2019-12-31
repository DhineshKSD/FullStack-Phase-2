//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Employee_Onboarding.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Employee
    {
        public Employee()
        {
            this.Educations = new HashSet<Education>();
            this.PersonalInfoes = new HashSet<PersonalInfo>();
            this.PreviousEmployments = new HashSet<PreviousEmployment>();
            this.Proofs = new HashSet<Proof>();
            this.Documents = new HashSet<Document>();
        }
    
        public int Employee_id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PersonalEmail { get; set; }
        public long Contact { get; set; }
        public string JobTitle { get; set; }
        public string Department { get; set; }
        public long Compensation { get; set; }
        public System.DateTime DOJ { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string ReportingTo { get; set; }
        public bool isAdmin { get; set; }
    
        public virtual ICollection<Education> Educations { get; set; }
        public virtual ICollection<PersonalInfo> PersonalInfoes { get; set; }
        public virtual ICollection<PreviousEmployment> PreviousEmployments { get; set; }
        public virtual ICollection<Proof> Proofs { get; set; }
        public virtual ICollection<Document> Documents { get; set; }
    }
}
