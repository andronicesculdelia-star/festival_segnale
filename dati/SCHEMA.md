# Scheda dati — Festival Segnale

## Entità: Evento

| Campo | Tipo | Esempio |
|---|---|---|
| `id` | numero intero | `1` |
| `titolo` | testo | `"Lettere in movimento"` |
| `data` | data in formato `YYYY-MM-DD` | `"2026-06-12"` |
| `orario` | testo, formato `HH:MM` | `"10:00"` |
| `categoria` | testo | `"Incontro"` |
| `descrizione` | testo | `"Un incontro su tipografia, ritmo e comunicazione visiva."` |
| `immagine` | testo, percorso del file | `"assets/lettere-in-movimento.svg"` |
| `immagine_alt` | testo | `"Lettere geometriche disposte su una griglia"` |
| `sede_id` | numero intero | `1` |

## Entità: Sede

| Campo | Tipo | Esempio |
|---|---|---|
| `id` | numero intero | `1` |
| `nome` | testo | `"Officina Nord — Sede centrale"` |
| `indirizzo` | testo | `"Corso Duca degli Abruzzi 24, Torino"` |

## Chiavi

La chiave primaria di entrambe le entità è `id`: è numerica, univoca all’interno della propria entità e stabile. Non va cambiata quando si aggiornano gli altri dati del record.

## Relazione

Una sede può ospitare più eventi; ogni evento si svolge in una sede. Il campo `Evento.sede_id` fa riferimento a `Sede.id`.

## Quantità

I file contengono sei eventi e tre sedi.

## Aggiornamento e pubblicazione

Chi mantiene il sito aggiorna i dati modificando `dati/eventi.json` e `dati/sedi.json` nella repository. Dopo aver salvato i file, li carica nella repository e pubblica gli aggiornamenti del sito.

## Che cosa mostra la pagina

La pagina Programma mostra le schede degli eventi, con data, orario, categoria, descrizione e immagine. Per ogni evento mostra anche il nome e l’indirizzo della sede associata tramite `sede_id`.

## Schema Evento–Sede

```mermaid
erDiagram
    SEDE ||--o{ EVENTO : ospita
    SEDE {
        int id PK
        string nome
        string indirizzo
    }
    EVENTO {
        int id PK
        string titolo
        string data
        string orario
        string categoria
        string descrizione
        string immagine
        string immagine\_alt
        int sede\_id FK
    }
