import definePlugin from "@utils/types";

declare global {
    interface Window {
        _fakeDeafenOriginalSend?: typeof WebSocket.prototype.send;
    }
}

/**
 * @name Fake Deafen
 * @version 1.0.0
 * @description Automatically fakes deafen in Discord voice channels (manual deafen first).
 * @author Linkgamz
 * @authorId 1376386049344929834
 * @source https://docs.vencord.dev/installing/
 */

export default definePlugin({
    name: "Fake Deafen",
    description: "Automatically fakes deafen in Discord voice channels.",
    authors: [{ name: "Linkgamz", id: 1376386049344929834n }],

    _enabled: true,

    start() {
        console.log(`${this.name} started!`);
        this.patchWebSocket();
    },

    stop() {
        console.log(`${this.name} stopped!`);
        if (window._fakeDeafenOriginalSend) {
            WebSocket.prototype.send = window._fakeDeafenOriginalSend;
            window._fakeDeafenOriginalSend = undefined;
        }
        this._enabled = false;
    },

    patchWebSocket() {
        const textDecoder = new TextDecoder("utf-8");
        const textEncoder = new TextEncoder();

        // Save original WebSocket send function
        window._fakeDeafenOriginalSend ??= WebSocket.prototype.send;

        WebSocket.prototype.send = (data: ArrayBuffer | string | Blob | ArrayBufferView) => {
            try {
                if (this._enabled && data instanceof ArrayBuffer) {
                    let decoded = textDecoder.decode(data);
                    if (decoded.includes('"self_deaf":true')) {
                        decoded = decoded.replace('"self_deaf":true', '"self_deaf":false');
                        data = textEncoder.encode(decoded).buffer;
                        console.log("Fake Deafen applied!");
                    }
                }
            } catch (err) {
                console.error("Fake Deafen error:", err);
            }

            return (window._fakeDeafenOriginalSend as any).apply(this, [data]);
        };
    }
});
