// Instruct Astro not to prerender this route
export const prerender = false;

export async function POST({ request }) {
  const data = await request.json();

  const {
    option,
    customerName,
    contactMethod,
    instagram,
    phone,
    childName,
    videoLanguage,
    gdprConsent,
    dataProcessingConsent,
    termsAccepted,
    cancellationPolicyAccepted,
    portfolioConsent,
    photoProcessingConsent,
  } = data || {};

  // --- Validation ---
  if (!option || !customerName || !contactMethod) {
    return new Response(JSON.stringify({ error: "I campi obbligatori del modulo non sono stati compilati." }), {
      status: 400,
    });
  }

  if (contactMethod === 'whatsapp' && !phone) {
    return new Response(JSON.stringify({ error: "Il numero di telefono è obbligatorio se si sceglie WhatsApp." }), {
      status: 400,
    });
  }

  if (contactMethod === 'instagram' && !instagram) {
    return new Response(JSON.stringify({ error: "L'handle di Instagram è obbligatorio se si sceglie Instagram." }), {
      status: 400,
    });
  }


  // Mandatory consents must be true
  if (!gdprConsent || !dataProcessingConsent || !termsAccepted || !cancellationPolicyAccepted) {
    return new Response(
      JSON.stringify({ error: "Per procedere, è necessario accettare tutti i termini e le condizioni obbligatori." }),
      { status: 400 },
    );
  }

  const optionText = {
    '1': 'Opzione 1: Personaggio animato',
    '2': 'Opzione 2: Babbo Natale animato',
    '3': 'Opzione 3: Disegno con audio familiare',
  };

  const contactDetailHtml = contactMethod === 'whatsapp'
    ? `<p><b>Contatto WhatsApp:</b> ${phone}</p>`
    : `<p><b>Contatto Instagram:</b> ${instagram}</p>`;


  try {
    const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": import.meta.env.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Fotolavoretti Natale",
          email: "fotolavoretti@gmail.com",
        },
        to: [{ email: "fotolavoretti@gmail.com" }],
        subject: "Nuovo Ordine per Card di Natale!",
        htmlContent: `
          <h2>Nuovo Ordine per Card di Natale!</h2>
          <p><b>Opzione Scelta:</b> ${optionText[option] || 'Non specificata'}</p>
          <hr>
          <h3>Dettagli Cliente</h3>
          <p><b>Nome Cliente:</b> ${customerName}</p>
          ${contactDetailHtml}
          <p><b>Nome Bambino:</b> ${childName || "Non applicabile / Non fornito"}</p>
          <p><b>Lingua Video:</b> ${videoLanguage}</p>
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
      console.error("Brevo email API error:", errorBody);
      throw new Error("Email failed");
    }

    return new Response(JSON.stringify({ message: "OK" }), { status: 200 });

  } catch (e) {
    console.error("Main API error:", e);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
