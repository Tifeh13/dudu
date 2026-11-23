import { areaById, pricing, serviceById } from '@/data/siteData';

export function todayISO(now = new Date()) {
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export function normalisePhone(phone) {
  return (phone || '').replace(/[\s()-]/g, '').trim();
}

export function isValidNigerianPhone(phone) {
  const value = normalisePhone(phone);
  // 0708..., 0803..., 0902..., 0812..., or +234708...
  return /^(?:\+?234|0)[789][01]\d{8}$/.test(value);
}

export function isValidTime(time) {
  if (!time || !/^\d{2}:\d{2}$/.test(time)) return false;
  const [hours, minutes] = time.split(':').map(Number);
  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
}

export function isPastDate(date, now = new Date()) {
  if (!date) return false;
  return date < todayISO(now);
}

/** Validate a single step. Returns an object of field → message. */
export function validateStep(stepId, values, now = new Date()) {
  const errors = {};
  const service = serviceById(values.serviceId);
  const area = areaById(values.areaId);
  const people = Number(values.people) || 0;
  const gele = Number(values.geleCount) || 0;

  if (stepId === 'service') {
    if (!values.serviceId || !service) errors.serviceId = 'Choose a service to continue.';
  }

  if (stepId === 'location') {
    if (!area) errors.areaId = 'Choose the area for your appointment.';
  }

  if (stepId === 'people') {
    if (!people) errors.people = 'Select how many people need makeup.';
    if (people < 0 || people > 5) errors.people = 'Select a group size between 1 and 5+.';
  }

  if (stepId === 'gele') {
    if (gele < 0) errors.geleCount = 'Enter zero or more people for gele.';
    if (gele > people) errors.geleCount = 'Gele count cannot be more than the group size.';
  }

  if (stepId === 'date') {
    if (!values.date) errors.date = 'Choose your event date.';
    else if (isPastDate(values.date, now)) errors.date = 'Please choose today or a future date.';
    if (!values.time) errors.time = 'Choose your preferred start time.';
    else if (!isValidTime(values.time)) errors.time = 'Enter a valid time, for example 08:30.';
  }

  if (stepId === 'address') {
    if (!values.address || values.address.trim().length < 8) {
      errors.address = 'Enter the full address for your home service appointment.';
    }
    if (values.address && values.address.trim().length > 400) {
      errors.address = 'Please keep the address under 400 characters.';
    }
  }

  if (stepId === 'details') {
    if (!values.name || values.name.trim().length < 2) errors.name = 'Enter your full name.';
    if (!values.phone) errors.phone = 'Enter your phone number.';
    else if (!isValidNigerianPhone(values.phone)) {
      errors.phone = 'Enter a valid Nigerian number, e.g. 0708 371 6694.';
    }
    if (values.notes && values.notes.length > 800) {
      errors.notes = 'Please keep notes under 800 characters.';
    }
  }

  return errors;
}

export function validateAll(values, stepIds, now = new Date()) {
  return stepIds.reduce((all, stepId) => {
    const stepErrors = validateStep(stepId, values, now);
    Object.keys(stepErrors).forEach((key) => {
      all[key] = stepErrors[key];
    });
    return all;
  }, {});
}

export const stepFields = {
  service: ['serviceId'],
  location: ['areaId'],
  people: ['people'],
  gele: ['geleCount'],
  date: ['date', 'time'],
  address: ['address'],
  details: ['name', 'phone', 'notes'],
};

export { pricing };
