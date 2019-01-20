import { setCenterToken } from './usqApi';
import { WSChannel } from './wsChannel';
export var netToken = {
    set: function (userId, token) {
        setCenterToken(userId, token);
        WSChannel.setCenterToken(token);
    },
    clear: function () {
        setCenterToken(0, undefined);
        WSChannel.setCenterToken(undefined);
    }
};
//# sourceMappingURL=netToken.js.map