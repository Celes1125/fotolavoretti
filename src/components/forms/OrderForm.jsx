import { useState } from "react";
import "./form.css";

export default function OrderForm({ selectedPackage }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    package: selectedPackage || "",
    delivery: "",
    artwork_handling: "",
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
      <h2>Ordina ora</h2>

      <input
        name="name"
        type="text"
        placeholder="Nome"
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

      <select name="package" value={form.package} onChange={handleChange}>
        <option value="">Seleziona un servizio</option>
        <option value="Combo clásico">Scegli clásico $35</option>
        <option value="Combo completo">Scegli completo $40</option>
        <option value="Combo premium">Scegli premium $50</option>
        <option value="Animación estándar">Animazione standar $10 </option>
        <option value="Animación personalizada">Animazione personalizzata $15</option>
      </select>

      <select name="delivery" value={form.delivery} onChange={handleChange}>
        <option value="">Decidi come inviarmi le creazioni</option>
        <option value="Consegna a domicilio (solo a Cuvio e Cuveglio)">
          Consegna a domicilio (solo a Cuvio e Cuveglio)
        </option>
        <option value="Consegna davanti a scuola (solo Cuveglio)">
          Consegna davanti a scuola (solo Cuveglio)
        </option>
        <option value="Invia le foto se sei lontano">
          Invia le foto se sei lontano
        </option>
      </select>

      <select
        name="artwork_handling"
        value={form.artwork_handling}
        onChange={handleChange}
      >
        <option value="">Decidi cosa fare con i lavoretti originali</option>
        <option value="Smaltimento responsabile (senza costi aggiuntivi)">
          Smaltimento responsabile (senza costi aggiuntivi)
        </option>
        <option value="Restituzione dei lavoretti">
          Restituzione dei lavoretti
        </option>
      </select>

      <textarea
        name="details"
        placeholder="Note aggiuntive (opzionale)"
        value={form.details}
        onChange={handleChange}
      />

      <button type="submit">Invia ordine</button>

      {status === "success" && <p className="ok">Ordine inviato</p>}
      {status === "error" && <p className="err">Errore durante l'invio</p>}
    </form>
  );
}
