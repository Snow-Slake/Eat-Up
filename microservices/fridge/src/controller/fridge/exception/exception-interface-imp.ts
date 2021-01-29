import { FridgeControllerException } from "./exception-interface";

export default class IFridgeControllerException implements FridgeControllerException {
    insertException(exception: string): void {
        console.log('Insert fridge controller throw exception: ' + exception);
    }
    updateException(exception: string): void {
        console.log('Update fridge controller throw exception: ' + exception);
    }
    deleteException(exception: string): void {
        console.log('Delete fridge controller throw exception: ' + exception);
    }
    getException(exception: string): void {
        console.log('Get fridge controller throw exception: ' + exception);
    }
}