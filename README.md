# FakeDeafen - Vencord Plugin

A port of the original **"Fake Deafen"** plugin for **Vencord**. Originally made for BetterDiscord in 2022, this plugin lets you **appear deafened in a voice channel** while still being able to hear and speak.  

> ⚠️ **Note:** This plugin only temporarily fakes deafen—typically works for up to a minute. Reconnects, voice session updates, or other events may break the fake deafen.

---

## Features

- Appear **deafened to others** while still hearing and speaking normally.  
- Works automatically—no extra commands required.  
- Compatible with string and ArrayBuffer WebSocket messages.  
- Console logs indicate when fake deafen is applied or if an error occurs.  

---

## Installation

1. Install [Vencord](https://docs.vencord.dev/installing/).  
2. Place the `FakeDeafen.plugin.js` file in your Vencord plugins folder.  
3. Enable the plugin from your plugin manager.  

---

## Usage

1. Join the voice channel you want to use FakeDeafen in.  
2. **Deafen yourself manually** before enabling the plugin.  
3. Enable the plugin.  
4. Click the **Undeafen** button in the UI.  

You are now **fake-deafened**: others see you as deafened, but you maintain full voice capabilities.

---

## Restarting

To restart FakeDeafen:

1. Disable the plugin.  
2. Restart your Discord client.  
3. Re-enable the plugin.

---

## Limitations

- Works only temporarily (~1 minute).  
- May stop working during reconnects, voice session updates, or region changes.  
- Designed specifically for **Vencord custom builds**.  
- Does not modify Discord’s server-side state; only edits outgoing messages.  

---

## Future Updates (Planned)

- Better handling of reconnects and voice session changes.  
- Longer-lasting fake deafen (as technically possible).  
- More detailed console logging for debugging.  

---

## Troubleshooting

- Ensure you **deafen yourself manually first**.  
- Restart the client if FakeDeafen stops working.  
- Check your console for logs:  
  - `Fake Deafen applied (string)!` or `Fake Deafen applied (ArrayBuffer)!`  
  - `Fake Deafen error:` indicates an issue during patching.

---

## How It Works (Simplified)

1. Intercepts outgoing WebSocket messages.  
2. Detects messages containing `"self_deaf": true`.  
3. Rewrites them to `"self_deaf": false`.  
4. Sends the modified message to the server.  

> This tricks Discord into thinking you are deafened, while you still receive audio.
