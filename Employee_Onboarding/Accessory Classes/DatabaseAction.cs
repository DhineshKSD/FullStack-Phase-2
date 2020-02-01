using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
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

        public static void ConvertImage(long id)
        {
            // Convert byte[] to Image
            string filePath = @"C:\Users\dhinesh.ks\Documents\";
            
            using (EmployeeOnboardingEntities1 db = new EmployeeOnboardingEntities1())
            {
                var g = (from imge in db.Documents.Where(u => u.Employee_id == id)
                         select new
                         {
                             imge.Data
                         }).FirstOrDefault().Data;
                var h = (from username in db.Employees.Where(u => u.Employee_id == id)
                         select new
                         {
                             username.FirstName
                         }).FirstOrDefault().FirstName;
                string name = h + "Sign.png";
                string last = g.Substring(g.LastIndexOf(',') + 1);
                byte[] imageBytes = Convert.FromBase64String(last);
                MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length);
                ms.Write(imageBytes, 0, imageBytes.Length);
                ms.Position = 0;
                System.Drawing.Image image = System.Drawing.Image.FromStream(ms, true);
                System.Drawing.Image img = Base64ToImage(last);
                img.Save(filePath+name, System.Drawing.Imaging.ImageFormat.Png);
            }
        }

        public static void ConvertImage1(long id)
        {
            // Convert byte[] to Image
            string filePath = @"C:\Users\dhinesh.ks\Documents\";

            using (EmployeeOnboardingEntities1 db = new EmployeeOnboardingEntities1())
            {
                var g = (from imge in db.Proofs.Where(u => u.Employee_id == id)
                         select new
                         {
                             imge.ProofId
                         }).FirstOrDefault().ProofId;
                var h = (from username in db.Employees.Where(u => u.Employee_id == id)
                         select new
                         {
                             username.FirstName
                         }).FirstOrDefault().FirstName;
                string name = h + ".jpeg";
                string last = g.Substring(g.LastIndexOf(',') + 1);
                byte[] imageBytes = Convert.FromBase64String(last);
                MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length);
                ms.Write(imageBytes, 0, imageBytes.Length);
                ms.Position = 0;
                System.Drawing.Image image = System.Drawing.Image.FromStream(ms, true);
                System.Drawing.Image img = Base64ToImage(last);
                img.Save(filePath + name, System.Drawing.Imaging.ImageFormat.Jpeg);
            }
        }

        public static System.Drawing.Image Base64ToImage(string base64String)
        {
            byte[] imageBytes = Convert.FromBase64String(base64String);
            MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length);
            ms.Write(imageBytes, 0, imageBytes.Length);
            System.Drawing.Image image = System.Drawing.Image.FromStream(ms, true);
            return image;
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
                    var a1 = (from pdf in db.Educations.Where(u => u.Employee_id == id && u.CourseCode == "HSC")
                             select new
                             {
                                 pdf.Course
                             }).FirstOrDefault().Course;
                    var a2 = (from pdf in db.Educations.Where(u => u.Employee_id == id && u.CourseCode == "HSC")
                              select new
                              {
                                  pdf.Institute
                              }).FirstOrDefault().Institute;
                    var a3 = (from pdf in db.Educations.Where(u => u.Employee_id == id && u.CourseCode == "HSC")
                              select new
                              {
                                  pdf.GradePoint
                              }).FirstOrDefault().GradePoint;
                    var a4 = (from pdf in db.Educations.Where(u => u.Employee_id == id && u.CourseCode == "HSC")
                              select new
                              {
                                  pdf.From
                              }).FirstOrDefault().From;
                    var a5 = (from pdf in db.Educations.Where(u => u.Employee_id == id && u.CourseCode == "HSC")
                              select new
                              {
                                  pdf.To
                              }).FirstOrDefault().To;
                    var b1 = (from pdf in db.Educations.Where(u => u.Employee_id == id && u.CourseCode == "SSLC")
                              select new
                              {
                                  pdf.Course
                              }).FirstOrDefault().Course;
                    var b2 = (from pdf in db.Educations.Where(u => u.Employee_id == id && u.CourseCode == "SSLC")
                              select new
                              {
                                  pdf.Institute
                              }).FirstOrDefault().Institute;
                    var b3 = (from pdf in db.Educations.Where(u => u.Employee_id == id && u.CourseCode == "SSLC")
                              select new
                              {
                                  pdf.GradePoint
                              }).FirstOrDefault().GradePoint;
                    var b4 = (from pdf in db.Educations.Where(u => u.Employee_id == id && u.CourseCode == "SSLC")
                              select new
                              {
                                  pdf.From
                              }).FirstOrDefault().From;
                    var b5 = (from pdf in db.Educations.Where(u => u.Employee_id == id && u.CourseCode == "SSLC")
                              select new
                              {
                                  pdf.To
                              }).FirstOrDefault().To;
                    PDF.PrintReceipt(a, b, c, d, e, f, g, h, i, j, k, l, m, o, p, q, r, s, t,a1,a2,a3,a4,a5,b1,b2,b3,b4,b5);
                }
            }
            catch (Exception ex)
            {
                LogFile.WriteLog(ex);
            }
        }
    }
}