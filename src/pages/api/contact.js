// Instruct Astro not to prerender this route
export const prerender = false;

export async function POST({ request }) {
  let data;
  try {
    data = await request.json();
  } catch (parseError) {
    return new Response(JSON.stringify({ error: "Invalid JSON format payload" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const { name, email, message, phone, timeSlot, language, gdprConsent } = data || {};

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: "Missing required fields (name, email, message)" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  if (!gdprConsent) {
    return new Response(JSON.stringify({ error: "Consenso al trattamento dei dati non fornito." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const apiKey = import.meta.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("Critical Runtime Error: BREVO_API_KEY environment variable is missing on the server.");
    return new Response(JSON.stringify({ error: "Server environmental configuration is broken." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Conditionally build phone contact info
  const phoneContactInfo = phone
    ? `
    <p><b>Telefono:</b> ${phone}</p>
    <p><b>Fascia oraria:</b> ${timeSlot}</p>
    `
    : "";

  try {
    // 1) Enviar email para vos
    const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "fotolavoretti",
          email: "fotolavoretti@gmail.com",
        },
        to: [{ email: "fotolavoretti@gmail.com" }],
        subject: "Nuovo messaggio di contatto",
        htmlContent: `
          <h2>Nuovo contatto</h2>
          <p><b>Nome:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Lingua preferita:</b> ${language}</p>
          ${phoneContactInfo}
          <p><b>Messaggio:</b> ${message}</p>
        `,
      }),
    });

    if (!emailRes.ok) {
      const errorBody = await emailRes.json().catch(() => ({ message: "Could not parse error response" }));
      console.error("Brevo email API failure details:", errorBody);
      return new Response(JSON.stringify({ 
        error: "External communication failure with email provider.", 
        details: errorBody.message || "Unauthorized / Refused" 
      }), {
        status: emailRes.status,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 2) Guardar contacto en Brevo (sin enviar nada al cliente)
    try {
      const contactRes = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          attributes: {
            NOMBRE: name,
          },
          updateEnabled: true,  // si existe, lo actualiza
        }),
      });

      if (!contactRes.ok) {
        const errorBody = await contactRes.json().catch(() => ({ message: "Could not parse error response" }));
        console.error("Brevo contact API error:", errorBody);
      }
    } catch (contactError) {
      console.error("Failed to create/update Brevo contact:", contactError);
    }

    return new Response(JSON.stringify({ message: "OK" }), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (e) {
    console.error("Main API runtime catch exception:", e);
    return new Response(JSON.stringify({ error: "Internal Server Processing Error", executionDetails: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
