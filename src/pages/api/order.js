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
    photoProcessingConsent
  } = data || {};

  // Updated validation: details is optional.
  if (!name || !email || !pkg || !delivery || !artwork_handling) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
  }
  
  // Mandatory consents must be true
  if (!gdprConsent || !dataProcessingConsent) {
    return new Response(JSON.stringify({ error: "Mandatory consents are required" }), { status: 400 });
  }

  // Conditionally build phone contact info
  const phoneContactInfo = phone
    ? `
    <p><b>Telefono:</b> ${phone}</p>
    <p><b>Fascia oraria:</b> ${timeSlot}</p>
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
        to: [{ email: "fotolavoretti@gmail.com" }], // si querés, cámbialo a tu gmail directo
        subject: "Nuovo ordine",
        htmlContent: `
          <h2>Nuovo ordine</h2>
          <p><b>Nome:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Lingua preferita:</b> ${language}</p>
          ${phoneContactInfo}
          <hr>
          <h3>Dettagli dell'ordine</h3>
          <p><b>Pacchetto:</b> ${pkg}</p>
          <p><b>Consegna:</b> ${delivery}</p>
          <p><b>Gestione dei lavoretti:</b> ${artwork_handling}</p>
          <p><b>Dettagli:</b> ${details || 'Nessuno'}</p>
          <hr>
          <h3>Consensi GDPR</h3>
          <p><b>Ho letto e compreso l’Informativa GDPR e la Privacy Policy:</b> ${gdprConsent ? 'Sì' : 'No'}</p>
          <p><b>Acconsento al trattamento dei miei dati e dei dati del minore per la gestione della richiesta:</b> ${dataProcessingConsent ? 'Sì' : 'No'}</p>
          <p><b>Acconsento all’uso delle immagini dei lavoretti sui social (anonimizzato):</b> ${portfolioConsent ? 'Sì' : 'No'}</p>
          <p><b>Acconsento all’uso della fotografia del minore, qualora venga fornita, esclusivamente nel prodotto richiesto. Le fotografie del minore non saranno mai utilizzate sui social.</b> ${photoProcessingConsent ? 'Sì' : 'No'}</p>
        `,
      }),
    });

    if (!emailRes.ok) {
      const errorBody = await emailRes.json();
      console.error("Brevo email API error:", errorBody);
      throw new Error("Email failed");
    }

    // 2) Guardar contacto en Brevo con atributo "NOMBRE"
    const contactRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": import.meta.env.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        attributes: {
          NOMBRE: name,
        },
        updateEnabled: true,
      }),
    });

    if (!contactRes.ok) {
      const errorBody = await contactRes.json();
      console.error("Brevo contact API error:", errorBody);
      throw new Error("Contact create/update failed");
    }

    return new Response(JSON.stringify({ message: "OK" }), { status: 200 });

  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

