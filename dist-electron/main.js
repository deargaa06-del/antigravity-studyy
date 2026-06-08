import { createRequire as e } from "node:module";
//#region \0rolldown/runtime.js
var t = /* @__PURE__ */ e(import.meta.url), { app: n, BrowserWindow: r } = t("electron"), i = t("path");
function a() {
	let e = new r({
		width: 1200,
		height: 800,
		title: "생기부 마스터",
		webPreferences: {
			nodeIntegration: !0,
			contextIsolation: !1
		}
	});
	process.env.VITE_DEV_SERVER_URL ? e.loadURL(process.env.VITE_DEV_SERVER_URL) : e.loadFile(i.join(__dirname, "../dist/index.html"));
}
n.whenReady().then(a), n.on("window-all-closed", () => {
	process.platform !== "darwin" && n.quit();
}), n.on("activate", () => {
	r.getAllWindows().length === 0 && a();
});
//#endregion
export {};
