"use client";

import { useState } from "react";

const cardStyles = [
  { value: "Botânico", className: "card-style-botanical", symbol: "✦", title: "Com carinho" },
  { value: "Clássico", className: "card-style-classic", symbol: "RB", title: "Um presente" },
  { value: "Romântico", className: "card-style-romantic", symbol: "♡", title: "Todo meu amor" },
  { value: "Minimalista", className: "card-style-minimal", symbol: "—", title: "Para você." },
  { value: "Celebração", className: "card-style-celebration", symbol: "✷", title: "Vamos celebrar!" },
];

export function CardStylePicker() {
  const [message, setMessage] = useState("");
  const previewMessage = message.trim() || "Sua mensagem aparecerá aqui";

  return <>
    <fieldset className="card-style-picker">
      <legend>Escolha o modelo do cartão</legend>
      <div className="card-style-grid">
        {cardStyles.map((card, index) => <label className={`card-style ${card.className}`} key={card.value}>
          <input type="radio" name="cardStyle" value={card.value} defaultChecked={index === 0} />
          <span className="card-preview">
            <i>{card.symbol}</i>
            <strong>{card.title}</strong>
            <small className={message ? "card-live-message" : "card-live-message card-live-placeholder"}>{previewMessage}</small>
          </span>
          <b>{card.value}</b>
        </label>)}
      </div>
    </fieldset>
    <label className="order-field order-card-message">
      Mensagem do cartão
      <textarea name="cardMessage" rows={3} maxLength={240} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Escreva a mensagem que acompanhará o presente" />
      <span className="card-character-count">{message.length}/240 — a prévia é atualizada enquanto você escreve</span>
    </label>
  </>;
}
