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
    
    public partial class Education
    {
        public int Education_id { get; set; }
        public int Employee_id { get; set; }
        public string Course { get; set; }
        public string CourseCode { get; set; }
        public string Institute { get; set; }
        public float GradePoint { get; set; }
        public System.DateTime From { get; set; }
        public System.DateTime To { get; set; }
        public long YearOfPassing { get; set; }
    
        public virtual Employee Employee { get; set; }
    }
}
