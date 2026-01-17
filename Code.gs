// Google Apps Script Code.gs
// This script handles form submissions from the Phixels website
// It supports multiple form types: master, contact, newsletter

function doPost(e) {
  try {
    const params = e.parameter;
    const formType = params.formType || 'master'; // Default to master if not specified

    Logger.log('Received form submission: ' + formType);
    Logger.log('Parameters: ' + JSON.stringify(params));

    switch (formType) {
      case 'master':
        return handleMasterForm(params);
      case 'contact':
      case 'contactMessages':
        return handleContactForm(params);
      case 'newsletter':
        return handleNewsletterForm(params);
      case 'job':
      case 'JobApplications':
        return handleJobForm(params);
      default:
        Logger.log('Unknown form type: ' + formType);
        return ContentService
          .createTextOutput(JSON.stringify({ success: false, error: 'Unknown form type' }))
          .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: 'Server error: ' + error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleMasterForm(params) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); // Wait up to 30 seconds for the lock

    const {
      fullName,
      email,
      phone,
      country,
      budget,
      description,
      file,
      requestId,
      isFinal,
      meetingDate,
      meetingTime
    } = params;

    // Get or create the spreadsheet
    const spreadsheetId = '1GRVRXDgdr0HzrhFxOxMZqVyz9QlO5Jgt-cTqH8rUHjQ'; // Updated Spreadsheet ID
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName('ProjectsRequest') || spreadsheet.insertSheet('ProjectsRequest');

    // Set headers if not exist
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 12).setValues([[
        'Timestamp', 'Request ID', 'Full Name', 'Email', 'Phone', 'Country', 'Budget',
        'Description', 'File URL', 'Is Final', 'Meeting Date', 'Meeting Time'
      ]]);
    }

    // Handle file upload if present
    let fileUrl = '';
    if (file && file !== '') {
      try {
        const projectFilesFolderId = '1PTm46lpYDgbZTFMKaFc94XMtqFwKJFAM'; // Phixels_Project_Files folder
        fileUrl = uploadFileToDrive(file, fullName, requestId, projectFilesFolderId);
      } catch (fileError) {
        Logger.log('File upload error: ' + fileError.toString());
        // Continue without file
      }
    }

    // Check if this is an update (isFinal = true) or new entry
    let rowIndex = -1;
    if (isFinal === 'true') {
      // Find existing row with same requestId
      const data = sheet.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) { // Start from row 2 (index 1)
        if (data[i][1] === requestId) { // Request ID is in column 2 (index 1)
          rowIndex = i + 1; // +1 because sheet rows are 1-indexed
          break;
        }
      }
    }

    const timestamp = new Date();

    if (rowIndex > 0) {
      // Update existing row
      sheet.getRange(rowIndex, 1, 1, 12).setValues([[
        timestamp,
        requestId,
        fullName,
        email,
        phone,
        country,
        budget,
        description,
        fileUrl,
        isFinal,
        meetingDate || '',
        meetingTime || ''
      ]]);
    } else {
      // Append new row
      sheet.appendRow([
        timestamp,
        requestId,
        fullName,
        email,
        phone,
        country,
        budget,
        description,
        fileUrl,
        isFinal,
        meetingDate || '',
        meetingTime || ''
      ]);
    }

    // Send email based on step
    if (isFinal === 'true') {
      Logger.log('Sending final emails for: ' + fullName);
      sendFinalConfirmationEmail(email, fullName, meetingDate, meetingTime);
      sendAdminNotification(email, fullName, phone, country, budget, description, fileUrl, meetingDate, meetingTime);
    } else {
      Logger.log('Sending initial emails for: ' + fullName);
      sendInitialConfirmationEmail(email, fullName);
      sendInitialAdminNotification(email, fullName, phone, country, budget, description, fileUrl);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Master form processed successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function handleContactForm(params) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); // Wait up to 30 seconds for the lock

    const { name, email, phone, message, country } = params;

    // Get or create the spreadsheet
    const spreadsheetId = '1GRVRXDgdr0HzrhFxOxMZqVyz9QlO5Jgt-cTqH8rUHjQ'; // Updated Spreadsheet ID
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName('ContactMessages') || spreadsheet.insertSheet('ContactMessages');

    // Check and update headers if necessary
    const expectedHeaders = ['Timestamp', 'Name', 'Email', 'Phone', 'Country', 'Message'];
    const currentHeaders = sheet.getRange(1, 1, 1, expectedHeaders.length).getValues()[0];
    const headersMatch = expectedHeaders.every((header, index) => currentHeaders[index] === header);

    if (!headersMatch) {
      sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
    }

    // Append data to sheet
    const timestamp = new Date();
    sheet.appendRow([
      timestamp,
      name,
      email,
      phone,
      country,
      message
    ]);

    // Send confirmation email
    sendContactConfirmationEmail(email, name);

    // Send admin notification
    sendContactAdminNotification(name, email, phone, country, message);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Contact form processed successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function handleNewsletterForm(params) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); // Wait up to 30 seconds for the lock

    const { email } = params;

    // Get or create the spreadsheet
    const spreadsheetId = '1GRVRXDgdr0HzrhFxOxMZqVyz9QlO5Jgt-cTqH8rUHjQ'; // Updated Spreadsheet ID
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName('Newsletter') || spreadsheet.insertSheet('Newsletter');

    // Set headers if not exist
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 2).setValues([[
        'Timestamp', 'Email'
      ]]);
    }

    // Check if email already exists
    const data = sheet.getDataRange().getValues();
    const emailExists = data.some(row => row[1] === email);

    if (emailExists) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'Email already subscribed' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Append data to sheet
    const timestamp = new Date();
    sheet.appendRow([
      timestamp,
      email
    ]);

    // Send confirmation email
    sendNewsletterConfirmationEmail(email);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Newsletter subscription processed successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function handleJobForm(params) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); // Wait up to 30 seconds for the lock

    const { name, email, portfolio, jobTitle, file } = params;

    // Get or create the spreadsheet
    const spreadsheetId = '1GRVRXDgdr0HzrhFxOxMZqVyz9QlO5Jgt-cTqH8rUHjQ'; // Updated Spreadsheet ID
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName('JobApplications') || spreadsheet.insertSheet('JobApplications');

    // Set headers if not exist
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 6).setValues([[
        'Timestamp', 'Name', 'Email', 'Portfolio', 'Job Title', 'Resume URL'
      ]]);
    }

    // Handle file upload if present
    let resumeUrl = '';
    if (file && file !== '') {
      try {
        const jobResumesFolderId = '14biiXgOQeppz4JNdTn4bt7BOx_pNe95Q'; // Phixels_Job_Resumes folder
        resumeUrl = uploadFileToDrive(file, name, `Job_${jobTitle}`, jobResumesFolderId);
      } catch (fileError) {
        Logger.log('File upload error: ' + fileError.toString());
        // Continue without file
      }
    }

    // Append data to sheet
    const timestamp = new Date();
    sheet.appendRow([
      timestamp,
      name,
      email,
      portfolio,
      jobTitle,
      resumeUrl
    ]);

    // Send confirmation email
    sendJobConfirmationEmail(email, name, jobTitle);

    // Send admin notification
    sendJobAdminNotification(name, email, portfolio, jobTitle, resumeUrl);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Job application processed successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function uploadFileToDrive(base64Data, fullName, requestId, folderId) {
  const folder = DriveApp.getFolderById(folderId);

  // Remove data URL prefix if present
  const base64 = base64Data.replace(/^data:[^;]+;base64,/, '');
  const decodedData = Utilities.base64Decode(base64);

  // Extract MIME type from data URL
  const mimeTypeMatch = base64Data.match(/^data:([^;]+)/);
  const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'application/pdf';

  // Determine file extension based on MIME type
  let extension = 'pdf';
  if (mimeType === 'application/msword') extension = 'doc';
  else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') extension = 'docx';
  else if (mimeType === 'image/jpeg') extension = 'jpg';
  else if (mimeType === 'image/png') extension = 'png';
  else if (mimeType === 'application/pdf') extension = 'pdf';

  const fileName = `${fullName}_${requestId}_${new Date().getTime()}.${extension}`;

  const file = folder.createFile(Utilities.newBlob(decodedData, mimeType, fileName));
  file.setDescription(`Uploaded by ${fullName} for request ${requestId}`);

  return file.getUrl();
}

