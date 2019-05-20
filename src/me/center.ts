import {CenterApi, User} from 'tonva';

class Center extends CenterApi {
    async changePassword(param: {orgPassword:string, newPassword:string}) {
        return await this.post('tie/reset-password', param);
    }
}

const center = new Center('tv/', undefined);
export default center;