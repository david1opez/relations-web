export type MicrosoftProfile = {
  "@odata.context": string;
    businessPhones: string[];
    displayName: string;
    givenName: string;
    id: string;
    jobTitle: string | null;
    mail: string | null;
    mobilePhone: string | null;
    officeLocation: string | null;
    preferredLanguage: string;
    surname: string;
    userPrincipalName: string;
}

type AuthResponse = {
  profile: MicrosoftProfile;
  tokens: {
    access_token: string;
    expires_in: number;
    ext_expires_in: number;
    id_token: string;
    scope: string;
    token_type: string;
  };
};

export default AuthResponse;
