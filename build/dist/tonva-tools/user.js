import jwtDecode from 'jwt-decode';
var UserInNav = /** @class */ (function () {
    function UserInNav(user) {
        this.user = user;
    }
    Object.defineProperty(UserInNav.prototype, "id", {
        get: function () { return this.user.id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInNav.prototype, "name", {
        get: function () { return this.user.name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInNav.prototype, "nick", {
        get: function () { return this.user.nick; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInNav.prototype, "icon", {
        get: function () { return this.user.icon || ('http://' + process.env['REACT_APP_CENTER_HOST'] + '/imgs/Bear-icon.png'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInNav.prototype, "guest", {
        get: function () { return this.user.guest; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInNav.prototype, "token", {
        get: function () { return this.user.token; },
        enumerable: true,
        configurable: true
    });
    return UserInNav;
}());
export { UserInNav };
export function decodeUserToken(token) {
    var ret = jwtDecode(token);
    var user = {
        id: ret.id,
        name: ret.name,
        guest: ret.guest,
        token: token,
    };
    return user;
}
export function decodeGuestToken(token) {
    var ret = jwtDecode(token);
    var guest = {
        id: 0,
        guest: ret.guest,
        token: token,
    };
    return guest;
}
//# sourceMappingURL=user.js.map