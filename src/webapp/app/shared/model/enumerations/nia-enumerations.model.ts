export enum EIdCardTypeCode {
  DRIVER_LICENSE = '01',

  VOTER_ID = '02',

  PASSPORT = '03',

  NATIONAL_ID = '04',

  NHIS_ID = '05',

  OTHER = '06',
}

export enum ECustomerTypeCode {
  INDIVIDUAL = '01',

  CORPORATE = '02',
}

export enum EIntermediaryTypeCode {
  AGENT = '01',

  BROKER = '02',

  REINSURANCE = '03',

  DIRECT = '04',
}

export enum EBodyTypeCode {
  BIG = '01',

  MEDIUM = '02',

  LARGE = '03',
}

export enum ECurrencyCode {
  GHANA_CEDIS = 'GHS',

  US_DOLLAR = 'US',

  POUND_STERLING = 'GBP',

  EURO = 'EUR',
}

export enum ECoverTypeCode {
  THIRD_PARTY = 'TP',

  COMPREHENSIVE = 'COMP',

  THIRD_PARTY_FIRE_AND_THEFT = 'TFT',
}

export enum EComputationTypeCode {
  ONE_YEAR = '01',

  SHORT_RATE = '02',

  PRORATA = '03',
}

export enum EExcessTypeCode {
  EXCESS_IS_APPLICABLE = 'EIA',

  EXCESS_IS_BOUGHT = 'EIB',

  VOLUNTARY_EXCESS_IS_TAKEN = 'VET',

  EXCESS_IS_NOT_APPLICABLE = 'ENA',
}

export enum EDiscountTypeCode {
  FLEET_DISCOUNT = 'FLD',

  NO_CLAIM_DISCOUNT = 'NCD',

  OTHER_DISCOUNT = 'OTD',
}

export enum ELoadingTypeCode {
  AGE_LOADING = 'AGL',

  CUBIC_CAPACITY_LOADING = 'CCL',

  OTHER_LOADINGS = 'ODL',
}

export enum ENiaPolicyStatus {
  PENDING = 'PENDING',
  INCOMPLETE = 'INCOMPLETE',
  SENT = 'SENT',
}
