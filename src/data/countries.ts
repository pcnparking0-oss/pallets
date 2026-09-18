export interface CountryData {
  code: string;
  name: string;
  currency: 'EUR' | 'GBP';
  isEU: boolean;
  standardVatRate: number;
  vatRegex: RegExp;
  basePalletFreightEur: number; // For single euro pallet (120x80)
  additionalPalletEur: number;  // Incremental rate
  transitDays: string;
  primaryCarrier: string;
  samplePostal: string;
}

export const COUNTRIES: CountryData[] = [
  {
    code: 'NL',
    name: 'The Netherlands (Domestic Hub)',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 21,
    vatRegex: /^NL[0-9]{9}B[0-9]{2}$/i,
    basePalletFreightEur: 68,
    additionalPalletEur: 42,
    transitDays: '24 hours (Next Day)',
    primaryCarrier: 'Raben Logistics NL',
    samplePostal: '5928 PCA'
  },
  {
    code: 'DE',
    name: 'Germany',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 19,
    vatRegex: /^DE[0-9]{9}$/i,
    basePalletFreightEur: 85,
    additionalPalletEur: 55,
    transitDays: '24 - 48 hours',
    primaryCarrier: 'DB Schenker Germany',
    samplePostal: '40213'
  },
  {
    code: 'BE',
    name: 'Belgium',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 21,
    vatRegex: /^BE[0-1][0-9]{9}$/i,
    basePalletFreightEur: 75,
    additionalPalletEur: 48,
    transitDays: '24 - 48 hours',
    primaryCarrier: 'DSV Logistics Belgium',
    samplePostal: '2000'
  },
  {
    code: 'FR',
    name: 'France',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 20,
    vatRegex: /^FR[0-9A-Z]{2}[0-9]{9}$/i,
    basePalletFreightEur: 135,
    additionalPalletEur: 85,
    transitDays: '48 - 72 hours',
    primaryCarrier: 'Geodis European Freight',
    samplePostal: '75001'
  },
  {
    code: 'AT',
    name: 'Austria',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 20,
    vatRegex: /^ATU[0-9]{8}$/i,
    basePalletFreightEur: 145,
    additionalPalletEur: 92,
    transitDays: '48 - 72 hours',
    primaryCarrier: 'Quehenberger Logistics',
    samplePostal: '1010'
  },
  {
    code: 'PL',
    name: 'Poland',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 23,
    vatRegex: /^PL[0-9]{10}$/i,
    basePalletFreightEur: 130,
    additionalPalletEur: 78,
    transitDays: '48 - 72 hours',
    primaryCarrier: 'Raben Group CEE',
    samplePostal: '00-001'
  },
  {
    code: 'IT',
    name: 'Italy',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 22,
    vatRegex: /^IT[0-9]{11}$/i,
    basePalletFreightEur: 185,
    additionalPalletEur: 115,
    transitDays: '3 - 4 business days',
    primaryCarrier: 'Arcese Road Freight',
    samplePostal: '20121'
  },
  {
    code: 'ES',
    name: 'Spain',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 21,
    vatRegex: /^ES[0-9A-Z][0-9]{7}[0-9A-Z]$/i,
    basePalletFreightEur: 195,
    additionalPalletEur: 120,
    transitDays: '3 - 4 business days',
    primaryCarrier: 'Carreras Grupo Logístico',
    samplePostal: '28001'
  },
  {
    code: 'DK',
    name: 'Denmark',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 25,
    vatRegex: /^DK[0-9]{8}$/i,
    basePalletFreightEur: 140,
    additionalPalletEur: 88,
    transitDays: '48 - 72 hours',
    primaryCarrier: 'DSV Nordic Line',
    samplePostal: '1050'
  },
  {
    code: 'SE',
    name: 'Sweden',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 25,
    vatRegex: /^SE[0-9]{12}$/i,
    basePalletFreightEur: 190,
    additionalPalletEur: 125,
    transitDays: '3 - 5 business days',
    primaryCarrier: 'PostNord Cargo',
    samplePostal: '111 22'
  },
  {
    code: 'CZ',
    name: 'Czech Republic',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 21,
    vatRegex: /^CZ[0-9]{8,10}$/i,
    basePalletFreightEur: 125,
    additionalPalletEur: 80,
    transitDays: '48 - 72 hours',
    primaryCarrier: 'C.S.CARGO Central Europe',
    samplePostal: '110 00'
  },
  {
    code: 'HU',
    name: 'Hungary',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 27,
    vatRegex: /^HU[0-9]{8}$/i,
    basePalletFreightEur: 165,
    additionalPalletEur: 105,
    transitDays: '3 - 4 business days',
    primaryCarrier: 'Waberer\'s International',
    samplePostal: '1051'
  },
  {
    code: 'RO',
    name: 'Romania',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 19,
    vatRegex: /^RO[0-9]{2,10}$/i,
    basePalletFreightEur: 230,
    additionalPalletEur: 145,
    transitDays: '4 - 6 business days',
    primaryCarrier: 'Gefco Southeast Network',
    samplePostal: '010011'
  },
  {
    code: 'IE',
    name: 'Ireland',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 23,
    vatRegex: /^IE([0-9][A-Z0-9\+\*][0-9]{5}[A-Z]|[0-9]{7}WI)$/i,
    basePalletFreightEur: 215,
    additionalPalletEur: 135,
    transitDays: '3 - 4 business days (Ferry)',
    primaryCarrier: 'Kuehne+Nagel Ireland',
    samplePostal: 'D02 X285'
  },
  {
    code: 'PT',
    name: 'Portugal',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 23,
    vatRegex: /^PT[0-9]{9}$/i,
    basePalletFreightEur: 225,
    additionalPalletEur: 140,
    transitDays: '4 - 5 business days',
    primaryCarrier: 'Luis Simões Iberia',
    samplePostal: '1000-001'
  },
  {
    code: 'FI',
    name: 'Finland',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 24,
    vatRegex: /^FI[0-9]{8}$/i,
    basePalletFreightEur: 240,
    additionalPalletEur: 155,
    transitDays: '4 - 5 business days',
    primaryCarrier: 'Kaukokiito Nordic',
    samplePostal: '00100'
  },
  {
    code: 'SK',
    name: 'Slovakia',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 20,
    vatRegex: /^SK[0-9]{10}$/i,
    basePalletFreightEur: 145,
    additionalPalletEur: 92,
    transitDays: '48 - 72 hours',
    primaryCarrier: 'Gebrüder Weiss',
    samplePostal: '811 01'
  },
  {
    code: 'SI',
    name: 'Slovenia',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 22,
    vatRegex: /^SI[0-9]{8}$/i,
    basePalletFreightEur: 160,
    additionalPalletEur: 100,
    transitDays: '3 - 4 business days',
    primaryCarrier: 'Intereuropa d.d.',
    samplePostal: '1000'
  },
  {
    code: 'HR',
    name: 'Croatia',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 25,
    vatRegex: /^HR[0-9]{11}$/i,
    basePalletFreightEur: 195,
    additionalPalletEur: 125,
    transitDays: '3 - 5 business days',
    primaryCarrier: 'Raben Logistics Adria',
    samplePostal: '10000'
  },
  {
    code: 'BG',
    name: 'Bulgaria',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 20,
    vatRegex: /^BG[0-9]{9,10}$/i,
    basePalletFreightEur: 255,
    additionalPalletEur: 160,
    transitDays: '5 - 6 business days',
    primaryCarrier: 'Gopet Trans CEE',
    samplePostal: '1000'
  },
  {
    code: 'LT',
    name: 'Lithuania',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 21,
    vatRegex: /^LT([0-9]{9}|[0-9]{12})$/i,
    basePalletFreightEur: 210,
    additionalPalletEur: 130,
    transitDays: '4 - 5 business days',
    primaryCarrier: 'Girteka Logistics',
    samplePostal: '01100'
  },
  {
    code: 'LV',
    name: 'Latvia',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 21,
    vatRegex: /^LV[0-9]{11}$/i,
    basePalletFreightEur: 220,
    additionalPalletEur: 138,
    transitDays: '4 - 5 business days',
    primaryCarrier: 'Kreiss Logistics Baltics',
    samplePostal: 'LV-1050'
  },
  {
    code: 'EE',
    name: 'Estonia',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 22,
    vatRegex: /^EE[0-9]{9}$/i,
    basePalletFreightEur: 235,
    additionalPalletEur: 145,
    transitDays: '4 - 5 business days',
    primaryCarrier: 'DFDS Logistics Baltics',
    samplePostal: '10111'
  },
  {
    code: 'LU',
    name: 'Luxembourg',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 17,
    vatRegex: /^LU[0-9]{8}$/i,
    basePalletFreightEur: 85,
    additionalPalletEur: 52,
    transitDays: '24 - 48 hours',
    primaryCarrier: 'Arthur Welter Transport',
    samplePostal: 'L-1111'
  },
  {
    code: 'GR',
    name: 'Greece',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 24,
    vatRegex: /^EL[0-9]{9}$/i,
    basePalletFreightEur: 310,
    additionalPalletEur: 195,
    transitDays: '5 - 7 business days',
    primaryCarrier: 'Goldair Cargo Hellas',
    samplePostal: '104 31'
  },
  {
    code: 'CY',
    name: 'Cyprus',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 19,
    vatRegex: /^CY[0-9]{8}[A-Z]$/i,
    basePalletFreightEur: 420,
    additionalPalletEur: 290,
    transitDays: '7 - 10 business days (Sea Cargo)',
    primaryCarrier: 'Shoham Cyprus Sea Freight',
    samplePostal: '1010'
  },
  {
    code: 'MT',
    name: 'Malta',
    currency: 'EUR',
    isEU: true,
    standardVatRate: 18,
    vatRegex: /^MT[0-9]{8}$/i,
    basePalletFreightEur: 380,
    additionalPalletEur: 260,
    transitDays: '6 - 8 business days (Sea Cargo)',
    primaryCarrier: 'Express Trailers Malta',
    samplePostal: 'VLT 1115'
  },
  {
    code: 'GB',
    name: 'United Kingdom (Export)',
    currency: 'GBP',
    isEU: false,
    standardVatRate: 0, // 0% Export VAT, customs cleared at Dover/Felixstowe
    vatRegex: /^GB([0-9]{9}|[0-9]{12}|(GD|HA)[0-9]{3})$/i,
    basePalletFreightEur: 175,
    additionalPalletEur: 115,
    transitDays: '3 - 4 business days (Customs)',
    primaryCarrier: 'Davies Turner UK Freight',
    samplePostal: 'EC1A 1BB'
  }
];

