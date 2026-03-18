import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, message } = body;

    // 1. Establish the connection using your .env credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    // 2. Route the dispatch to the new inbox
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "elleandez321@gmail.com", // ALL LEADS DROP HERE NOW
      replyTo: email,               // You can still hit "Reply" to talk to the client
      subject: `🚨 AURA PRIORITY: New Client Inquiry from ${email}`,
      text: `AURA SECURE TRANSMISSION\n\nClient Email: ${email}\n\nMessage Log:\n"${message}"\n\n---\nTo respond to this client, simply click 'Reply' on this email. The transmission will be routed directly to their personal inbox.`,
    };

    await transporter.sendMail(mailOptions);

    // 3. The cold, automated confirmation back to the widget
    const autoReply = `Transmission successful. Your file has been locked and routed to a Founding Partner. You will receive a direct response at ${email} shortly. Do not submit duplicate requests.`;

    return NextResponse.json({ reply: autoReply });

  } catch (error) {
    console.error("Transmission Error:", error);
    return NextResponse.json(
      { reply: "Secure connection interrupted. Signal dropped." },
      { status: 500 }
    );
  }
}