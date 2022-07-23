export function validateEmail(email: string) {
  const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

  if (mailformat.test(email)) return true

  return false
}
