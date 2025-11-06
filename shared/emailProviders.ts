export interface EmailProvider {
  id: string;
  name: string;
  icon: string;
  imapHost: string;
  imapPort: number;
  smtpHost: string;
  smtpPort: number;
  instructions: string;
  helpUrl?: string;
}

export const EMAIL_PROVIDERS: EmailProvider[] = [
  {
    id: 'gmail',
    name: 'Gmail',
    icon: '',
    imapHost: 'imap.gmail.com',
    imapPort: 993,
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    instructions: 'Enable IMAP in Gmail settings and generate an App Password (Settings → Security → 2-Step Verification → App Passwords)',
    helpUrl: 'https://support.google.com/mail/answer/7126229'
  },
  {
    id: 'outlook',
    name: 'Outlook / Hotmail',
    icon: '',
    imapHost: 'outlook.office365.com',
    imapPort: 993,
    smtpHost: 'smtp.office365.com',
    smtpPort: 587,
    instructions: 'Use your Outlook email and password. If you have 2FA enabled, generate an App Password.',
    helpUrl: 'https://support.microsoft.com/en-us/account-billing/using-app-passwords-with-apps-that-don-t-support-two-step-verification-5896ed9b-4263-e681-128a-a6f2979a7944'
  },
  {
    id: 'google-workspace',
    name: 'Google Workspace',
    icon: '',
    imapHost: 'imap.gmail.com',
    imapPort: 993,
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    instructions: 'Same as Gmail. Use your company email (e.g., you@company.com) and generate an App Password.',
    helpUrl: 'https://support.google.com/a/answer/176600'
  },
  {
    id: 'microsoft365',
    name: 'Microsoft 365',
    icon: '',
    imapHost: 'outlook.office365.com',
    imapPort: 993,
    smtpHost: 'smtp.office365.com',
    smtpPort: 587,
    instructions: 'Use your company Microsoft 365 email and password. Contact your IT admin if IMAP is disabled.',
    helpUrl: 'https://support.microsoft.com/en-us/office/pop-imap-and-smtp-settings-8361e398-8af4-4e97-b147-6c6c4ac95353'
  },
  {
    id: 'zoho',
    name: 'Zoho Mail',
    icon: '',
    imapHost: 'imap.zoho.com',
    imapPort: 993,
    smtpHost: 'smtp.zoho.com',
    smtpPort: 587,
    instructions: 'Use your Zoho email and password. Generate an App Password if you have 2FA enabled.',
    helpUrl: 'https://www.zoho.com/mail/help/imap-access.html'
  },
  {
    id: 'fastmail',
    name: 'Fastmail',
    icon: '',
    imapHost: 'imap.fastmail.com',
    imapPort: 993,
    smtpHost: 'smtp.fastmail.com',
    smtpPort: 587,
    instructions: 'Generate an App Password in Fastmail Settings → Password & Security → App Passwords.',
    helpUrl: 'https://www.fastmail.help/hc/en-us/articles/360058752854-App-passwords'
  },
  {
    id: 'icloud',
    name: 'iCloud Mail',
    icon: '',
    imapHost: 'imap.mail.me.com',
    imapPort: 993,
    smtpHost: 'smtp.mail.me.com',
    smtpPort: 587,
    instructions: 'Generate an App-Specific Password at appleid.apple.com (Sign In → Security → App-Specific Passwords).',
    helpUrl: 'https://support.apple.com/en-us/102654'
  },
  {
    id: 'protonmail',
    name: 'ProtonMail',
    icon: '',
    imapHost: '127.0.0.1',
    imapPort: 1143,
    smtpHost: '127.0.0.1',
    smtpPort: 1025,
    instructions: 'ProtonMail requires the ProtonMail Bridge app running locally. Download and install Bridge, then use the credentials it provides.',
    helpUrl: 'https://proton.me/support/protonmail-bridge-install'
  },
  {
    id: 'custom',
    name: 'Custom / Other',
    icon: '',
    imapHost: '',
    imapPort: 993,
    smtpHost: '',
    smtpPort: 587,
    instructions: 'Enter your email provider\'s IMAP and SMTP settings. Check your provider\'s documentation or contact support for these details.',
    helpUrl: ''
  }
];

export function getProviderById(id: string): EmailProvider | undefined {
  return EMAIL_PROVIDERS.find(p => p.id === id);
}

export function getProviderByEmail(email: string): EmailProvider | undefined {
  const domain = email.split('@')[1]?.toLowerCase();
  
  if (!domain) return undefined;
  
  // Match common domains to providers
  if (domain === 'gmail.com') return getProviderById('gmail');
  if (domain === 'outlook.com' || domain === 'hotmail.com' || domain === 'live.com') return getProviderById('outlook');
  if (domain === 'icloud.com' || domain === 'me.com' || domain === 'mac.com') return getProviderById('icloud');
  if (domain === 'zoho.com') return getProviderById('zoho');
  if (domain === 'fastmail.com' || domain === 'fastmail.fm') return getProviderById('fastmail');
  if (domain === 'protonmail.com' || domain === 'proton.me' || domain === 'pm.me') return getProviderById('protonmail');
  
  // For custom domains, suggest Google Workspace or Microsoft 365
  return undefined;
}
