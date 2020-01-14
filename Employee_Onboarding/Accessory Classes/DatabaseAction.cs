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
                using (EmployeeOnboardingEntities db = new EmployeeOnboardingEntities())
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
                using (EmployeeOnboardingEntities db = new EmployeeOnboardingEntities())
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
                using (EmployeeOnboardingEntities db = new EmployeeOnboardingEntities())
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
                using (EmployeeOnboardingEntities db = new EmployeeOnboardingEntities())
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
                using (EmployeeOnboardingEntities db = new EmployeeOnboardingEntities())
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
                using (EmployeeOnboardingEntities db = new EmployeeOnboardingEntities())
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
    }
}