function sendInitialConfirmationEmail(email, fullName) {
  const subject = 'Thank you for your interest in Phixels!';
  const body = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #ED1F24;">Welcome to Phixels!</h1>
      <p>Dear ${fullName},</p>
      <p>Thank you for reaching out to us. We've received your initial information and are excited to learn more about your project.</p>
      <p>Our team will review your details and get back to you within 24 hours to discuss your requirements and schedule a consultation.</p>
      <p>In the meantime, feel free to explore our portfolio and case studies on our website.</p>
      <p>Best regards,<br>The Phixels Team</p>
      <div style="margin-top: 30px; padding: 20px; background-color: #f5f5f5; border-radius: 5px;">
        <p style="margin: 0;"><strong>Need immediate assistance?</strong></p>
        <p style="margin: 5px 0;">WhatsApp: +880 1723 289090</p>
        <p style="margin: 5px 0;">Email: phixels.io@gmail.com</p>
      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: body
  });
}

function sendFinalConfirmationEmail(email, fullName, meetingDate, meetingTime) {
  const subject = 'Your Phixels Consultation is Confirmed!';
  const body = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #ED1F24;">Consultation Confirmed!</h1>
      <p>Dear ${fullName},</p>
      <p>Great news! Your consultation with our team has been scheduled.</p>
      <div style="background-color: #ED1F24; color: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin: 0 0 10px 0;">Meeting Details:</h3>
        <p style="margin: 5px 0;"><strong>Date:</strong> ${meetingDate}</p>
        <p style="margin: 5px 0;"><strong>Time:</strong> ${meetingTime}</p>
        <p style="margin: 5px 0;"><strong>Platform:</strong> Google Meet (link will be sent 15 minutes before)</p>
      </div>
      <p>Please prepare any additional details about your project that you'd like to discuss. We're looking forward to speaking with you!</p>
      <p>Best regards,<br>The Phixels Team</p>
    </div>
  `;

  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: body
  });
}

function sendAdminNotification(email, fullName, phone, country, budget, description, fileUrl, meetingDate, meetingTime) {
  const subject = `New Project Inquiry: ${fullName}`;
  const body = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #ED1F24;">New Project Inquiry</h1>
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3>Client Details:</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Description:</strong> ${description}</p>
        ${fileUrl ? `<p><strong>File:</strong> <a href="${fileUrl}">View Uploaded File</a></p>` : ''}
      </div>
      <div style="background-color: #ED1F24; color: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin: 0 0 10px 0;">Scheduled Meeting:</h3>
        <p style="margin: 5px 0;"><strong>Date:</strong> ${meetingDate}</p>
        <p style="margin: 5px 0;"><strong>Time:</strong> ${meetingTime}</p>
      </div>
      <p>Please prepare for the consultation and review the client's requirements.</p>
    </div>
  `;

  // Send to admin email
  MailApp.sendEmail({
    to: 'phixels.io@gmail.com', // Replace with admin email
    subject: subject,
    htmlBody: body
  });
}

