import { NS } from "types/NetscriptDefinitions";

/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {
  const targetHost = ns.args[0] ? ns.args[0] : "joesguns";

  if (typeof targetHost !== "string") return;

  const minSecurity = ns.getServerMinSecurityLevel(targetHost);
  const maxMoney = ns.getServerMaxMoney(targetHost);

  while (true) {
    const currentSecurity = ns.getServerSecurityLevel(targetHost);
    if (currentSecurity > minSecurity) {
      await ns.weaken(targetHost);
      continue;
    }

    const currentMoney = ns.getServerMoneyAvailable(targetHost);
    if (currentMoney < maxMoney) {
      await ns.grow(targetHost);
      continue;
    }

    await ns.hack(targetHost);
  }
}
