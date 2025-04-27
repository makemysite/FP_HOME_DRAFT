
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailPayload {
  type: 'reply' | 'forward';
  recipientEmail: string;
  subject: string;
  message: string;
  originalMessage?: {
    name: string;
    email: string;
    message: string;
    created_at: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: EmailPayload = await req.json();
    console.log("Processing email request:", payload);

    let emailContent: string;
    let toEmail: string[];

    if (payload.type === 'forward') {
      emailContent = `
        New contact form submission from ${payload.originalMessage?.name}
        Email: ${payload.originalMessage?.email}
        Submitted on: ${new Date(payload.originalMessage?.created_at || '').toLocaleString()}
        
        Message:
        ${payload.originalMessage?.message}
      `;
      toEmail = ["info@fieldpromax.com"];
    } else {
      emailContent = payload.message;
      toEmail = [payload.recipientEmail];
    }

    // Using Resend's default verified domain (onboarding@resend.dev) instead of a custom domain
    const emailResponse = await resend.emails.send({
      from: "FieldProMax Team <onboarding@resend.dev>",
      to: toEmail,
      subject: payload.subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          ${emailContent.replace(/\n/g, '<br>')}
          <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            This is an automated response from the FieldProMax team.
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
