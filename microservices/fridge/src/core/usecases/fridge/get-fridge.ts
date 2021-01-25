import { Fridge } from '../../entities'


export function buildGetFridge() {
    return async function (id: string) : Promise<Fridge | undefined>  {
        return undefined;
    }
}