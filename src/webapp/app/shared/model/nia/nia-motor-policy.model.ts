import { Moment } from 'moment';
import { EBodyTypeCode, ECurrencyCode } from '../enumerations/nia-enumerations.model';
import { ENiaPolicyStatus } from '../enumerations/nia-enumerations.model';
import { INiaCustomer } from './nia-customer.model';
import { INiaDiscount } from './nia-discount.model';
import { INiaIntermediary } from './nia-intermediary.model';
import { INiaLoading } from './nia-loading.model';

export interface INiaMotorPolicy {
  id?: string;
  reference?: string;
  serverReference?: string;
  policyNumber?: string;
  vehicleRegistration?: string;
  make?: string;
  model?: string;
  chasisNumber?: string;
  bodyTypeCode?: EBodyTypeCode;
  seats?: number;
  yearOfManufacture?: string;
  cubicCapacity?: number;
  mileage?: number;
  fleet?: boolean;
  currencyCode?: ECurrencyCode;
  exchangeRate?: number;
  coverTypeCode?: string;
  scheduleCode?: string;
  computationTypeCode?: string;
  days?: number;
  inceptionDate?: Moment;
  expiryDate?: Moment;
  sumInsured?: number;
  sumInsuredRate?: number;
  sumInsuredCharge?: number;
  excessTypeCode?: string;
  excessRate?: number;
  excessAmount?: number;
  excessCharge?: number;
  totalPremium?: number;
  coInsureCode?: string;
  coInsureRate?: number;
  coInsureAmount?: number;
  tppdLimit?: number;
  tppdRate?: number;
  extraTppdCharge?: number;
  basicPremium?: number;
  adjustedPremium?: number;
  stickerFee?: number;
  personalAccidentCharge?: number;
  levies?: number;
  perils?: number;
  ecowasPerilCharge?: number;
  brownCardFee?: number;
  extraSeatsCharge?: number;
  additionalPerilCharge?: number;
  totalDiscount?: number;
  subTotalPremium?: number;
  legacyPolicyNumber?: string;
  comment?: string;
  branchCode?: string;
  totalLoading?: number;
  version?: number;
  createdDate?: Moment;
  modifiedDate?: Moment;
  createdBy?: string;
  modifiedBy?: string;
  discounts?: INiaDiscount[];
  loadings?: INiaLoading[];
  customer?: INiaCustomer;
  intermediary?: INiaIntermediary;
  niaPolicyStatus?: ENiaPolicyStatus; // change to status
}

export class NiaMotorPolicy implements INiaMotorPolicy {
  constructor(
    public id?: string,
    public reference?: string,
    public serverReference?: string,
    public policyNumber?: string,
    public vehicleRegistration?: string,
    public make?: string,
    public model?: string,
    public chasisNumber?: string,
    public bodyTypeCode?: EBodyTypeCode,
    public seats?: number,
    public yearOfManufacture?: string,
    public cubicCapacity?: number,
    public mileage?: number,
    public fleet?: boolean,
    public currencyCode?: ECurrencyCode,
    public exchangeRate?: number,
    public coverTypeCode?: string,
    public scheduleCode?: string,
    public computationTypeCode?: string,
    public days?: number,
    public inceptionDate?: Moment,
    public expiryDate?: Moment,
    public sumInsured?: number,
    public sumInsuredRate?: number,
    public sumInsuredCharge?: number,
    public excessTypeCode?: string,
    public excessRate?: number,
    public excessAmount?: number,
    public excessCharge?: number,
    public totalPremium?: number,
    public coInsureCode?: string,
    public coInsureRate?: number,
    public coInsureAmount?: number,
    public tppdLimit?: number,
    public tppdRate?: number,
    public extraTppdCharge?: number,
    public basicPremium?: number,
    public adjustedPremium?: number,
    public stickerFee?: number,
    public personalAccidentCharge?: number,
    public levies?: number,
    public perils?: number,
    public ecowasPerilCharge?: number,
    public brownCardFee?: number,
    public extraSeatsCharge?: number,
    public additionalPerilCharge?: number,
    public totalDiscount?: number,
    public subTotalPremium?: number,
    public legacyPolicyNumber?: string,
    public comment?: string,
    public branchCode?: string,
    public totalLoading?: number,
    public version?: number,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public createdBy?: string,
    public modifiedBy?: string,
    public discounts?: INiaDiscount[],
    public loadings?: INiaLoading[],
    public customer?: INiaCustomer,
    public intermediary?: INiaIntermediary,
    public niaPolicyStatus?: ENiaPolicyStatus
  ) {
    this.fleet = this.fleet || false;
  }
}
