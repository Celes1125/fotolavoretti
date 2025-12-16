import { useState, useEffect } from "react";
import "./form.css";
import StatusModal from "../StatusModal";

export default function ChristmasOrderForm({ selectedOption }) {
  const [form, setForm] = useState({
    option: selectedOption || "1",
    customerName: "",
    contactMethod: "", // Added for contact method selection
    instagram: "", // Added for Instagram handle
    phone: "", // Kept for WhatsApp contact
    childName: "",
    videoLanguage: "ita",
    gdprConsent: false,
    dataProcessingConsent: false,
    termsAccepted: false,
    cancellationPolicyAccepted: false,
    portfolioConsent: false,
    photoProcessingConsent: false,
  });
  const [status, setStatus] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [consentError, setConsentError] = useState(null);

  useEffect(() => {
    setForm(prevForm => ({ ...prevForm, option: selectedOption }));
  }, [selectedOption]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm((prevForm) => {
      const newForm = {
        ...prevForm,
        [name]: type === "checkbox" ? checked : value,
      };

      return newForm;
    });

    if (type === "checkbox") {
      setConsentError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.gdprConsent || !form.dataProcessingConsent || !form.termsAccepted || !form.cancellationPolicyAccepted) {
      setConsentError("Per procedere, è necessario accettare tutti i termini e le condizioni obbligatori.");
      return;
    }

    const res = await fetch("/api/christmas-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus({
        type: "success",
        message: "Grazie per il tuo ordine! Ti contatteremo al più presto per i dettagli.",
      });
    } else {
      const errorData = await res.json();
      setStatus({
        type: "error",
        message: errorData.error || "Il tuo ordine non ha potuto essere inviato, riprova più tardi.",
      });
    }
    setShowForm(false);
  };

  const handleClose = () => {
    setForm({
      option: selectedOption || "1",
      customerName: "",
      contactMethod: "",
      instagram: "",
      phone: "",
      childName: "",
      videoLanguage: "ita",
      gdprConsent: false,
      dataProcessingConsent: false,
      termsAccepted: false,
      cancellationPolicyAccepted: false,
      portfolioConsent: false,
      photoProcessingConsent: false,
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
          <h2>Ordina la tua Card di Natale</h2>

          <div className="form-control-column">
            <label htmlFor="option-select">Scegli la tua opzione:</label>
            <select id="option-select" name="option" value={form.option} onChange={handleChange} required>
              <option value="1">Opzione 1: card standar (€15)</option>
              <option value="2">Opzione 2: card speciale (€25)</option>
              <option value="3">Opzione 3: card famiglia(€20)</option>
            </select>
          </div>

          <input
            name="customerName"
            type="text"
            placeholder="Nome e Cognome"
            value={form.customerName}
            onChange={handleChange}
            required
          />

          <div className="form-control-column">
            <label>Come preferisci essere ricontattato?</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="contactMethod"
                  value="whatsapp"
                  checked={form.contactMethod === "whatsapp"}
                  onChange={handleChange}
                  required
                />
                WhatsApp
              </label>
              <label>
                <input
                  type="radio"
                  name="contactMethod"
                  value="instagram"
                  checked={form.contactMethod === "instagram"}
                  onChange={handleChange}
                  required
                />
                Instagram
              </label>
            </div>
          </div>

          {form.contactMethod === 'whatsapp' && (
            <input
              name="phone"
              type="tel"
              placeholder="Il tuo numero di telefono"
              value={form.phone}
              onChange={handleChange}
              required
            />
          )}

          {form.contactMethod === 'instagram' && (
            <input
              name="instagram"
              type="text"
              placeholder="Il tuo Instagram (es. @nomeutente)"
              value={form.instagram}
              onChange={handleChange}
              pattern="^@.*"
              title="Il nome utente di Instagram deve iniziare con @"
              required
            />
          )}
          
          {(form.option === "1" || form.option === "2") && (
            <input
              name="childName"
              type="text"
              placeholder="Nome del bambino"
              value={form.childName}
              onChange={handleChange}
              required
            />
          )}
          
          <div className="form-control-column">
            <label htmlFor="language-select">Lingua del video:</label>
            <select id="language-select" name="videoLanguage" value={form.videoLanguage} onChange={handleChange} required>
              <option value="ita">Italiano</option>
              <option value="spa">Spagnolo</option>
              <option value="eng">Inglese</option>
            </select>
          </div>

          {/* Consent Section (copied from OrderForm) */}
          <div className="form-section consent-section">
            <h3>Consensi e Termini</h3>
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

          <button type="submit">Invia Ordine di Natale</button>
        </form>
      )}
    </>
  );
}
