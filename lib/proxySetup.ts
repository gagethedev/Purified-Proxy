/* eslint-disable @typescript-eslint/no-explicit-any */
import { BareMuxConnection } from '@mercuryworkshop/bare-mux';
import registerSW from '@/components/proxy/sw';

let uvConfig: any = null;

async function loadUVConfig() {
  if (uvConfig) return uvConfig;

  const configScript = await fetch("/uv/uv.config.js").then(response => response.text());
  const scriptElement = document.createElement("script");
  scriptElement.innerHTML = configScript;
  document.body.appendChild(scriptElement);
  uvConfig = (window as any).__uv$config;
  return uvConfig;
}

export default async function sendTo(url: string) {
  await registerSW();
  const config = await loadUVConfig();
  if (!config) {
    throw new Error("Ultraviolet configuration is missing.");
  }

  const connection = new BareMuxConnection("/baremux/worker.js");
  const frame = document.getElementById("searchFrame") as HTMLIFrameElement;

  const wispUrl = `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/wisp/`;
  if ((await connection.getTransport()) !== "/epoxy/index.mjs") {
    await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
  }

  frame.src = config.prefix + config.encodeUrl(url);
}

