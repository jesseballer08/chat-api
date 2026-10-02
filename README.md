# Chat API

Basic JSON API (Node.js + Express) voor een live chat. Antwoorden volgen de [JSend](https://github.com/omniti-labs/jsend)-standaard. Berichten zitten (voorlopig) in een statische array in `data/messages.js`.

## Starten

```bash
npm install
npm run dev   # of: npm start
```

Server draait op `http://localhost:3000`.

## Routes

| Methode | Route | Beschrijving |
|---|---|---|
| GET | `/api/v1/messages` | Alle berichten |
| GET | `/api/v1/messages?user=pikachu` | Berichten van één user |
| GET | `/api/v1/messages/:id` | Eén bericht (op `_id` of array-index 0, 1, …), 404 als niet gevonden |
| POST | `/api/v1/messages` | Nieuw bericht |
| PUT | `/api/v1/messages/:id` | Bericht updaten |
| DELETE | `/api/v1/messages/:id` | Bericht verwijderen |

Body voor POST/PUT:

```json
{ "message": { "user": "Pikachu", "text": "nodejs isn't hard, or is it?" } }
```
