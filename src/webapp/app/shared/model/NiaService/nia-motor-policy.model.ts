import { Moment } from 'moment';
import { INiaDiscount } from 'app/shared/model/NiaService/nia-discount.model';
import { INiaLoading } from 'app/shared/model/NiaService/nia-loading.model';
import { NiaBodyTypeCode } from 'app/shared/model/enumerations/nia-body-type-code.model';
import { NiaCurrencyCodeType } from 'app/shared/model/enumerations/nia-currency-code-type.model';
import { NiaCoverTypeCode } from 'app/shared/model/enumerations/nia-cover-type-code.model';
import { NiaComputationTypeCode } from 'app/shared/model/enumerations/nia-computation-type-code.model';
import { NiaExcessTypeCode } from 'app/shared/model/enumerations/nia-excess-type-code.model';
import { NiaPolicyStatus } from 'app/shared/model/enumerations/nia-policy-status.model';
import { INiaCustomer} from './nia-customer.model';
import { INiaIntermediary} from './nia-intermediary.model';


export interface INiaMotorPolicy {
  id?: string;
  reference?: string;
  serverReference?: string;
  policyNumber?: string;
  vehicleRegistration?: string;
  make?: string;
  model?: string;
  chasisNumber?: string;
  bodyTypeCode?: NiaBodyTypeCode;
  seats?: number;
  yearOfManufacture?: string;
  cubicCapacity?: number;
  mileage?: number;
  fleet?: boolean;
  currencyCode?: NiaCurrencyCodeType;
  exchangeRate?: number;
  coverTypeCode?: NiaCoverTypeCode;
  scheduleCode?: string;
  computationTypeCode?: NiaComputationTypeCode;
  days?: number;
  inceptionDate?: Moment;
  expiryDate?: Moment;
  sumInsured?: number;
  sumInsuredRate?: number;
  sumInsuredCharge?: number;
  excessTypeCode?: NiaExcessTypeCode;
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
  niaPolicyStatus?: NiaPolicyStatus;
  version?: number;
  createdDate?: Moment;
  modifiedDate?: Moment;
  createdBy?: string;
  modifiedBy?: string;
  discounts?: INiaDiscount[];
  loadings?: INiaLoading[];
  customer?: INiaCustomer;
  intermediary?: INiaIntermediary;
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
    public bodyTypeCode?: NiaBodyTypeCode,
    public seats?: number,
    public yearOfManufacture?: string,
    public cubicCapacity?: number,
    public mileage?: number,
    public fleet?: boolean,
    public currencyCode?: NiaCurrencyCodeType,
    public exchangeRate?: number,
    public coverTypeCode?: NiaCoverTypeCode,
    public scheduleCode?: string,
    public computationTypeCode?: NiaComputationTypeCode,
    public days?: number,
    public inceptionDate?: Moment,
    public expiryDate?: Moment,
    public sumInsured?: number,
    public sumInsuredRate?: number,
    public sumInsuredCharge?: number,
    public excessTypeCode?: NiaExcessTypeCode,
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
    public niaPolicyStatus?: NiaPolicyStatus,
    public version?: number,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public createdBy?: string,
    public modifiedBy?: string,
    public discounts?: INiaDiscount[],
    public loadings?: INiaLoading[],
    public customer?: INiaCustomer,
    public intermediary?: INiaIntermediary
  ) {
    this.fleet = this.fleet || false;
  }
}
