import { IBaseDeleteInput } from "../../models/IBaseDeleteInput";
export interface IVersionableDeleteInput extends IBaseDeleteInput {
    originalId: string;
}
