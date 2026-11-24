import { contact, fees } from '@/data/siteData';
import { formatNaira } from './formatNaira';

const CONFIRM = ' (CONFIRM WITH ARTIST)';

function prettyDate(date) {
  if (!date) return 'Date to be confirmed';
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function prettyTime(time) {
  if (!time) return 'Time to be confirmed';
  const [hours, minutes] = time.split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return time;
  const suffix = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${String(minutes).padStart(2, '0')} ${suffix}`;
}

/**
 * Build the WhatsApp booking message.
 * Prices are read from the calculated totals — never re-computed here.
 */
export function buildWhatsAppMessage(values, totals) {
  const lines = [];
  const areaName = totals.area?.name || 'To be confirmed';
  const serviceName = totals.service?.name || 'Makeup appointment';

  lines.push("Hi Duduyemi Makeover! I'd like to book:");
  lines.push('');
  lines.push(`Service: ${serviceName}`);
  lines.push(`Area: ${areaName}`);
  lines.push(
    `People: ${values.people}${values.people >= 5 ? '+' : ''} (gele for ${totals.geleCount})`
  );
  lines.push(`Date and time: ${prettyDate(values.date)}, ${prettyTime(values.time)}`);
  lines.push(
    `Address: ${values.address || 'Home service address to be shared'}`
  );
  if (values.landmark) lines.push(`Landmark: ${values.landmark}`);
  lines.push('');

  if (totals.quoteRequired) {
    lines.push('Breakdown:');
    lines.push('- Custom quotation required — this booking is priced individually.');
    lines.push('');
    lines.push(
      'Estimated total: Price on request. I will confirm on WhatsApp.'
    );
    lines.push('');
  } else {
    lines.push('Breakdown:');
    lines.push(`- Makeup: ${formatNaira(totals.makeupSubtotal)}`);
    lines.push(`- Group discount: ${formatNaira(totals.groupDiscount)}`);
    lines.push(`- Gele: ${formatNaira(totals.geleSubtotal)}`);
    if (totals.earlyMorningFee) {
      lines.push(
        `- Early morning / late evening fee: ${formatNaira(totals.earlyMorningFee)}${
          fees.earlyMorning.requiresConfirmation ? CONFIRM : ''
        }`
      );
    }
    if (totals.expressFee) {
      lines.push(
        `- Express fee: ${formatNaira(totals.expressFee)}${
          fees.express.requiresConfirmation ? CONFIRM : ''
        }`
      );
    }
    lines.push('');
    lines.push(`Estimated total: ${formatNaira(totals.total)}`);
    lines.push(`Deposit (${totals.depositPercentage}%): ${formatNaira(totals.deposit)}`);
    lines.push(`Estimated duration: ${totals.durationLabel}`);
    lines.push('');
  }

  if (values.serviceId === 'makeup-training') {
    lines.push('I would also like details on training dates and format.');
  }

  lines.push(`Name: ${values.name || 'To be confirmed'}`);
  lines.push(`Phone: ${values.phone || 'To be confirmed'}`);
  lines.push(`Notes: ${values.notes || 'None'}`);
  lines.push('');
  lines.push('Please confirm availability.');

  return lines.join('\n');
}

export function buildWhatsAppUrl(message) {
  return `${contact.whatsappHref}?text=${encodeURIComponent(message)}`;
}

export { prettyDate, prettyTime };
export default buildWhatsAppMessage;
