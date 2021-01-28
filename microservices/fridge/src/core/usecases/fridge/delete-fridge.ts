import { fridgeDB } from "../../data-access"

export function buildDeleteFridge() {
    return async function (id: string) : Promise<boolean>  {
        return await fridgeDB.delete(id);
    }
}