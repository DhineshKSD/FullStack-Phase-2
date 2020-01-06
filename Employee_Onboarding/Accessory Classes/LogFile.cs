using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Employee_Onboarding.Accessory_Classes
{
    public class LogFile
    {
        public static void WriteLog(Exception ex)
        {
            string filePath;
            filePath = System.IO.Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), "LogFile");
            if (!File.Exists(filePath))
            {
                File.Create(filePath).Dispose();
            }
            using (StreamWriter writer = new StreamWriter(filePath, true))
            {
                writer.WriteLine("-----------------------------------------------------------------------------");
                writer.WriteLine("Date : " + DateTime.Now.ToString());
                writer.WriteLine();

                while (ex != null)
                {
                    writer.WriteLine(ex.GetType().FullName);
                    writer.WriteLine("Message : " + ex.Message);
                    writer.WriteLine("StackTrace : " + ex.StackTrace);

                    ex = ex.InnerException;
                }
            }
        }
        public static void LoginLog(string Name,int id)
        {
            string filePath;
            filePath = System.IO.Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), "LoginFile");
            if (!File.Exists(filePath))
            {
                File.Create(filePath).Dispose();
            }
            using (StreamWriter writer = new StreamWriter(filePath, true))
            {
                writer.WriteLine("-----------------------------------------------------------------------------");
                writer.WriteLine("Date : " + DateTime.Now.ToString());
                writer.WriteLine();

                
                writer.WriteLine("Login Attempt Made By the User - " + Name + " with an Employee Id - " + id);
            }
        }
        public static void AddEmployeeLog(string Name, int id,string Job,string Dept,DateTime DateOfJoining)
        {
            string filePath;
            filePath = System.IO.Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), "AddEmpLogFile");
            if (!File.Exists(filePath))
            {
                File.Create(filePath).Dispose();
            }
            using (StreamWriter writer = new StreamWriter(filePath, true))
            {
                writer.WriteLine("-----------------------------------------------------------------------------");
                writer.WriteLine("Date : " + DateTime.Now.ToString());
                writer.WriteLine();


                writer.WriteLine("* Employee Name - " + Name + "\n"+"* Employee Id - " + id + "\n" + "* Designation - " +Job + "\n" + "* Department - " +Dept + "\n" + "* DOJ - " +DateOfJoining);
            }
        }
    }
}