import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  
  try {
    const data = await resend.emails.send({
      from: 'APEX UGC <contact@apexugc.agency>', // must stay on verified domain
      to: 'marccoruss48@gmail.com', // now goes to your Gmail
      subject: body.subject || 'New Request',
      text: body.message || 'No message provided',
    });

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: String(error) }), { status: 500 });
  }
}

