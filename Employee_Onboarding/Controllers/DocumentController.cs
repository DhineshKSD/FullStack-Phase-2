using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using Employee_Onboarding.Accessory_Classes;
using Employee_Onboarding.Models;

namespace Employee_Onboarding.Controllers
{
    public class DocumentController : ApiController
    {
        private EmployeeOnboardingEntities1 db = new EmployeeOnboardingEntities1();
        [HttpPost]
        [ResponseType(typeof(Document))]
        [Route("api/AddDocument/")]
        public async Task<object> Uploadfile()
        {
            try
            {
                var fileuploadPath = "C:\\Users\\dhinesh.ks\\Downloads";

                var provider = new MultipartFormDataStreamProvider(fileuploadPath);
                var content = new StreamContent(HttpContext.Current.Request.GetBufferlessInputStream(true));
                foreach (var header in Request.Content.Headers)
                {
                    content.Headers.TryAddWithoutValidation(header.Key, header.Value);
                }
                await content.ReadAsMultipartAsync(provider);
                string uploadingFileName = provider.FileData.Select(x => x.LocalFileName).FirstOrDefault();
                string originalFileName = String.Concat(fileuploadPath, "\\" + (provider.Contents[0].Headers.ContentDisposition.FileName).Trim(new Char[] { '"' }));
                var filename = provider.Contents[0].Headers.ContentDisposition.FileName;
               
                File.Move(uploadingFileName, originalFileName);
                Document sf = new Document();
                sf.DocumentPath = filename;
                db.Documents.Add(sf);
                db.SaveChanges();
                return new Response
                {
                    Status = "Updated",
                    Message = "Updated Successfully"
                };
            }
            catch (Exception ex)
            {
                return new Response
                {
                    Status = "Error",
                    Message = "Error"
                };
            }

        }

    }
}

