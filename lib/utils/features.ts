export const slugify = (title: string) => {
  return title
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};


export const unSlugify = (slug: string) => {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export enum ResultCode {
  InvalidCredentials = 'INVALID_CREDENTIALS',
  InvalidSubmission = 'INVALID_SUBMISSION',
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  UnknownError = 'UNKNOWN_ERROR',
  UserCreated = 'USER_CREATED',
  UserLoggedIn = 'USER_LOGGED_IN'
}
export const countryToFlagMap: Record<string, string> = {
  'United States': 'us',
  'Pakistan': 'pk',
  'Germany': 'de',
  'United Kingdom': 'gb',
  'Canada': 'ca',
  'Australia': 'au',
  'France': 'fr',
  'India': 'in',
  'Brazil': 'br',
  'Italy': 'it',
  'Spain': 'es',
  'Mexico': 'mx',
  'China': 'cn',
  'Japan': 'jp',
  'South Korea': 'kr',
  'Netherlands': 'nl',
  'Russia': 'ru',
  'Turkey': 'tr',
  'South Africa': 'za',
  'Saudi Arabia': 'sa',
  'Sweden': 'se',
  'Switzerland': 'ch',
  'United Arab Emirates': 'ae',
};



//allowed currencies
export const countryToCurrencyMap: Record<string, string> = {
  'United States': 'USD',
  'Pakistan': 'PKR',
  'Germany': 'EUR',
  'United Kingdom': 'GBP',
  'Canada': 'CAD',
  'Australia': 'AUD'
};
export const currencyToSymbolMap: Record<string, string> = {
  'USD': '$',
  'PKR': 'Rs',
  'EUR': '€',
  'GBP': '£',
  'CAD': 'C$',
  'AUD': 'A$'
};
export function extractNameFromEmail(email: string): string {
  const [localPart] = email.split('@');
  const name = localPart
    .replace(/[\._-]/g, ' ')  // Replace ".", "_", or "-" with spaces
    .replace(/\d+/g, '')  // Remove numbers
    .split(' ')  // Split the string by spaces
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalize each word
    .join(' ');  // Join the words back together with spaces

  return name;
}

export const PASSWORD_RESET_REQUEST_TEMPLATE = (resetUrl:string) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href=${resetUrl} title=${resetUrl} style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>

    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;


}
