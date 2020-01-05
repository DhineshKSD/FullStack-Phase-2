﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace Employee_Onboarding.Accessory_Classes
{
    public static class Hash
    {
        public static string GenerateSalt(int size)
        {
            var saltBytes = new byte[size];
            var provider = new RNGCryptoServiceProvider();
            provider.GetNonZeroBytes(saltBytes);
            var salt = Convert.ToBase64String(saltBytes);
            return (salt);
        }
        public static string GenerateHash(string password)
        {
            /*string returnStr = "";

            using (SHA256 sha256Hash = SHA256.Create())
            {
                // ComputeHash - returns byte array  
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));
                returnStr = System.Convert.ToBase64String(bytes);
            }
            return returnStr;*/
            var saltBytes = new byte[64];
           
            var rfc2898DeriveBytes = new Rfc2898DeriveBytes(password, saltBytes, 10000);
            var hashPassword = Convert.ToBase64String(rfc2898DeriveBytes.GetBytes(256));

            return hashPassword;
        }
        }
    }
   