﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class EmployeeOnboardingEntities1 : DbContext
    {
        public EmployeeOnboardingEntities1()
            : base("name=EmployeeOnboardingEntities1")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<Document> Documents { get; set; }
        public DbSet<Education> Educations { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<PersonalInfo> PersonalInfoes { get; set; }
        public DbSet<PreviousEmployment> PreviousEmployments { get; set; }
        public DbSet<Proof> Proofs { get; set; }
    }
}
