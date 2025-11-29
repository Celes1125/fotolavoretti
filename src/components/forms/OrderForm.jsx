import { useState } from "react";
import "./form.css";

export default function OrderForm({ selectedPackage }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: selectedPackage || "",
    details: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setStatus(res.ok ? "success" : "error");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Pedir fotolavoretto</h2>

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

      <select name="service" value={form.service} onChange={handleChange}>
        <option value="">Selecciona un servicio</option>
        <option value="Combo clásico">Combo clásico</option>
        <option value="Combo completo">Combo completo</option>
        <option value="Combo premium">Combo premium</option>
        <option value="Animación estándar">Animación estándar</option>
        <option value="Animación personalizada">Animación personalizada</option>
      </select>

      <textarea
        name="details"
        placeholder="Detalles del pedido"
        value={form.details}
        onChange={handleChange}
      />

      <button type="submit">Enviar pedido</button>

      {status === "success" && <p className="ok">Pedido enviado</p>}
      {status === "error" && <p className="err">Error al enviar</p>}
    </form>
  );
}
