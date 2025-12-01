export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    // 1) Enviar email para vos
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
        to: [{ email: "fotolavoretti@gmail.com" }],
        subject: "Nuovo messaggio di contatto",
        htmlContent: `
          <h2>Nuovo contatto</h2>
          <p><b>Nome:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Messaggio:</b> ${message}</p>
        `,
      }),
    });

    if (!emailRes.ok) throw new Error("Email failed");

    // 2) Guardar contacto en Brevo (sin enviar nada al cliente)
    const contactRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: name,
        },
        updateEnabled: true,  // si existe, lo actualiza
      }),
    });

    if (!contactRes.ok) throw new Error("Contact create failed");

    return res.status(200).json({ message: "OK" });

  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
}
