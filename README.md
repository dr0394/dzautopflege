# AutoPflege Profi - Telegram Bot Setup

## 🤖 Telegram Bot Benachrichtigungen einrichten

### Schritt 1: Telegram Bot erstellen

1. **BotFather kontaktieren:**
   - Öffne Telegram und suche nach `@BotFather`
   - Starte eine Unterhaltung mit `/start`

2. **Neuen Bot erstellen:**
   ```
   /newbot
   ```
   - **Bot Name:** `AutoPflege Chouman Bot`
   - **Bot Username:** `autopflege_chouman_bot` (muss eindeutig sein)

3. **Bot Token kopieren:**
   - Du erhältst einen Token wie: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`
   - **WICHTIG:** Diesen Token sicher aufbewahren!

### Schritt 2: Chat ID herausfinden

1. **Bot zu Gruppe hinzufügen ODER privat schreiben:**
   - Suche deinen Bot: `@autopflege_chouman_bot`
   - Sende eine Nachricht: `/start`

2. **Chat ID ermitteln:**
   
   **Methode 1 - Einfach mit @userinfobot:**
   - Suche in Telegram nach `@userinfobot`
   - Starte den Bot mit `/start`
   - Der Bot zeigt dir sofort deine Chat ID an
   
   **Methode 2 - Über Browser:**
   - Öffne: `https://api.telegram.org/bot[DEIN_BOT_TOKEN]/getUpdates`
   - Ersetze `[DEIN_BOT_TOKEN]` mit deinem echten Token
   - Schreibe vorher eine Nachricht an deinen Bot!
   - Suche nach `"chat":{"id":` - das ist deine Chat ID
   
   **Methode 3 - Telegram Web:**
   - Öffne https://web.telegram.org
   - Klicke auf deinen Bot-Chat
   - Die Chat ID steht in der URL nach `/im?p=u`

### Schritt 3: Umgebungsvariablen setzen

Erstelle eine `.env` Datei im Projektordner:

```env
VITE_TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
VITE_TELEGRAM_CHAT_ID=123456789
```

### Schritt 4: Testen

1. **Formular ausfüllen** auf der Website
2. **Sofortige Benachrichtigung** sollte in Telegram ankommen
3. **Enthält alle wichtigen Infos:** Name, Telefon, Services, etc.

## 📱 Benachrichtigungs-Features

- ✅ **Sofortige Benachrichtigungen** bei neuen Anfragen
- ✅ **Alle Kundendetails** in einer Nachricht
- ✅ **Emojis** für bessere Übersicht
- ✅ **Qualifikations-Score** wenn verfügbar
- ✅ **Direkter Telefon-Link** zum Anrufen
- ✅ **Kostenlos** - keine monatlichen Gebühren
- ✅ **Zuverlässig** - funktioniert 24/7

## 🔧 Troubleshooting

**Bot antwortet nicht:**
- Token korrekt kopiert?
- Chat ID richtig ermittelt?
- Bot gestartet mit `/start`?

**Keine Benachrichtigungen:**
- `.env` Datei im richtigen Ordner?
- Umgebungsvariablen richtig benannt?
- Website neu geladen nach `.env` Änderung?

## 💡 Zusätzliche Features

Du kannst den Bot erweitern mit:
- **Buttons** für schnelle Aktionen
- **Status-Updates** senden
- **Terminbestätigungen** verschicken
- **Fotos** von Fahrzeugen empfangen

---

**Support:** Bei Problemen einfach melden! 🚗✨