function sendInitialAdminNotification(email, fullName, phone, country, budget, description, fileUrl) {
  try {
    const subject = `New Project Inquiry Started: ${fullName}`;
    const body = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #ED1F24;">New Project Inquiry - Step 1 Completed</h1>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Client Details:</h3>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Budget:</strong> ${budget}</p>
          <p><strong>Description:</strong> ${description}</p>
          ${fileUrl ? `<p><strong>File:</strong> <a href="${fileUrl}">View Uploaded File</a></p>` : ''}
        </div>
        <div style="background-color: #FFF3CD; color: #856404; padding: 15px; border-radius: 5px; margin: 20px 0; border: 1px solid #FFEAA7;">
          <p style="margin: 0;"><strong>Status:</strong> Client has completed initial form. Waiting for meeting booking (Step 2).</p>
          <p style="margin: 5px 0 0 0;">If they don't complete Step 2 within 2-3 minutes, this may be an abandoned inquiry.</p>
        </div>
        <p>Please monitor for the final booking confirmation.</p>
      </div>
    `;

    // Send to admin email
    MailApp.sendEmail({
      to: 'phixels.io@gmail.com',
      subject: subject,
      htmlBody: body
    });
    Logger.log('Initial admin notification sent for: ' + fullName);
  } catch (error) {
    Logger.log('Error sending initial admin notification: ' + error.toString());
  }
}

function sendContactConfirmationEmail(email, name) {
  try {
    const subject = 'Thank you for contacting Phixels!';
    const body = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #ED1F24;">Thank You for Reaching Out!</h1>
        <p>Dear ${name},</p>
        <p>We've received your message and appreciate you taking the time to contact us.</p>
        <p>Our team will review your inquiry and get back to you within 24 hours.</p>
        <p>In the meantime, feel free to explore our services and portfolio on our website.</p>
        <p>Best regards,<br>The Phixels Team</p>
        <div style="margin-top: 30px; padding: 20px; background-color: #f5f5f5; border-radius: 5px;">
          <p style="margin: 0;"><strong>Need immediate assistance?</strong></p>
          <p style="margin: 5px 0;">WhatsApp: +880 1723 289090</p>
          <p style="margin: 5px 0;">Email: phixels.io@gmail.com</p>
        </div>
      </div>
    `;

    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: body
    });
    Logger.log('Contact confirmation email sent to: ' + email);
  } catch (error) {
    Logger.log('Error sending contact confirmation email: ' + error.toString());
  }
}