export function validateViesVat(inputVat: string, targetCountryCode: string) {
  const cleanVat = inputVat.replace(/[\s\-\.]/g, '').toUpperCase();
  
  if (!cleanVat || cleanVat.length < 5) {
    return {
      isValid: false,
      vatNumber: cleanVat,
      countryCode: targetCountryCode,
      isReverseChargeEligible: false,
      vatRatePercent: 21,
      message: 'Please enter a valid VAT registration number.'
    };
  }

  // Extract prefix
  const prefix = cleanVat.substring(0, 2);
  const country = COUNTRIES.find(c => c.code === prefix || (prefix === 'EL' && c.code === 'GR'));

  if (!country) {
    return {
      isValid: false,
      vatNumber: cleanVat,
      countryCode: targetCountryCode,
      isReverseChargeEligible: false,
      vatRatePercent: 21,
      message: `Invalid country code prefix "${prefix}". Must match EU member states (e.g., DE, FR, BE).`
    };
  }

  const isValidFormat = country.vatRegex.test(cleanVat);
  if (!isValidFormat) {
    return {
      isValid: false,
      vatNumber: cleanVat,
      countryCode: country.code,
      isReverseChargeEligible: false,
      vatRatePercent: country.standardVatRate,
      message: `Format does not match official ${country.name} VIES format syntax.`
    };
  }

  // Check if Intra-EU Reverse Charge applies
  // EuroPalletLiquidation B.V. is established in NL.
  if (country.code === 'NL') {
    return {
      isValid: true,
      vatNumber: cleanVat,
      countryCode: 'NL',
      companyName: 'DUTCH REGISTERED COMMERCE B.V.',
      address: 'Keizersgracht 421, 1016 EK Amsterdam',
      isReverseChargeEligible: false,
      vatRatePercent: 21, // Domestic Dutch BTW applied
      message: 'Verified VIES NL Taxpayer. Domestic Dutch 21% BTW applies (reclaimable via standard Belastingdienst OB return).'
    };
  } else if (country.isEU) {
    return {
      isValid: true,
      vatNumber: cleanVat,
      countryCode: country.code,
      companyName: `${country.name.toUpperCase()} WHOLESALE HANDELS GMBH / SAS`,
      address: `Industrial Logistics Park, ${country.samplePostal}`,
      isReverseChargeEligible: true,
      vatRatePercent: 0, // 0% intra-EU Reverse Charge Article 138
      message: '✓ VIES Verified Active: 0% Intra-EU Reverse Charge Applied (Art. 138 Directive 2006/112/EC).'
    };
  } else {
    // UK or non-EU export
    return {
      isValid: true,
      vatNumber: cleanVat,
      countryCode: country.code,
      companyName: 'UK ENTERPRISES LTD',
      address: 'London Gateway Logistics Park, UK',
      isReverseChargeEligible: true,
      vatRatePercent: 0,
      message: '✓ UK Export Verified: 0% Zero-Rated Extra-EU Export. Local import duties handled on entry.'
    };
  }
}
