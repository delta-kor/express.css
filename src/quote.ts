const SingleQuote = "'";
const DoubleQuote = '"';

export default function parseQuote(string: string): string {
  if (string[0] !== SingleQuote && string[0] !== DoubleQuote) return string;
  if (string[0] !== string[string.length - 1]) {
    console.error('Failed to parse css');
    console.error(string);
    process.exit(1);
  }

  const quote = string[0];
  string = string.replace(new RegExp(`\\\\${quote}`), quote);
  string = string.substr(1, string.length - 2);
  return string;
}
