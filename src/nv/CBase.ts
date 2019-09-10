import { Controller, IConstructor } from "tonva";
import { UQs } from "./uqs";

export abstract class CBase extends Controller {
    protected readonly uqs: UQs;
    protected readonly cApp: any;

    constructor(cApp: any) {
        super(undefined);
        this.cApp = cApp;
        this.uqs = cApp.uqs;
        this.init();
    }

    protected init() {}

    protected newC<T extends CBase>(type: IConstructor<T>):T {
        return new type(this.cApp);
    }
}

