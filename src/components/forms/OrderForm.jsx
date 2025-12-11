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
    phone: "",
    timeSlot: "",
    language: "italiano",
    gdprConsent: false,
    dataProcessingConsent: false,
    termsAccepted: false,
    cancellationPolicyAccepted: false,
    portfolioConsent: false,
    photoProcessingConsent: false,
    address: "",
    deliveryTime: "",
  });
  const [status, setStatus] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [consentError, setConsentError] = useState(null);

  // Unified change handler for all inputs
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm((prevForm) => {
      const newForm = {
        ...prevForm,
        [name]: type === "checkbox" ? checked : value,
      };

      // If delivery method is not home delivery, clear address and delivery time
      if (
        name === "delivery" &&
        value !== "Consegna a domicilio (solo a Cuvio e Cuveglio)"
      ) {
        newForm.address = "";
        newForm.deliveryTime = "";
      }

      return newForm;
    });

    // Clear consent error when user starts checking boxes
    if (type === "checkbox") {
      setConsentError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate mandatory consents
    if (!form.gdprConsent || !form.dataProcessingConsent || !form.termsAccepted || !form.cancellationPolicyAccepted) {
      setConsentError("Per procedere, è necessario accettare tutti i termini e le condizioni obbligatori.");
      return;
    }

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
      const errorData = await res.json();
      setStatus({
        type: "error",
        message: errorData.error || "Il tuo ordine non ha potuto essere inviato, riprova più tardi. Ci scusiamo per il disagio.",
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
      phone: "",
      timeSlot: "",
      language: "italiano",
      gdprConsent: false,
      dataProcessingConsent: false,
      termsAccepted: false,
      cancellationPolicyAccepted: false,
      portfolioConsent: false,
      photoProcessingConsent: false,
      address: "",
      deliveryTime: "",
    });
    setStatus(null);
    setShowForm(true);
    setConsentError(null);
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

          <input
            name="phone"
            type="tel"
            placeholder="Numero di telefono"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <input
            name="timeSlot"
            type="text"
            placeholder="Fascia oraria di preferenza (es. 9-12)"
            value={form.timeSlot}
            onChange={handleChange}
            required
          />

          <div className="form-control">
            <label htmlFor="language-select-order">
              Lingua di preferenza per il contatto:
            </label>
            <select
              id="language-select-order"
              name="language"
              value={form.language}
              onChange={handleChange}
              required
            >
              <option value="italiano">Italiano</option>
              <option value="spagnolo">Spagnolo</option>
              <option value="inglese">Inglese</option>
            </select>
          </div>

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

          {form.delivery ===
            "Consegna a domicilio (solo a Cuvio e Cuveglio)" && (
            <>
              <input
                name="address"
                type="text"
                placeholder="Indirizzo di consegna"
                value={form.address}
                onChange={handleChange}
                required
              />
              <select
                name="deliveryTime"
                value={form.deliveryTime}
                onChange={handleChange}
                required
              >
                <option value="">Scegli l'orario di preferenza</option>
                <option value="mattina">Mattina</option>
                <option value="pomeriggio">Pomeriggio</option>
                <option value="sera">Sera</option>
                <option value="indifferente">Indifferente</option>
              </select>
            </>
          )}

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

          {/* Consent Section */}
          <div className="form-section consent-section">
            <h3>Consensi e Termini</h3>

            {/* Mandatory GDPR */}
            <div className="consent-group">
              <h4>Consensi Obbligatori (Privacy e GDPR)</h4>
              <div className="form-control">
                <label>
                  <input type="checkbox" name="gdprConsent" checked={form.gdprConsent} onChange={handleChange} required />
                  Ho letto e compreso l’Informativa GDPR e la <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ display: 'inline', padding: 0, background: 'transparent', color: '#ddb74e', border: 'none', borderRadius: 0, textDecoration: 'underline' }}><strong>Privacy Policy</strong></a> di fotolavoretti.
                </label>
              </div>
              <div className="form-control">
                <label>
                  <input type="checkbox" name="dataProcessingConsent" checked={form.dataProcessingConsent} onChange={handleChange} required />
                  Acconsento al trattamento dei miei dati e dei dati del minore, se forniti, per la gestione della richiesta e dei prodotti richiesti.
                </label>
              </div>
            </div>

            {/* Mandatory Terms */}
            <div className="consent-group">
              <h4>Consensi Obbligatori (Termini e Condizioni)</h4>
              <div className="form-control">
                <label>
                  <input type="checkbox" name="termsAccepted" checked={form.termsAccepted} onChange={handleChange} required />
                  Ho letto e accetto i <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" style={{ display: 'inline', padding: 0, background: 'transparent', color: '#ddb74e', border: 'none', borderRadius: 0, textDecoration: 'underline' }}><strong>Termini del Servizio</strong></a>.
                </label>
              </div>
              <div className="form-control">
                <label>
                  <input type="checkbox" name="cancellationPolicyAccepted" checked={form.cancellationPolicyAccepted} onChange={handleChange} required />
                  Confermo di aver letto e accetto la <a href="/politica-di-cancellazione" target="_blank" rel="noopener noreferrer" style={{ display: 'inline', padding: 0, background: 'transparent', color: '#ddb74e', border: 'none', borderRadius: 0, textDecoration: 'underline' }}><strong>Politica di cancellazione e di non rimborso</strong></a> per prodotti digitali.
                </label>
              </div>
            </div>

            {/* Optional Consents */}
            <div className="consent-group">
              <h4>Consensi Opzionali</h4>
              <div className="form-control">
                <label>
                  <input type="checkbox" name="portfolioConsent" checked={form.portfolioConsent} onChange={handleChange} />
                  Acconsento all’uso delle immagini dei lavoretti sui social di fotolavoretti, in forma anonimizzata.
                </label>
              </div>
              <div className="form-control">
                <label>
                  <input type="checkbox" name="photoProcessingConsent" checked={form.photoProcessingConsent} onChange={handleChange} />
                  Acconsento all’uso della fotografia del minore, qualora venga fornita, esclusivamente nel prodotto richiesto. Le fotografie del minore non saranno mai utilizzate sui social.
                </label>
              </div>
            </div>

            {consentError && <p className="error-message">{consentError}</p>}
          </div>

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
