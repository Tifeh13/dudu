/**
 * Focuses the first usable control in the booking form. Step links and hidden
 * panel buttons are skipped, since focusing those does nothing.
 */
export function focusFirstField(root) {
  const preferred = root.querySelector('#booking-service');
  if (preferred && preferred.offsetParent !== null) {
    preferred.focus({ preventScroll: true });
    return;
  }
  const field = Array.from(root.querySelectorAll('select, input, textarea')).find(
    (element) => element.offsetParent !== null && !element.disabled
  );
  field?.focus({ preventScroll: true });
}
