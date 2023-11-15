export interface SidoType {
  id: number;
  name: string;
}

export interface SigunguAndEupmyeondongType {
  id: number;
  fullName: string;
  singleName: string;
}

export interface SigunguFeatureType {
  type: string;
  properties: {
    sig_cd: string;
    full_nm: string;
    sig_kor_nm: string;
  };
  id: string;
}

export interface EupmyeondingFeatureType {
  type: string;
  properties: {
    emd_cd: string;
    full_nm: string;
    emd_kor_nm: string;
  };
  id: string;
}
