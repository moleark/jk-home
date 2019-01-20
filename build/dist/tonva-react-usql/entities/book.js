import * as tslib_1 from "tslib";
import { Query } from './query';
var Book = /** @class */ (function (_super) {
    tslib_1.__extends(Book, _super);
    function Book() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.queryApiName = 'book';
        return _this;
    }
    Object.defineProperty(Book.prototype, "typeName", {
        get: function () { return 'book'; },
        enumerable: true,
        configurable: true
    });
    return Book;
}(Query));
export { Book };
//# sourceMappingURL=book.js.map