export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, package: pkg, delivery, artwork_handling, details } =
    req.body || {};

  if (!name || !email || !pkg || !delivery || !artwork_handling || !details) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    // 1) Enviar email a vos con el pedido
    const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
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
          <p><b>Pacchetto:</b> ${pkg}</p>
          <p><b>Consegna:</b> ${delivery}</p>
          <p><b>Gestione dei lavoretti:</b> ${artwork_handling}</p>
          <p><b>Dettagli:</b> ${details}</p>
        `,
      }),
    });

    if (!emailRes.ok) throw new Error("Email failed");

    // 2) Guardar contacto en Brevo con atributo "NOMBRE"
    const contactRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
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

    if (!contactRes.ok) throw new Error("Contact create/update failed");

    return res.status(200).json({ message: "OK" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
}
