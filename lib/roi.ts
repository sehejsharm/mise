/**
 * ROI model. Every input is an editable ASSUMPTION supplied by the visitor;
 * the defaults are placeholders to start from, not industry statistics.
 * Nothing here claims how much Mise reduces any cost — the "scenario" share is
 * the visitor's own assumption.
 */
export type Currency = "INR" | "USD" | "LKR";

export type RoiInputs = {
  currency: Currency;
  properties: number;
  staffPerProperty: number;
  turnoverPct: number;
  replacementCost: number;
  supervisorsPerProperty: number;
  verifyMinutesPerDay: number;
  supervisorHourlyCost: number;
  auditsPerYear: number;
  prepPeoplePerAudit: number;
  prepDaysPerAudit: number;
  prepDayCost: number;
  scenarioPct: number;
};

export const roiDefaults: RoiInputs = {
  currency: "INR",
  properties: 3,
  staffPerProperty: 120,
  turnoverPct: 40,
  replacementCost: 30000,
  supervisorsPerProperty: 4,
  verifyMinutesPerDay: 120,
  supervisorHourlyCost: 350,
  auditsPerYear: 4,
  prepPeoplePerAudit: 3,
  prepDaysPerAudit: 5,
  prepDayCost: 3000,
  scenarioPct: 15,
};

export function computeRoi(i: RoiInputs) {
  const headcount = i.properties * i.staffPerProperty;
  const leavers = headcount * (i.turnoverPct / 100);
  const turnoverCost = leavers * i.replacementCost;
  const supervisorHours = i.properties * i.supervisorsPerProperty * (i.verifyMinutesPerDay / 60) * 365;
  const supervisorCost = supervisorHours * i.supervisorHourlyCost;
  const auditDays = i.properties * i.auditsPerYear * i.prepPeoplePerAudit * i.prepDaysPerAudit;
  const auditCost = auditDays * i.prepDayCost;
  const total = turnoverCost + supervisorCost + auditCost;
  const scenarioValue = total * (i.scenarioPct / 100);
  return { headcount, leavers, turnoverCost, supervisorHours, supervisorCost, auditDays, auditCost, total, scenarioValue };
}

export function formatMoney(value: number, currency: Currency) {
  const locale = currency === "INR" ? "en-IN" : currency === "LKR" ? "en-LK" : "en-US";
  return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(Math.round(value));
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(value));
}
