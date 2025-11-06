import { NS } from "types/NetscriptDefinitions";

/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {
  try {
    upgradeServers(ns);
  } catch (error) {
    ns.tprint(error.message);
  }
}

export function upgradeServers(ns: NS) {
  const purchasedHosts = ns.getPurchasedServers();
  const double = 2;
  for (const purchasedHost of purchasedHosts) {
    const currentRam = ns.getServerMaxRam(purchasedHost);
    const upgradeRam = currentRam * double;

    const status = ns.upgradePurchasedServer(purchasedHost, upgradeRam);

    if (!status) {
      const serverCost = ns.getPurchasedServerUpgradeCost(
        purchasedHost,
        upgradeRam
      );
      const money = ns.getPlayer().money;
      const moneyNeededToBuyServer = Math.ceil(serverCost - money);
      const formattedNumber = moneyNeededToBuyServer.toLocaleString("en-US");
      throw new Error(`Insufficient Funds: Require $${formattedNumber}`);
    }
  }
}
