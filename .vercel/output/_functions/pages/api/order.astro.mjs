export { renderers } from '../../renderers.mjs';

const prerender = false;
async function POST({ request }) {
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
    termsAccepted,
    cancellationPolicyAccepted,
    portfolioConsent,
    photoProcessingConsent,
    address,
    deliveryTime
  } = data || {};
  if (!name || !email || !pkg || !delivery || !artwork_handling || !phone || !timeSlot) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400
    });
  }
  if (delivery === "Consegna a domicilio (solo a Cuvio e Cuveglio)" && (!address || !deliveryTime)) {
    return new Response(
      JSON.stringify({ error: "Address and delivery time are required for home delivery" }),
      { status: 400 }
    );
  }
  if (!gdprConsent || !dataProcessingConsent || !termsAccepted || !cancellationPolicyAccepted) {
    return new Response(
      JSON.stringify({ error: "Per procedere, è necessario accettare tutti i termini e le condizioni obbligatori." }),
      { status: 400 }
    );
  }
  const homeDeliveryInfo = delivery === "Consegna a domicilio (solo a Cuvio e Cuveglio)" ? `
    <p><b>Indirizzo di consegna:</b> ${address}</p>
    <p><b>Orario di consegna:</b> ${deliveryTime}</p>
    ` : "";
  try {
    const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": undefined                             ,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sender: {
          name: "fotolavoretti",
          email: "fotolavoretti@gmail.com"
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
          <h3>Consensi</h3>
          <p><b>Letta Informativa GDPR/Privacy:</b> ${gdprConsent ? "Sì" : "No"}</p>
          <p><b>Consenso Trattamento Dati:</b> ${dataProcessingConsent ? "Sì" : "No"}</p>
          <p><b>Accettati Termini del Servizio:</b> ${termsAccepted ? "Sì" : "No"}</p>
          <p><b>Accettata Politica di Cancellazione:</b> ${cancellationPolicyAccepted ? "Sì" : "No"}</p>
          <p><b>Consenso Uso Social (Anonimo):</b> ${portfolioConsent ? "Sì" : "No"}</p>
          <p><b>Consenso Foto Minore (Solo Prodotto):</b> ${photoProcessingConsent ? "Sì" : "No"}</p>
        `
      })
    });
    if (!emailRes.ok) {
      const errorBody = await emailRes.json();
      console.error("Brevo email API error:", errorBody);
      throw new Error("Email failed");
    }
    try {
      const contactPayload = {
        email,
        attributes: {
          NOMBRE: name
        },
        updateEnabled: true
      };
      if (phone) {
        contactPayload.attributes.SMS = phone;
      }
      const contactRes = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "api-key": undefined                             ,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contactPayload)
      });
      if (!contactRes.ok) {
        const errorBody = await contactRes.json();
        console.error("Brevo contact API error:", errorBody);
      }
    } catch (contactError) {
      console.error("Failed to create/update Brevo contact:", contactError);
    }
    return new Response(JSON.stringify({ message: "OK" }), { status: 200 });
  } catch (e) {
    console.error("Main API error:", e);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
