import { useState } from "react";
import "./form.css";
import StatusModal from "../StatusModal";

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
  const [showForm, setShowForm] = useState(true);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus({
        type: "success",
        message: "Grazie per il tuo ordine, ti contatteremo al più presto.",
      });
    } else {
      setStatus({
        type: "error",
        message:
          "Il tuo ordine non ha potuto essere inviato, riprova più tardi. Ci scusiamo per il disagio.",
      });
    }
    setShowForm(false);
  };

  const handleClose = () => {
    setForm({
      name: "",
      email: "",
      package: selectedPackage || "",
      delivery: "",
      artwork_handling: "",
      details: "",
    });
    setStatus(null);
    setShowForm(true);
  };

  return (
    <>
      {!showForm && status && (
        <StatusModal
          status={status.type}
          message={status.message}
          onClose={handleClose}
        />
      )}

      {showForm && (
        <form className="form" onSubmit={handleSubmit}>
          <h2>Ordina fotolavoretto</h2>

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
            <option value="Animación personalizada">
              Animazione personalizzata $15
            </option>
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
        </form>
      )}
    </>
  );
}
