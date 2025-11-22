import { headers } from 'next/headers';

export function getRequestHost() {
  const host = headers().get('host');
  return host ?? 'localhost';
}