function sendContactAdminNotification(name, email, phone, country, message) {
  try {
    const subject = `New Contact Form Submission: ${name}`;
    const body = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #ED1F24;">New Contact Form Submission</h1>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Contact Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
        <p>Please respond to this inquiry as soon as possible.</p>
      </div>
    `;

    MailApp.sendEmail({
      to: 'phixels.io@gmail.com', // Replace with admin email
      subject: subject,
      htmlBody: body
    });
    Logger.log('Contact admin notification sent for: ' + name);
  } catch (error) {
    Logger.log('Error sending contact admin notification: ' + error.toString());
  }
}

function sendNewsletterConfirmationEmail(email) {
  const subject = 'Welcome to Phixels Newsletter!';
  const body = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #ED1F24;">Welcome to Our Newsletter!</h1>
      <p>Thank you for subscribing to Phixels newsletter.</p>
      <p>You'll now receive regular updates about:</p>
      <ul>
        <li>Latest technology trends</li>
        <li>Our new projects and case studies</li>
        <li>Industry insights and tips</li>
        <li>Exclusive offers and promotions</li>
      </ul>
      <p>Stay tuned for valuable content that will help you stay ahead in the digital world.</p>
      <p>Best regards,<br>The Phixels Team</p>
      <div style="margin-top: 30px; padding: 20px; background-color: #f5f5f5; border-radius: 5px;">
        <p style="margin: 0;"><strong>Questions or feedback?</strong></p>
        <p style="margin: 5px 0;">Email: phixels.io@gmail.com</p>
      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: body
  });
}

function sendJobConfirmationEmail(email, name, jobTitle) {
  const subject = `Thank you for applying to ${jobTitle} at Phixels!`;
  const body = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #ED1F24;">Application Received!</h1>
      <p>Dear ${name},</p>
      <p>Thank you for your interest in the ${jobTitle} position at Phixels.</p>
      <p>We have received your application and resume. Our HR team will carefully review your qualifications and experience.</p>
      <p>You will hear back from us within 5-6 business days regarding next steps in the recruitment process.</p>
      <p>We appreciate your patience and look forward to potentially working together.</p>
      <p>Best regards,<br>The Phixels Recruitment Team</p>
      <div style="margin-top: 30px; padding: 20px; background-color: #f5f5f5; border-radius: 5px;">
        <p style="margin: 0;"><strong>Questions about your application?</strong></p>
        <p style="margin: 5px 0;">Email: phixels.io@gmail.com</p>
      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: body
  });
}

function sendJobAdminNotification(name, email, portfolio, jobTitle, resumeUrl) {
  const subject = `New Job Application: ${jobTitle} - ${name}`;
  const body = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #ED1F24;">New Job Application</h1>
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3>Applicant Details:</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Portfolio:</strong> ${portfolio}</p>
        <p><strong>Position:</strong> ${jobTitle}</p>
        ${resumeUrl ? `<p><strong>Resume:</strong> <a href="${resumeUrl}">View Resume</a></p>` : ''}
      </div>
      <p>Please review the application and respond accordingly.</p>
    </div>
  `;

  // Send to admin email
  MailApp.sendEmail({
    to: 'phixels.io@gmail.com', // Replace with admin email
    subject: subject,
    htmlBody: body
  });
}