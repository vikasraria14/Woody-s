import jsPDF from 'jspdf';

import logo from './logo.png'
export const downloadBill = (data) => {
    
     const doc = new jsPDF();
  
    // doc.setFontSize(16);
    doc.setFont("helvetica");
    // doc.setTextColor('#333333');
    
  // Set font style for the document
doc.setFont("helvetica");

// Set initial y-coordinate for positioning elements
let y = 50;

// Add company logo
doc.addImage(logo, "PNG", 140, 10, 50, 50);

// Add company name and address
doc.setFontSize(12);
doc.text("Woody's Automotive", 10, y);
doc.text("1234 Elm Street", 10, y + 10);
doc.text("Suite 567", 10, y + 20);
doc.text("Springfield, IL 62704", 10, y + 30);

// Add invoice title
doc.setFontSize(24);
doc.text("Invoice", doc.internal.pageSize.width / 2, 30, "center");

// Add customer information
doc.setFontSize(14);
    
    doc.text(`Date: ${(data.date).toLocaleString()}`,40,120);
    doc.text(`Name: ${data.name}`,40,130);
    doc.text(`Username: ${data.username}`,40,140);
    doc.text(`City: ${data.city}`,40,150);
    doc.text(`Make: ${data.make}`,40,160);
    doc.text(`Model: ${data.model}`,40,170);
    doc.text(`Year of Purchase: ${data.year}`,40,180);
    doc.text(`License Plate: ${data.licensePlate}`,40,190);
    doc.text(`Mileage: ${data.mileage}`,40,200);
    doc.text(`Last Service Date: ${data.lastServiceDate}`,40,210);
    doc.text(`Service Type: ${data.serviceType}`,40,220);
    doc.text(`Cost :$${data.cost}`,40,230);
    
  
    // // Save the PDF file
    // const pdfBlob = doc.output('blob');
    // saveAs(pdfBlob, 'data.pdf');




    //const doc = new jsPDF()//"p", "pt", "letter");




// Add invoice total
doc.setFontSize(16);
doc.text(`Total Amount: $${data.cost}`, doc.internal.pageSize.width - 120, doc.internal.pageSize.height - 40);

// Save the PDF
doc.save("invoice.pdf");


};
