﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Employee_Onboarding.Accessory_Classes
{
    public class LogFile
    {
        public static void WriteLog(Exception ex) //To keep track of Exceptions
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
        public static void LoginLog(string Name,int id) //To keep track of Login activities
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
        public static void AddEmployeeLog(string Name, int id,string Job,string Dept,DateTime DateOfJoining) //To keep track of when new employee is Added
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
        public static void OnboardInitiateLog(string Name,string Job, string Dept, DateTime DateOfJoining,string Email) //To keep track of Onboarding Initiation Details
        {
            string filePath;
            filePath = System.IO.Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), "OnboardInitiateLog");
            if (!File.Exists(filePath))
            {
                File.Create(filePath).Dispose();
            }
            using (StreamWriter writer = new StreamWriter(filePath, true))
            {
                writer.WriteLine("-----------------------------------------------------------------------------");
                writer.WriteLine("Date : " + DateTime.Now.ToString());
                writer.WriteLine();


                writer.WriteLine("Onboarding Initiated for" + "\n" +"* Employee Name - " + Name + "\n" + "* Designation - " + Job + "\n" + "* Department - " + Dept + "\n" + "* DOJ - " + DateOfJoining + "\n" + "* Email - " + Email);
            }
        }
        public static void SubmissionLog(long id)
        {
            string filePath;
            filePath = System.IO.Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), "OnboardInitiateLog");
            if (!File.Exists(filePath))
            {
                File.Create(filePath).Dispose();
            }
            using (StreamWriter writer = new StreamWriter(filePath, true))
            {
                writer.WriteLine("-----------------------------------------------------------------------------");
                writer.WriteLine("Date : " + DateTime.Now.ToString());
                writer.WriteLine();


                writer.WriteLine("Pre-Joining Forms Submitted by an Employee With Employee id -" +id+ "\n");
            }
        }
    }
}