import { FridgeException } from "./exception-interface";

export default class IFridgeException implements FridgeException {
    insertFridgeException(exception: string): void {
        console.log("Insert fridge throw exception: " + exception);
    }
    updateFridgeException(exception: string): void {
        console.log("Update fridge throw exception: " + exception);
    }
    deleteFridgeException(exception: string): void {
        console.log("Delete fridge throw exception: " + exception);
    }
    getFridgeException(exception: string): void {
        console.log("Get fridge throw exception: " + exception);
    }
}