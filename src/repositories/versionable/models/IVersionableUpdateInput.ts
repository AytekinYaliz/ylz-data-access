import { IBaseUpdateInput } from "../../models";

export interface IVersionableUpdateInput extends IBaseUpdateInput {
  originalId: string;
}
