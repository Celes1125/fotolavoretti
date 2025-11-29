import { useState } from "react";
import "./form.css";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setStatus(res.ok ? "success" : "error");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Contacto</h2>

      <input
        name="name"
        type="text"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <textarea
        name="message"
        placeholder="Mensaje"
        value={form.message}
        onChange={handleChange}
      />

      <button type="submit">Enviar</button>

      {status === "success" && <p className="ok">Enviado</p>}
      {status === "error" && <p className="err">Error al enviar</p>}
    </form>
  );
}
