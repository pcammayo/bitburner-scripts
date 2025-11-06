import { NS } from "types/NetscriptDefinitions";

/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {
  buyServers(ns);
}

export function buyServers(ns: NS) {
  const serverLimit = ns.getPurchasedServerLimit();
  let serverLength = ns.getPurchasedServers().length;
  while (serverLength !== serverLimit) {
    try {
      buyServer(ns);
    } catch (error) {
      ns.tprint(error);
    }
    serverLength = ns.getPurchasedServers().length;
  }
}

export function buyServer(ns: NS): string {
  const serverPrefix = "DecidedNoodles";
  const startRam = 2;

  const host = ns.purchaseServer(serverPrefix, startRam);

  if (!host) {
    const player = ns.getPlayer();
    const moneyNeededToBuyServer =
      ns.getPurchasedServerCost(startRam) - player.money;
    throw new Error(`Insufficient Funds: Require ${moneyNeededToBuyServer}`);
  }

  return host;
}
