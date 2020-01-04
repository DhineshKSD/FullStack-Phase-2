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

            var fromEmail = new MailAddress("psioghrdesk@gmail.com", "On-Board Hub");
            var toEmail = new MailAddress(emailID);
            var fromEmailPassword = "Psiog@123"; // Replace with actual password

            string subject = "";
            string body = "";


                subject = "Psiog Digital (P) Ltd - Pre Joining formalities ";
            body = "<br/><br/>" +
                 "<img src=https://media.licdn.com/dms/image/C511BAQGHEv_vDRHNHg/company-background_10000/0?e=2159024400&v=beta&t=ukaxpdYFnbl9grLY-eSt0LrGyCD4J-G3yUXYFxMJ9Wg />" + "<br/><br/>" +
                "<b> Dear  " + name + ";</b>" + "<br/><br/>" +
                "Welcome to Psiog, the fastest growing IT services organisation! We are delighted that you have accepted our offer of employment and we look forward to welcoming you onboard." +
                "To facilitate a smooth integration into Psiog's Environment, we request you to follow the instructions given below to access our onboarding portal to complete all the pre-joining formalities before day one of joining...Please use the following credentials to login to your Account" +
                "<br/><br/><b> * UserName = " + username + " <br/><br/>" + "* Password = " + password + "<br/><br/></b>" +
                "<b>Instruction: </b>" + "<br/><br/>" +
                "1.) Kindly Login to 'Psiog On-Board Hub' using " + "<br/>" +
                "2.) Section-1 . Fill your personal information and Address Details and click submit" + "<br/>" +
                "3.) Section-2 . Fill your Education Details and click submit" + "<br/><br/>" +
                "<b> Note <b/>: Details can't be edited once the form is submitted." + "<br/><br/>" +
                "<img src=https://media.glassdoor.com/sqll/945068/psiog-digital-squarelogo-1468915701259.png />" + "<br/><br/>" +
                "<b>Warm Regards</b>" + "<br/>" + "<b>Hr Desk </b>";



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