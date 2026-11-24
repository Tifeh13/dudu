import { areaById, fees, pricing, serviceById } from '@/data/siteData';

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

/**
 * Resolve the published tier for an area and group size.
 * Returns null when the area is "other" or the group is 5+.
 */
export function getTier(areaId, people) {
  const area = areaById(areaId);
  if (!area || area.zone === 'other') return null;
  if (!people || people < 1 || people > 4) return null;
  const table = pricing[area.zone];
  if (!table) return null;
  return table.tiers.find((tier) => tier.people === people) || null;
}

export function getTimeMinutes(time) {
  if (!time || typeof time !== 'string') return null;
  const [hours, minutes] = time.split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
  return hours * 60 + minutes;
}

/** Appointments starting between 8:00 AM and 8:59 AM. */
export function isEarlyMorning(time) {
  const minutes = getTimeMinutes(time);
  if (minutes === null) return false;
  return (
    minutes >= getTimeMinutes(fees.earlyMorning.from) &&
    minutes < getTimeMinutes(fees.earlyMorning.before)
  );
}

/** Appointments starting from 9:00 PM onwards — these are express bookings. */
export function isLateEvening(time) {
  const minutes = getTimeMinutes(time);
  if (minutes === null) return false;
  return minutes >= getTimeMinutes(fees.express.from);
}

export function isExpress(date, time, now = new Date()) {
  if (!date || !time) return false;
  // Evening starts from 9:00 PM are always express.
  if (isLateEvening(time)) return true;
  const appointment = new Date(`${date}T${time}:00`);
  if (Number.isNaN(appointment.getTime())) return false;
  const diff = appointment.getTime() - now.getTime();
  return diff > 0 && diff < fees.express.windowHours * HOUR;
}

export function getDuration(service, people, geleCount) {
  const count = Number(people) || 0;
  const gele = Math.min(Number(geleCount) || 0, count);

  if (service?.durationMinutes) {
    // Bridal and bridal trial durations are fixed in siteData.
    if (service.id === 'bridal-makeup' || service.id === 'bridal-trial') {
      return service.durationMinutes;
    }
  }

  const regular = count * pricing.durations.regularPerPersonMinutes;
  const geleMinutes = gele * pricing.durations.gelePerPersonMinutes;
  const total = regular + geleMinutes;

  if (!total && service?.durationMinutes) return service.durationMinutes;
  return total;
}

export function formatDuration(minutes) {
  if (!minutes || minutes <= 0) return 'To be confirmed';
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  const hourLabel = hours === 1 ? '1 hour' : `${hours} hours`;
  if (!remaining) return hourLabel;
  if (hours === 0) return `${remaining} minutes`;
  return `${hourLabel} ${remaining} minutes`;
}

/**
 * Calculate a booking estimate.
 *
 * Rules
 *  - Base makeup price comes from the selected area and group size.
 *  - Gele is ₦20,000 per person and is never discounted.
 *  - Starts between 8:00 and 8:59 AM add ₦5,000 (early morning).
 *  - Starts from 9:00 PM, or bookings under 24 hours away, add ₦10,000
 *    (express). The express fee is charged once even if both apply.
 *  - Deposit is 70% of the estimated total.
 *  - 1 hour of makeup per person, plus 30 minutes of gele per person.
 *
 * Quote-only when: the service is quoteOnly, the area is outside Lagos, the
 * group is 5+, or the group size is outside the published table.
 */
export function calculateTotal(input, now = new Date()) {
  const service = serviceById(input.serviceId);
  const area = areaById(input.areaId);
  const people = Number(input.people) || 0;
  const geleCount = Math.max(0, Math.min(Number(input.geleCount) || 0, people));

  const tier = getTier(input.areaId, people);

  const quoteReasons = [];
  if (!area) quoteReasons.push('location');
  if (!service) quoteReasons.push('service');
  if (service?.quoteOnly) quoteReasons.push('service-quote');
  if (area && area.zone === 'other') quoteReasons.push('outside-area');
  if (people >= 5) quoteReasons.push('group-five-plus');
  if (people < 1) quoteReasons.push('incomplete');
  if (!tier && area && area.zone !== 'other' && people >= 1 && people < 5) {
    quoteReasons.push('incomplete');
  }

  const quoteRequired = quoteReasons.length > 0;

  const makeupSubtotal = quoteRequired || !tier ? 0 : tier.makeupSubtotal;
  const groupDiscount = quoteRequired || !tier ? 0 : tier.discount;
  const geleSubtotal = geleCount * pricing.gele.pricePerPerson;
  const earlyMorningFee = isEarlyMorning(input.time) ? fees.earlyMorning.amount : 0;
  const expressFee = isExpress(input.date, input.time, now) ? fees.express.amount : 0;
  const total = quoteRequired
    ? 0
    : makeupSubtotal - groupDiscount + geleSubtotal + earlyMorningFee + expressFee;
  const deposit = quoteRequired ? 0 : Math.round((total * pricing.depositPercentage) / 100);
  const durationMinutes = getDuration(service, people, geleCount);

  return {
    quoteRequired,
    quoteReasons,
    service,
    area,
    people,
    geleCount,
    makeupSubtotal,
    groupDiscount,
    geleSubtotal,
    earlyMorningFee,
    expressFee,
    total: Math.round(total),
    deposit,
    depositPercentage: pricing.depositPercentage,
    durationMinutes,
    durationLabel: formatDuration(durationMinutes),
    earlyMorning: isEarlyMorning(input.time),
    lateEvening: isLateEvening(input.time),
    express: isExpress(input.date, input.time, now),
  };
}

export default calculateTotal;
