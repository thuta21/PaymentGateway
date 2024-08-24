export function parseUserDefinedFields(userDefined: string[]): string[] {
  if (userDefined.length > 5) {
    throw new Error('Only 5 user-defined values are allowed.');
  }

  const maxFields = 5;
  const filledUserDefined = new Array(maxFields).fill('');

  for (let i = 0; i < userDefined.length; i++) {
    filledUserDefined[i] = userDefined[i] || '';
  }

  return filledUserDefined;
}
