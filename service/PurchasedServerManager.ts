import { NS } from "types/NetscriptDefinitions";

export class PurchasedServerManager {
  static purchaseMaxServers(ns: NS) {
    const serverLimit = ns.getPurchasedServerLimit();
    let serverLength = ns.getPurchasedServers().length;
    while (serverLength !== serverLimit) {
      try {
        this.purchaseServer(ns);
      } catch (error) {
        ns.tprint(error);
      }
      serverLength = ns.getPurchasedServers().length;
    }
  }

  static purchaseServer(ns: NS) {
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
}
