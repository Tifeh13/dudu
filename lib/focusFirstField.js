/**
 * Focuses the first usable control in the booking form. Step links and hidden
 * panel buttons are skipped, since focusing those does nothing.
 */
export function focusFirstField(root) {
  const group = root.querySelector('#booking-service');

  if (group) {
    const control = group.matches('input, select, textarea')
      ? group
      : group.querySelector('input, select, textarea');
    if (control) {
      control.focus({ preventScroll: true });
      return;
    }
    group.focus({ preventScroll: true });
    return;
  }

  const field = Array.from(root.querySelectorAll('select, input, textarea')).find(
    (element) => !element.disabled
  );
  field?.focus({ preventScroll: true });
}
