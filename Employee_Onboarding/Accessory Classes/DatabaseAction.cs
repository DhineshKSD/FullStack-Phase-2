using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Web;
using Employee_Onboarding.Models;

namespace Employee_Onboarding.Accessory_Classes
{
    public class DatabaseAction
    {
        public static string LoginAttempt(string username, string password, out Employee emp) //Login function
        {
            try
            {
                using (EmployeeOnboardingEntities1 db = new EmployeeOnboardingEntities1())
                {
                    emp = db.Employees.Where(l => l.UserName == username).FirstOrDefault();
                   
                    //password = PWHashing.Hash(password);
                    if (emp != null)
                    {
                        bool isPasswordMatched = VerifyPassword(password, emp.HashedPassword, emp.Salt);
                        if (isPasswordMatched)
                        {
                            return "Successfull";
                        }
                        else
                        {
                            emp = null;
                            return "Password is Wrong";
                        }
                    }
                    else
                    {
                        emp = null;
                        return "Invalid Credentials";
                    }
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                emp = null;
                return "Exception Caused";
            }
        }
        public static bool IsUsernameExist(string username) //Check User Name exists in the DB
        {
            try
            {
                using (EmployeeOnboardingEntities1 db = new EmployeeOnboardingEntities1())
                {
                    var v = db.Employees.Where(u => u.UserName == username).FirstOrDefault();
                    return v == null ? false : true;
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return false;
            }
        }
        public static bool IsCourseExist(int id, string course) //Check for the existence of same course details in the DB for an employee
        {
            try
            {
                using (EmployeeOnboardingEntities1 db = new EmployeeOnboardingEntities1())
                {
                    var res = db.Educations.Where(u => u.Employee_id == id && course == u.CourseCode).FirstOrDefault();

                    return res == null ? false : true;
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return false;
            }
        }

        public static bool IsPersonalInfoExist(int id) //Check for the existence of same personalInfo details in the DB for an employee
        {
            try
            {
                using (EmployeeOnboardingEntities1 db = new EmployeeOnboardingEntities1())
                {
                    var res = db.PersonalInfoes.Where(u => u.Employee_id == id).FirstOrDefault();

                    return res == null ? false : true;
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return false;
            }
        }
        public static bool IsEmailExist(string EmailID) //Check Email ID exists in the DB
        {
            try
            {
                using (EmployeeOnboardingEntities1 db = new EmployeeOnboardingEntities1())
                {
                    var v = db.Employees.Where(u => u.PersonalEmail == EmailID).FirstOrDefault();
                    return v == null ? false : true;
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return false;
            }

        }
        public static int GetEmployeeID(string userName) //Getting Employee id from the User Name
        {
            try
            {
                using (EmployeeOnboardingEntities1 db = new EmployeeOnboardingEntities1())
                {
                    var v = db.Employees.Where(u => u.UserName == userName).FirstOrDefault();
                    return v.Employee_id;
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
                return 0;
            }

        }
        public static bool VerifyPassword(string enteredPassword, string storedHash, string storedSalt) //Comparing Password with stored Hash and Salt during login
        {
            var saltBytes = new byte[64];

            var rfc2898DeriveBytes = new Rfc2898DeriveBytes(enteredPassword, saltBytes, 10000);
            var x = Convert.ToBase64String(rfc2898DeriveBytes.GetBytes(256));

            return string.Equals(x, storedHash);
        }
        public static void PassDetails(long id) //Getting Employee id from the User Name
        {
            try
            {
                using (EmployeeOnboardingEntities1 db = new EmployeeOnboardingEntities1())
                {
                    var a = (from pdf in db.Employees.Where(u => u.Employee_id == id) 
                             select new
                    {
                      pdf.FirstName 
                    }).FirstOrDefault().FirstName;
                    var b = (from pdf in db.Employees.Where(u => u.Employee_id == id)
                             select new
                             {
                                 pdf.Employee_id
                             }).FirstOrDefault().Employee_id;
                    var c = (from pdf in db.Employees.Where(u => u.Employee_id == id)
                             select new
                             {
                                 pdf.DOJ
                             }).FirstOrDefault().DOJ;
                    var d = (from pdf in db.Employees.Where(u => u.Employee_id == id)
                             select new
                             {
                                 pdf.LastName
                             }).FirstOrDefault().LastName;
                    var e = (from pdf in db.Employees.Where(u => u.Employee_id == id)
                             select new
                             {
                                 pdf.Department
                             }).FirstOrDefault().Department;
                    var f = (from pdf in db.Employees.Where(u => u.Employee_id == id)
                             select new
                             {
                                 pdf.PersonalEmail
                             }).FirstOrDefault().PersonalEmail;
                    var g = (from pdf in db.PersonalInfoes.Where(u => u.Employee_id == id)
                             select new
                             {
                                 pdf.DateOfBirth
                             }).FirstOrDefault().DateOfBirth;
                    var h = (from pdf in db.PersonalInfoes.Where(u => u.Employee_id == id)
                             select new
                             {
                                 pdf.Gender
                             }).FirstOrDefault().Gender;
                    var i = (from pdf in db.PersonalInfoes.Where(u => u.Employee_id == id)
                             select new
                             {
                                 pdf.MaritalStatus
                             }).FirstOrDefault().MaritalStatus;
                    var j = (from pdf in db.PersonalInfoes.Where(u => u.Employee_id == id)
                             select new
                             {
                                 pdf.Address1
                             }).FirstOrDefault().Address1;
                    var k = (from pdf in db.PersonalInfoes.Where(u => u.Employee_id == id)
                             select new
                             {
                                 pdf.City1
                             }).FirstOrDefault().City1;
                    var l = (from pdf in db.PersonalInfoes.Where(u => u.Employee_id == id)
                             select new
                             {
                                 pdf.State1
                             }).FirstOrDefault().State1;
                    var m = (from pdf in db.PersonalInfoes.Where(u => u.Employee_id == id)
                             select new
                             {
                                 pdf.Country1
                             }).FirstOrDefault().Country1;
                    var o = (from pdf in db.Employees.Where(u => u.Employee_id == id)
                             select new
                             {
                                 pdf.JobTitle
                             }).FirstOrDefault().JobTitle;
                    var p = (from pdf in db.Educations.Where(u => u.Employee_id == id && u.CourseCode == "UnderGraduate")
                             select new
                             {
                                 pdf.Course
                             }).FirstOrDefault().Course;
                    var q = (from pdf in db.Educations.Where(u => u.Employee_id == id && u.CourseCode == "UnderGraduate")
                             select new
                             {
                                 pdf.Institute
                             }).FirstOrDefault().Institute;
                    var r = (from pdf in db.Educations.Where(u => u.Employee_id == id && u.CourseCode == "UnderGraduate")
                             select new
                             {
                                 pdf.GradePoint
                             }).FirstOrDefault().GradePoint;
                    var s = (from pdf in db.Educations.Where(u => u.Employee_id == id && u.CourseCode == "UnderGraduate")
                             select new
                             {
                                 pdf.From
                             }).FirstOrDefault().From;
                    var t = (from pdf in db.Educations.Where(u => u.Employee_id == id && u.CourseCode == "UnderGraduate")
                             select new
                             {
                                 pdf.To
                             }).FirstOrDefault().To;
                    PDF.PrintReceipt(a, b, c, d, e, f, g, h, i, j, k, l, m, o, p, q, r, s, t);
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
            }
        }
    }
}