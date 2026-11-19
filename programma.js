const contenitoreEventi = document.querySelector("#event-grid");

function creaElemento(tag, testo, classe) {
  const elemento = document.createElement(tag);
  elemento.textContent = testo;

  if (classe) {
    elemento.className = classe;
  }

  return elemento;
}

function formattaData(data) {
  const [anno, mese, giorno] = data.split("-").map(Number);
  const dataLocale = new Date(anno, mese - 1, giorno);

  return new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(dataLocale);
}

function creaScheda(evento, sedi) {
  const sede = sedi.find((elemento) => elemento.id === evento.sede_id);

  const scheda = document.createElement("article");
  scheda.className = "event-card";

  const immagine = document.createElement("img");
  immagine.src = evento.immagine;
  immagine.alt = evento.immagine_alt;
  immagine.width = 900;
  immagine.height = 600;
  scheda.appendChild(immagine);

  const corpo = document.createElement("div");
  corpo.className = "event-body";

  corpo.appendChild(
    creaElemento(
      "p",
      `${formattaData(evento.data)} · ${evento.orario} · ${evento.categoria}`,
      "event-meta"
    )
  );

  corpo.appendChild(creaElemento("h3", evento.titolo));
  corpo.appendChild(creaElemento("p", evento.descrizione));

  const luogo = document.createElement("p");
  luogo.className = "event-place";

  const etichetta = document.createElement("strong");
  etichetta.textContent = "Sede: ";
  luogo.appendChild(etichetta);

  luogo.appendChild(
    document.createTextNode(
      sede ? `${sede.nome} — ${sede.indirizzo}` : "Sede da definire"
    )
  );

  corpo.appendChild(luogo);
  scheda.appendChild(corpo);

  return scheda;
}

async function caricaProgramma() {
  try {
    const [rispostaEventi, rispostaSedi] = await Promise.all([
      fetch("dati/eventi.json"),
      fetch("dati/sedi.json")
    ]);

    if (!rispostaEventi.ok || !rispostaSedi.ok) {
      throw new Error("Uno o più file JSON non sono stati trovati.");
    }

    const [eventi, sedi] = await Promise.all([
      rispostaEventi.json(),
      rispostaSedi.json()
    ]);

    if (!Array.isArray(eventi) || !Array.isArray(sedi)) {
      throw new Error("I file JSON non contengono elenchi validi.");
    }

    if (eventi.length === 0) {
      contenitoreEventi.textContent = "Al momento non ci sono eventi in programma.";
      return;
    }

    contenitoreEventi.replaceChildren();

    eventi.forEach((evento) => {
      contenitoreEventi.appendChild(creaScheda(evento, sedi));
    });
  } catch (errore) {
    contenitoreEventi.textContent =
      "Non è stato possibile caricare il programma. Controlla che i file JSON siano presenti e validi.";
    console.error("Errore nel caricamento del programma:", errore);
  }
}

caricaProgramma();
