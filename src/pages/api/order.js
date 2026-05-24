// Instruct Astro not to prerender this route
export const prerender = false;

export async function POST({ request }) {
  // Safe parsing block to catch empty payloads early
  let data;
  try {
    data = await request.json();
  } catch (parseError) {
    return new Response(JSON.stringify({ error: "Invalid JSON format payload" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const {
    name,
    email,
    package: pkg,
    delivery,
    artwork_handling,
    details,
    phone,
    timeSlot,
    language,
    gdprConsent,
    dataProcessingConsent,
    termsAccepted,
    cancellationPolicyAccepted,
    portfolioConsent,
    photoProcessingConsent,
    address,
    deliveryTime,
  } = data || {};

  // Base validation
  if (!name || !email || !pkg || !delivery || !artwork_handling || !phone || !timeSlot) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Conditional validation for home delivery
  if (
    delivery === "Consegna a domicilio (solo a Cuvio e Cuveglio)" &&
    (!address || !deliveryTime)
  ) {
    return new Response(
      JSON.stringify({ error: "Address and delivery time are required for home delivery" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  // Mandatory consents must be true
  if (!gdprConsent || !dataProcessingConsent || !termsAccepted || !cancellationPolicyAccepted) {
    return new Response(
      JSON.stringify({ error: "Per procedere, è necessario accettare tutti i termini e le condizioni obbligatori." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }
  
  // Conditionally build home delivery info
  const homeDeliveryInfo =
    delivery === "Consegna a domicilio (solo a Cuvio e Cuveglio)"
      ? `
    <p><b>Indirizzo di consegna:</b> ${address}</p>
    <p><b>Orario di consegna:</b> ${deliveryTime}</p>
    `
      : "";

  // Runtime structural guard check for the API key string
  const apiKey = import.meta.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("Critical Runtime Error: BREVO_API_KEY environment variable is missing on the server.");
    return new Response(JSON.stringify({ error: "Server environmental configuration is broken." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    // 1) Enviar email a vos con el pedido
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
        subject: "Nuovo ordine",
        htmlContent: `
          <h2>Nuovo ordine</h2>
          <p><b>Nome:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Lingua preferita:</b> ${language}</p>
          <p><b>Telefono:</b> ${phone}</p>
          <p><b>Fascia oraria per contacto:</b> ${timeSlot}</p>
          <hr>
          <h3>Dettagli dell'ordine</h3>
          <p><b>Pacchetto:</b> ${pkg}</p>
          <p><b>Consegna:</b> ${delivery}</p>
          ${homeDeliveryInfo}
          <p><b>Gestione dei lavoretti:</b> ${artwork_handling}</p>
          <p><b>Dettagli:</b> ${details || "Nessuno"}</p>
          <hr>
          <h3>Consensi</h3>
          <p><b>Letta Informativa GDPR/Privacy:</b> ${gdprConsent ? "Sì" : "No"}</p>
          <p><b>Consenso Trattamento Dati:</b> ${dataProcessingConsent ? "Sì" : "No"}</p>
          <p><b>Accettati Termini del Servizio:</b> ${termsAccepted ? "Sì" : "No"}</p>
          <p><b>Accettata Politica di Cancellazione:</b> ${cancellationPolicyAccepted ? "Sì" : "No"}</p>
          <p><b>Consenso Uso Social (Anonimo):</b> ${portfolioConsent ? "Sì" : "No"}</p>
          <p><b>Consenso Foto Minore (Solo Prodotto):</b> ${photoProcessingConsent ? "Sì" : "No"}</p>
        `,
      }),
    });

    if (!emailRes.ok) {
      const errorBody = await emailRes.json();
      console.error("Brevo email API failure details:", errorBody);
      return new Response(JSON.stringify({ 
        error: "External communication failure with email provider.", 
        details: errorBody.message || "Unauthorized / Refused" 
      }), {
        status: emailRes.status,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 2) Guardar contacto en Brevo (optional step)
    try {
      const contactPayload = {
        email,
        attributes: {
          NOMBRE: name,
        },
        updateEnabled: true,
      };
      if (phone) {
        contactPayload.attributes.SMS = phone;
      }
      
      const contactRes = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactPayload),
      });

      if (!contactRes.ok) {
        const errorBody = await contactRes.json();
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