using System;
using System.Collections.Generic;
using System.Linq;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Drawing;
using iText.Layout.Element;

namespace Employee_Onboarding.Accessory_Classes
{
    public class PDF
    {
        public static void PrintReceipt(string name,long id,DateTime Day,string lastname,string dept,string email,DateTime dob,string gender,string maritalstatus,string address1,string city1,string state1,string country1,string role,string course,string institute,float mark, DateTime from, DateTime to)
        {
            try
            {
                #region Common Part
                PdfPTable pdfTableBlank = new PdfPTable(1);

                //Footer Section
                PdfPTable pdfTableFooter = new PdfPTable(1);
                pdfTableFooter.DefaultCell.BorderWidth = 0;
                pdfTableFooter.WidthPercentage = 100;
                pdfTableFooter.DefaultCell.HorizontalAlignment = Element.ALIGN_CENTER;

                PdfPTable pdfTableFooter1 = new PdfPTable(1);
                pdfTableFooter1.DefaultCell.BorderWidth = 0;
                pdfTableFooter1.WidthPercentage = 100;
                pdfTableFooter1.DefaultCell.HorizontalAlignment = Element.ALIGN_CENTER;

                PdfPTable pdfTableFooter2 = new PdfPTable(1);
                pdfTableFooter2.DefaultCell.BorderWidth = 0;
                pdfTableFooter2.WidthPercentage = 100;
                pdfTableFooter2.DefaultCell.HorizontalAlignment = Element.ALIGN_CENTER;

                Chunk cnkFooter = new Chunk("General Information", FontFactory.GetFont("Currier"));
                //cnkFooter.Font.SetStyle(1);
                cnkFooter.Font.Size = 16;
                pdfTableFooter.AddCell(new Phrase(cnkFooter));
                //End Of Footer Section

                Chunk cnkFooter1= new Chunk("Address Information", FontFactory.GetFont("Currier"));
                //cnkFooter.Font.SetStyle(1);
                cnkFooter1.Font.Size = 16;
                pdfTableFooter1.AddCell(new Phrase(cnkFooter1));

                Chunk cnkFooter2 = new Chunk("UnderGraduate Education Information", FontFactory.GetFont("Currier"));
                //cnkFooter.Font.SetStyle(1);
                cnkFooter2.Font.Size = 16;
                pdfTableFooter2.AddCell(new Phrase(cnkFooter2));

                pdfTableBlank.AddCell(new Phrase(" "));
                pdfTableBlank.DefaultCell.Border = 0;
                #endregion

                #region Page
                #region Section-1

                PdfPTable pdfTable1 = new PdfPTable(1);//Here 1 is Used For Count of Column
                PdfPTable pdfTable2 = new PdfPTable(1);
                PdfPTable pdfTable6 = new PdfPTable(1);
                PdfPTable pdfTable7 = new PdfPTable(2);
                PdfPTable pdfTable3 = new PdfPTable(2);
                PdfPTable pdfTable5 = new PdfPTable(2);

                //Font Style
                System.Drawing.Font fontH1 = new System.Drawing.Font("Currier", 16);

                //pdfTable1.DefaultCell.Padding = 5;
                pdfTable1.WidthPercentage = 80;
                pdfTable1.DefaultCell.HorizontalAlignment = Element.ALIGN_CENTER;
                pdfTable1.DefaultCell.VerticalAlignment = Element.ALIGN_CENTER;
                //pdfTable1.DefaultCell.BackgroundColor = new iTextSharp.text.BaseColor(64, 134, 170);
                pdfTable1.DefaultCell.BorderWidth = 0;


                //pdfTable1.DefaultCell.Padding = 5;
                pdfTable2.WidthPercentage = 80;
                pdfTable2.DefaultCell.HorizontalAlignment = Element.ALIGN_LEFT;
                pdfTable2.DefaultCell.VerticalAlignment = Element.ALIGN_LEFT;
                //pdfTab2e1.DefaultCell.BackgroundColor = new iTextSharp.text.BaseColor(64, 134, 170);
                pdfTable2.DefaultCell.BorderWidth = 0;

                pdfTable6.WidthPercentage = 80;
                pdfTable6.DefaultCell.HorizontalAlignment = Element.ALIGN_CENTER;
                pdfTable6.DefaultCell.VerticalAlignment = Element.ALIGN_CENTER;
                //pdfTab2e1.DefaultCell.BackgroundColor = new iTextSharp.text.BaseColor(64, 134, 170);
                pdfTable6.DefaultCell.BorderWidth = 0;

                pdfTable7.DefaultCell.Padding = 5;
                pdfTable7.WidthPercentage = 80;
                pdfTable7.DefaultCell.BorderWidth = 0.5f;

                pdfTable3.DefaultCell.Padding = 5;
                pdfTable3.WidthPercentage = 80;
                pdfTable3.DefaultCell.BorderWidth = 0.5f;

                pdfTable5.DefaultCell.Padding = 5;
                pdfTable5.WidthPercentage = 80;
                pdfTable5.DefaultCell.BorderWidth = 0.5f;


                Chunk c1 = new Chunk("Pre-Joining Form", FontFactory.GetFont("Times New Roman"));
                c1.Font.Color = new iTextSharp.text.BaseColor(0, 0, 0);
                c1.Font.SetStyle(0);
                c1.Font.Size = 14;
                Phrase p1 = new Phrase();
                p1.Add(c1);
                pdfTable1.AddCell(p1);
                Chunk c2 = new Chunk("Name : "+name, FontFactory.GetFont("Times New Roman"));
                c2.Font.Color = new iTextSharp.text.BaseColor(0, 0, 0);
                c2.Font.SetStyle(0);//0 For Normal Font
                c2.Font.Size = 11;
                Phrase p2 = new Phrase();
                p2.Add(c2);
                pdfTable2.AddCell(p2);
                Chunk c3 = new Chunk("Employee-Id : "+id, FontFactory.GetFont("Times New Roman"));
                c3.Font.Color = new iTextSharp.text.BaseColor(0, 0, 0);
                c3.Font.SetStyle(0);
                c3.Font.Size = 11;
                Phrase p3 = new Phrase();
                p3.Add(c3);
                pdfTable2.AddCell(p3);
                Chunk c8 = new Chunk("Department : " + dept, FontFactory.GetFont("Times New Roman"));
                c8.Font.Color = new iTextSharp.text.BaseColor(0, 0, 0);
                c8.Font.SetStyle(0);
                c8.Font.Size = 11;
                Phrase p8 = new Phrase();
                p8.Add(c8);
                pdfTable2.AddCell(p8);
                Chunk c9 = new Chunk("Role: " + role , FontFactory.GetFont("Times New Roman"));
                c9.Font.Color = new iTextSharp.text.BaseColor(0, 0, 0);
                c9.Font.SetStyle(0);
                c9.Font.Size = 11;
                Phrase p9 = new Phrase();
                p9.Add(c9);
                pdfTable2.AddCell(p9);
                Chunk c4 = new Chunk("Date.of.Joining : " + Day.ToString("dd/MM/yyyy"), FontFactory.GetFont("Times New Roman"));
                c4.Font.Color = new iTextSharp.text.BaseColor(0, 0, 0);
                c4.Font.SetStyle(0);
                c4.Font.Size = 11;
                Phrase p4 = new Phrase();
                p4.Add(c4);
                pdfTable2.AddCell(p4);
                Chunk c5 = new Chunk('\n', FontFactory.GetFont("Times New Roman"));
                c5.Font.Color = new iTextSharp.text.BaseColor(0, 0, 0);
                c5.Font.SetStyle(0);
                c5.Font.Size = 11;
                Phrase p5 = new Phrase();
                p5.Add(c5);
                pdfTable2.AddCell(p5);
                

                #endregion

                #region section Table
                pdfTable3.AddCell(new Phrase("FirstName "));
                pdfTable3.AddCell(new Phrase(name));
                pdfTable3.AddCell(new Phrase("LastName "));
                pdfTable3.AddCell(new Phrase(lastname));
                pdfTable3.AddCell(new Phrase("PersonalEmail"));
                pdfTable3.AddCell(new Phrase(email));
                pdfTable3.AddCell(new Phrase("Date.of.Birth"));
                pdfTable3.AddCell(new Phrase(dob.ToString("dd/MM/yyyy")));
                pdfTable3.AddCell(new Phrase("Gender"));
                pdfTable3.AddCell(new Phrase(gender));
                pdfTable3.AddCell(new Phrase("Marital Status"));
                pdfTable3.AddCell(new Phrase(maritalstatus));
                #endregion

                Chunk c6 = new Chunk('\n', FontFactory.GetFont("Times New Roman"));
                c6.Font.Color = new iTextSharp.text.BaseColor(0, 0, 0);
                c6.Font.SetStyle(0);
                c6.Font.Size = 11;
                Phrase p6 = new Phrase();
                p6.Add(c6);
                pdfTable2.AddCell(p6);

                Chunk c7 = new Chunk('\n', FontFactory.GetFont("Times New Roman"));
                c7.Font.Color = new iTextSharp.text.BaseColor(0, 0, 0);
                c7.Font.SetStyle(0);
                c7.Font.Size = 11;
                Phrase p7 = new Phrase();
                p7.Add(c7);
                pdfTable6.AddCell(p7);

                #region section Table2
                pdfTable5.AddCell(new Phrase("Address"));
                pdfTable5.AddCell(new Phrase(address1));
                pdfTable5.AddCell(new Phrase("City"));
                pdfTable5.AddCell(new Phrase(city1));
                pdfTable5.AddCell(new Phrase("State"));
                pdfTable5.AddCell(new Phrase(state1));
                pdfTable5.AddCell(new Phrase("Country"));
                pdfTable5.AddCell(new Phrase(country1));
                #endregion

                #region section Table3
                pdfTable7.AddCell(new Phrase("Course"));
                pdfTable7.AddCell(new Phrase(course));
                pdfTable7.AddCell(new Phrase("Institute"));
                pdfTable7.AddCell(new Phrase(institute));
                pdfTable7.AddCell(new Phrase("GradePoint"));
                pdfTable7.AddCell(new Phrase(Convert.ToString(mark)));
                pdfTable7.AddCell(new Phrase("From"));
                pdfTable7.AddCell(new Phrase(from.ToString("dd/MM/yyyy")));
                pdfTable7.AddCell(new Phrase("To"));
                pdfTable7.AddCell(new Phrase(to.ToString("dd/MM/yyyy")));

                #endregion
                #endregion


                #region Pdf Generation
                string folderPath = @"C:\Users\dhinesh.ks\Documents\";
                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                //File Name
                int fileCount = Directory.GetFiles(@"C:\Users\dhinesh.ks\Documents\").Length;
                string strFileName = name + "Pre-JoiningForm" + (fileCount + 1) + ".pdf";

                using (FileStream stream = new FileStream(folderPath + strFileName, FileMode.Create))
                {
                    Document pdfDoc = new Document(PageSize.A4, 10f, 10f, 10f, 0f);
                    PdfWriter.GetInstance(pdfDoc, stream);
                    pdfDoc.Open();
                    #region PAGE-1
                    pdfDoc.Add(pdfTable1);
                    pdfDoc.Add(pdfTable2);
                    pdfDoc.Add(pdfTableFooter);
                    pdfDoc.Add(pdfTableBlank);
                    pdfDoc.Add(pdfTable3);
                    pdfDoc.Add(pdfTableBlank);
                    pdfDoc.Add(pdfTable6);
                    pdfDoc.Add(pdfTableFooter1);
                    pdfDoc.Add(pdfTableBlank);
                    pdfDoc.Add(pdfTable5);
                    pdfDoc.Add(pdfTableBlank);
                    pdfDoc.Add(pdfTable6);
                    pdfDoc.Add(pdfTableFooter2);
                    pdfDoc.Add(pdfTableBlank);
                    pdfDoc.Add(pdfTable7);
                    pdfDoc.Add(pdfTableBlank);
                    pdfDoc.NewPage();
                    #endregion

                    // pdfDoc.Add(jpg);

                    //pdfDoc.Add(pdfTable2);
                    pdfDoc.Close();
                    stream.Close();
                }
                #endregion

               /*region Display PDF
                System.Diagnostics.Process.Start(folderPath + "\\" + strFileName);
                #endregion*/

            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}