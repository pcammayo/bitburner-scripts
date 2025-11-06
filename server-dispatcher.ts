import { NS } from "types/NetscriptDefinitions";

/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {
  const script = ns.args[0];

  if (typeof script !== "string") return;

  dispatchOnAllPurchasedServers(ns, script);
}

export function dispatchOnAllPurchasedServers(ns: NS, script: string): void {
  const purchasedServers = ns.getPurchasedServers();
  const scriptRam = ns.getScriptRam(script);

  for (const purchasedServer of purchasedServers) {
    const serverRam = ns.getServerMaxRam(purchasedServer);

    if (scriptRam > serverRam) {
      continue;
    }

    ns.scp(script, purchasedServer);
    ns.killall(purchasedServer);
    const threads = Math.floor(serverRam / scriptRam);
    ns.tprint(`script: ${script}`);
    ns.tprint(`serverRam: ${serverRam}`);
    ns.tprint(`scriptRam: ${scriptRam}`);
    ns.tprint(`threads: ${threads}`);
    const pid = ns.exec(script, purchasedServer, threads);
    ns.tprint(`pid: ${pid}`);
  }
}
