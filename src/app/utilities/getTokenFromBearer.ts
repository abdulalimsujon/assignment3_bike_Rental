export function getTokenFromBearer(authHeader: string) {
  const parts = authHeader.split(/\s+/); // Split by one or more whitespace characters
  if (parts[0].toLowerCase() === 'bearer' && parts.length > 1) {
    return parts.slice(1).join(' '); // Join the rest in case of multiple spaces within the token
  }
  throw new Error('Invalid bearer token format');
}
