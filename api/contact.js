export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "fotolavoretti", email: "tu_correo@ejemplo.com" },
        to: [{ email: "tu_correo@ejemplo.com" }],
        subject: "Nuevo mensaje de contacto",
        htmlContent: `
          <h2>Nuevo contacto</h2>
          <p><b>Nombre:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Mensaje:</b> ${message}</p>
        `,
      }),
    });

    if (!brevoRes.ok) throw new Error("Email failed");

    return res.status(200).json({ message: "OK" });
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
}
