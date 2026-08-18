import sendgrid from '@sendgrid/mail';
import { NextResponse } from 'next/server';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, businessEmail, position, organization, interest, message } = body;

    // Format the email that gets sent to your team
    const msg = {
      to: process.env.SENDGRID_TO_EMAIL as string,
      from: process.env.SENDGRID_FROM_EMAIL as string,
      subject: `New Advisory Intake: ${fullName} - ${organization}`,
      html: `
        <h3>New Advisory Intake Submission</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${businessEmail}</p>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Organization:</strong> ${organization}</p>
        <p><strong>Primary Interest:</strong> ${interest}</p>
        <p><strong>Challenge/Message:</strong><br/> ${message}</p>
      `,
    };

    await sendgrid.send(msg);
    return NextResponse.json({ success: true, message: 'Email sent successfully' });
    
  } catch (error) {
    // Cast the error so TypeScript stops complaining
    const err = error as any;
    
    // Print the exact reason SendGrid rejected the email
    console.error("SENDGRID REJECTION REASON:", err.response?.body || err.message);
    
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}