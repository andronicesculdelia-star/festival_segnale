async function caricaMeteo() {
  const contenitore = document.querySelector("#meteo-stato");

  const indirizzo =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=45.0703" +
    "&longitude=7.6869" +
    "&current=temperature_2m,wind_speed_10m" +
    "&timezone=Europe%2FRome";

  try {
    const risposta = await fetch(indirizzo);

    if (!risposta.ok) {
      throw new Error("La richiesta meteo non è riuscita.");
    }

    const dati = await risposta.json();
    const attuali = dati.current;
    const unita = dati.current_units;

    if (!attuali || !attuali.time) {
      throw new Error("La risposta non contiene i dati meteo attuali.");
    }

    const ora = attuali.time.split("T")[1];

    contenitore.textContent =
      `Temperatura: ${attuali.temperature_2m} ${unita.temperature_2m} · ` +
      `Vento: ${attuali.wind_speed_10m} ${unita.wind_speed_10m} · ` +
      `Ora del dato: ${ora}`;
  } catch (errore) {
    contenitore.textContent =
      "I dati meteo non sono disponibili al momento.";
    console.error("Errore nel caricamento del meteo:", errore);
  }
}

caricaMeteo();
