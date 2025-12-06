// Instruct Astro not to prerender this route
export const prerender = false;

export async function POST({ request }) {
  const data = await request.json();

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
    portfolioConsent,
    photoProcessingConsent,
    address,
    deliveryTime,
  } = data || {};

  // Base validation
  if (!name || !email || !pkg || !delivery || !artwork_handling || !phone || !timeSlot) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
    });
  }

  // Conditional validation for home delivery
  if (
    delivery === "Consegna a domicilio (solo a Cuvio e Cuveglio)" &&
    (!address || !deliveryTime)
  ) {
    return new Response(
      JSON.stringify({ error: "Address and delivery time are required for home delivery" }),
      { status: 400 },
    );
  }

  // Mandatory consents must be true
  if (!gdprConsent || !dataProcessingConsent) {
    return new Response(
      JSON.stringify({ error: "Mandatory consents are required" }),
      { status: 400 },
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

  try {
    // 1) Enviar email a vos con el pedido
    const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": import.meta.env.BREVO_API_KEY,
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
          <p><b>Fascia oraria per contatto:</b> ${timeSlot}</p>
          <hr>
          <h3>Dettagli dell'ordine</h3>
          <p><b>Pacchetto:</b> ${pkg}</p>
          <p><b>Consegna:</b> ${delivery}</p>
          ${homeDeliveryInfo}
          <p><b>Gestione dei lavoretti:</b> ${artwork_handling}</p>
          <p><b>Dettagli:</b> ${details || "Nessuno"}</p>
          <hr>
          <h3>Consensi GDPR</h3>
          <p><b>Ho letto e compreso l’Informativa GDPR e la Privacy Policy:</b> ${
            gdprConsent ? "Sì" : "No"
          }</p>
          <p><b>Acconsento al trattamento dei miei dati e del minore per la gestione della richiesta:</b> ${
            dataProcessingConsent ? "Sì" : "No"
          }</p>
          <p><b>Acconsento all’uso delle immagini dei lavoretti sui social (anonimizzato):</b> ${
            portfolioConsent ? "Sì" : "No"
          }</p>
          <p><b>Acconsento all’uso della fotografia del minore, se fornita, solo nel prodotto richiesto:</b> ${
            photoProcessingConsent ? "Sì" : "No"
          }</p>
        `,
      }),
    });

    if (!emailRes.ok) {
      const errorBody = await emailRes.json();
      console.error("Brevo email API error:", errorBody);
      throw new Error("Email failed");
    }

    // 2) Guardar contacto en Brevo
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
        "api-key": import.meta.env.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactPayload),
    });

    if (!contactRes.ok) {
      const errorBody = await contactRes.json();
      console.error("Brevo contact API error:", errorBody);
      throw new Error("Contact create/update failed");
    }

    return new Response(JSON.stringify({ message: "OK" }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}

