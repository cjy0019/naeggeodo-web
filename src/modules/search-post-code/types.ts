import { saveAddresWithBuildingCode } from './actions';

export interface PatchBuildingCodeRequestData {
  address: string;
  buildingCode: string;
  zonecode: string;
}

export interface PatchBuildingCodeResponse {
  address: string;
  buildingCode: string;
  id: string;
  zonecode: string;
}

// action types
export type SaveAddresWithBuildingCode = ReturnType<
  typeof saveAddresWithBuildingCode
>;
