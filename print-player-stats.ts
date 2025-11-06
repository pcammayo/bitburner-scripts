import { NS } from "types/NetscriptDefinitions";

/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {
  const player = ns.getPlayer();
  const playerAttributes = [
    "entropy",
    "factions",
    "jobs",
    "karma",
    "location",
    "money",
    "numPeopleKilled",
    "totalPlaytime",
  ];

  for (const attribute of playerAttributes) {
    ns.tprint(`${attribute}: ${player[attribute]}`);
  }
}
