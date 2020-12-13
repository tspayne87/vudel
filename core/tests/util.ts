/**
 * Helper function to wait an amount of time in a promise like way
 * 
 * @param milliseconds The number of milliseconds we need to wait
 */
export function wait(milliseconds?: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, milliseconds));
}