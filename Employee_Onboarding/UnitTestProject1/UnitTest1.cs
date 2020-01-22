using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Employee_Onboarding.Accessory_Classes;
using Employee_Onboarding.Features;
using Employee_Onboarding.Models;

namespace UnitTestProject1
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void LoginAttempt_Validate()
        {
            var responsestring = "Successfull";
            var loginresult = DatabaseAction.LoginAttempt("P100", "P100Psiog", out Employee emp);
            Assert.AreEqual(responsestring, loginresult);
        }

        [TestMethod]
        public void LoginAttempt_Passwordcheck()
        {
            var responsestring = "Password is Wrong";
            var loginresult = DatabaseAction.LoginAttempt("P100", "P100Psio", out Employee emp);
            Assert.AreEqual(responsestring, loginresult);
        }

        [TestMethod]
        public void LoginAttempt_InvalidCredentials()
        {
            var responsestring = "Invalid Credentials";
            var loginresult = DatabaseAction.LoginAttempt("P1000", "P100Psio", out Employee emp);
            Assert.AreEqual(responsestring, loginresult);
        }
    }
}
