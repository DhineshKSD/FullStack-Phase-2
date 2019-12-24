using System;
using System.Collections.Generic;
using System.Linq;
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
                        if (String.Compare(password, emp.Password) == 0)
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
    }
}