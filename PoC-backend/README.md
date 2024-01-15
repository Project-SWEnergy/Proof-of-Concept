# PoC backend di Easy Meal

Di seguito sono elencate le cose che ho svolto, le ho annotate mano a mano che
le svolgevo.

## Installazione

Il back-end qui sviluppato runna dentro un container docker, infatti è presente
il [Dockerfile](Dockerfile). Si noti che il back-end è un programma che si
frappone tra il front-end ed il back-end, per questo motivo per avere un
ambiente di sviluppo adeguato è necessario avere anche il database. Per runnare
sia il database che il backend è sufficiente:
1. Installare docker
2. entrare nella directory del progetto
3. Digitare ``docker compose up`` nel terminale

Per maggiori informazioni sull'utilizzo di Docker:
- rimando alla documentazione ufficiale:
  [Docker](https://docs.docker.com/guides/get-started/)
- ho scritto qualche
  [appunto](https://github.com/Project-SWEnergy/appunti-swe/tree/carlo/backend/docker)

---

## Documentazione

Per quelli che dovranno sviluppare il front-end:
il source code utilizza qualche decorator per documentare le API.
Per accedere alla documentazioen di OpenAPI ci si collega al link:

```
http://localhost:3000/api
```

In caso di dubbi si chiede!

Per quelli che dovranno sviluppare il back-end:
il source code utilizza anche la libreria ``typedoc``, per cui i commenti inline
del codice in markdown sono estratti ed è creato un sito apposito per consultare
e soprattuto cercare i vari metodi e funzioni definiti.

---

## Changelog:
- ho studiato il database di cui abbiamo bisogno: gli appunti dello studio sono 
  presenti nel folder [database](database).
- ho connesso la repo del backend a fl0: ogni volta che viene eseguito un push
  nella repo PoC-backend, i file al suo interno sono deployati in un server di
  fl0, in modo automatico.
  Fl0 individua un dockerfile oppure un docker-compose per generare i servizi
  del caso.
- Ho inizializzato la repo PoC-backend con le librerie che usiamo, come ho già
  citato:
    - Node
    - Nest
    - Swagger
    - TypeDoc
- Ho scritto un Dockerfile per eseguire correttamente la build.
- Ci si connette al server mediante il link:
    [server](https://poc-backend-dev-gjeh.2.ie-1.fl0.io/api). Il link riportato
    porta alla pagina di descrizione delle API generata automaticamente da
    Swagger.
- Ho connesso il backend al database che è disponibile su fl0.
- Ho riscritto le tabelle di inizializzazione del database tramite la sintassi
  di dizzle. Dizzle è una libreria utilizzata per interfacciarsi con il database
  e per effettuare le query.
- Ho definito gli endpoint per Utente
- async che ritorna qualcosa
- table orario (id_ristorante, weekday, apertura, chiusura)
    vincolo > non ci possono essere orari che si sovrappongono nello stesso
    giorno
- a quanto pare fl0 non ha abbastanza risorse per far girare il server
- ho creato un file docker-compose per runnare comodamente il backend: parte
  con il comando ``docker compose up`` nella directory principale della repo
- endpoint per la gestione delle prenotazioni
---

## Todo!
- endpoint per la gestione dell'orario del ristorante
- endpoint per la gestione del menu del ristorante
