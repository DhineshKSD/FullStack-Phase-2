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
        public static void EmailGeneration(string emailID,string name, string username,string password, DateTime DOJ) //To Generate Mail When Onboarding is Initiated
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
                "                       " + " Welcome to Psiog's Family, the fastest growing IT services organisation! We are delighted that you have accepted our offer of employment and we look forward to welcoming you onboard. Your Date of Joining at Psiog is on " +DOJ.Date+ "."+
                "To facilitate a smooth integration into Psiog's Environment, we request you to follow the instructions given below to access our onboarding portal to complete all the pre-joining formalities before day one of joining.Please use the following credentials to login to your Account" +
                "<br/><br/>" + "<b>Login Credentials: </b>" + "<br/><br/>" + " <b>* UserName</b> = " + username + " <br/>" + "<b>* Password</b> = " + password + "<br/><br/></b>" +
                "<b>Instruction: </b>" + "<br/>" +
                "1.) <b>Step-1</b> : Click on <a href='http://localhost:3000/Login'>On-Board Hub</a> to go to the Psiog On-Board Hub portal login page." + "<br/>" +
                "2.) <b>Step-2</b> : Login in to the portal using the above credentials." + "<br/>" +
                "3.) <b>Step-3</b> : To Start filling all the pre-joining forms, Click the Kick-Off button on the right top of the HomePage." + "<br/>" +
                "4.) <b>Step-4</b> : Read the instructions on the appearing dialogue box and Click the checkbox to Start Filling." + "<br/>" +
                "5.) <b>Step-5</b> : Please Read and Fill the Form at each section carefully. Once the Section is submitted it can,t be edited. " + "<br/>" +
                "6.) <b>Step-6</b> : Section - 1 (Personal Information & Address Details) Fill and Click <b>Submit</b> button to access next section." + "<br/>" +
                "7.) <b>Step-7</b> : Section - 2 (Education Details) Fill and Click <b>Submit</b> button to save education details. Click <b>Finish</b> button to proceed access next section." + "<br/>" +
                "8.) <b>Step-8</b> : Section - 3 (Employment Details) Fill and Click <b>Save</b> button to Employment details. Click <b>Submit</b> to Complete the process." + "<br/><br/>" +
                "<b> Note <b/>: Please complete all the pre-joining forms and submit before the Date of Joining. Details can't be edited once the form is submitted." + "<br/><br/>" +
                "<img src=https://media.glassdoor.com/sqll/945068/psiog-digital-squarelogo-1468915701259.png />" + "<br/>" +
                "<b>Warm Regards</b>" + "<br/>" + "<b>HR Desk </b>" + "<br/><br/>" +
                "<b>Notice:</b> The information contained in this e-mail message and/ or attachments"+
                "to it may contain confidential or privileged information.If you are not the intended recipient, any dissemination, use review, distribution, printing or copying of the" +
                "information contained in this e - mail message and / or attachments to it are strictly prohibited. If you have received this communication in error, please notify us by reply e-mail or telephone and" +
                "immediately and permanently delete the message and any attachments. Thank you";


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

        public static void SubmissionEmailGeneration(string name, string username,string emailID) //To Generate Mail When Employee submits Pre-Joining Forms
        {

            var fromEmail = new MailAddress("psioghrdesk@gmail.com", "On-Board Hub");
            var toEmail = new MailAddress(emailID);
            var fromEmailPassword = "Psiog@123"; // Replace with actual password

            string subject = "";
            string body = "";


            subject = "Psiog Digital (P) Ltd";
            body = "<br/><br/>" +
                "<b> Dear  " + name + ";</b>" + "<br/><br/>" +
                "<b>UserName:</b>"+username+ "<br/>"+
                "Your form has been successfully submitted." +
                "<br/><br/>" +
                "<img src=https://media.glassdoor.com/sqll/945068/psiog-digital-squarelogo-1468915701259.png />" + "<br/>" +
                "<b>Warm Regards</b>" + "<br/>" + "<b>HR Desk </b>";

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