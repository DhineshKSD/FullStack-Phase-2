using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace Employee_Onboarding.Accessory_Classes
{
    public class Mail
    {
        public static void EmailGeneration(string emailID,string name, string username,string password)
        {

            var fromEmail = new MailAddress("generateemail2019@gmail.com", "On-Board HUB");
            var toEmail = new MailAddress(emailID);
            var fromEmailPassword = "Psiog@123"; // Replace with actual password

            string subject = "";
            string body = "";
            
                subject = "Psiog Digital (P) Ltd - Pre Joining formalities ";
                body = "<br/><br/>" +
                    "Dear" +"  " + name + ";"+ "<br/><br/>" +
                    "Welcome to Psiog, the fastest growing IT services organisation! We are delighted that you have accepted our offer of employment and we look forward to welcoming you onboard."+
                    "To facilitate a smooth integration into Psiog's Environment, we request you to follow the instructions given below to access our onboarding portal to complete all the pre-joining formalities before day one of joining...Please use the following credentials to login to your Account"+
                    "<br/><br/> * UserName = " + username+ " <br/><br/>" +  "* Password = " +password+ "<br/><br/>"+
                    "Instruction: "+ "<br/><br/>" +
                    "1.) Kindly Login to 'Psiog On-Board Hub' using " + "<br/>" +
                    "2.) Section-1 . Fill your personal information and Address Details and click submit" + "<br/>" +
                    "3.) Section-2 . Fill your Education Details and click submit" + "<br/><br/>" +
                    "Note: Details can't be edited once the form is submitted.";


            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromEmail.Address, fromEmailPassword)
            };

            using (var message = new MailMessage(fromEmail, toEmail)
            {
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            })
                smtp.Send(message);
        }
    }
}