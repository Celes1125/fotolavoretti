import { useState } from "react";
import "./form.css";
import StatusModal from "../StatusModal";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    timeSlot: "",
    language: "italiano",
    wantsPhoneContact: false, // Consolidated state
    gdprConsent: false,
  });
  const [status, setStatus] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [gdprConsentError, setGdprConsentError] = useState(null);

  // Unified change handler for all inputs
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const isPhoneContactCheckbox = name === "wantsPhoneContact";
    const isGdprCheckbox = name === "gdprConsent";

    setForm((prevForm) => {
      const newForm = {
        ...prevForm,
        [name]: type === "checkbox" ? checked : value,
      };

      // If the phone contact checkbox is unchecked, clear phone and timeSlot
      if (isPhoneContactCheckbox && !checked) {
        newForm.phone = "";
        newForm.timeSlot = "";
      }

      return newForm;
    });

    if (isGdprCheckbox && checked) {
      setGdprConsentError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.gdprConsent) {
      setGdprConsentError("È necessario accettare l'informativa privacy per inviare il messaggio.");
      return;
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus({
        type: "success",
        message: "Grazie per il tuo messaggio, ti contatteremo al più presto.",
      });
    } else {
      const errorData = await res.json();
      setStatus({
        type: "error",
        message: errorData.error || "Il tuo messaggio non ha potuto essere inviato, riprova più tardi. Ci scusiamo per il disagio.",
      });
    }
    setShowForm(false);
  };

  const handleClose = () => {
    setForm({
      name: "",
      email: "",
      message: "",
      phone: "",
      timeSlot: "",
      language: "italiano",
      wantsPhoneContact: false,
      gdprConsent: false,
    });
    setStatus(null);
    setShowForm(true);
    setGdprConsentError(null);
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
          <h2>Contatto</h2>

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

          <div className="form-control">
            <label>
              <input
                type="checkbox"
                name="wantsPhoneContact"
                checked={form.wantsPhoneContact}
                onChange={handleChange}
              />
              Desideri essere contattato telefonicamente?
            </label>
          </div>

          {form.wantsPhoneContact && (
            <>
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
            </>
          )}

          <div className="form-control">
            <label htmlFor="language-select">Lingua di preferenza per il contatto:</label>
            <select
              id="language-select"
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

          <textarea
            name="message"
            placeholder="Scrivi il tuo messagio"
            value={form.message}
            onChange={handleChange}
          />

          <div className="form-control gdpr-consent">
            <label>
              <input
                type="checkbox"
                name="gdprConsent"
                checked={form.gdprConsent}
                onChange={handleChange}
                required
              />
              Autorizzo il trattamento dei miei dati personali al solo fine di essere ricontattato. <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Leggi l’Informativa Privacy</a>
            </label>
            {gdprConsentError && <p className="error-message">{gdprConsentError}</p>}
          </div>

          <button type="submit">Invia</button>
        </form>
      )}
    </>
  );
}
