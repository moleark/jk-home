import { Controller } from "tonva-tools";
import { CUsq } from "./usq";

export abstract class ControllerUsq extends Controller {
    constructor(cUsq: CUsq, res:any) {
        super(res);
        this.cUsq = cUsq;
    }
    cUsq: CUsq;
}
