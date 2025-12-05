// Instruct Astro not to prerender this route
export const prerender = false;

export async function POST({ request }) {
  const data = await request.json();
  const { name, email, message, phone, timeSlot, language } = data || {};

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
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
        "api-key": import.meta.env.BREVO_API_KEY,
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
      const errorBody = await emailRes.json();
      console.error("Brevo email API error:", errorBody);
      throw new Error("Email failed");
    }

    // 2) Guardar contacto en Brevo (sin enviar nada al cliente)
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
        updateEnabled: true,  // si existe, lo actualiza
      }),
    });

    if (!contactRes.ok) {
      const errorBody = await contactRes.json();
      console.error("Brevo contact API error:", errorBody);
      throw new Error("Contact create failed");
    }

    return new Response(JSON.stringify({ message: "OK" }), { status: 200 });

  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
