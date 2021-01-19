import { Fridge } from '../../entities'


export function buildAddFridge() {
    return async function (id: string, ingredients: Array<string>, capacities: Array<number>, units: Array<string>) : Promise<Fridge | undefined>  {
        return undefined;
    }
}