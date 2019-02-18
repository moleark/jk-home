import * as tslib_1 from "tslib";
import * as React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import _ from 'lodash';
import { TitleBar } from './titleBar';
var scrollTimeGap = 100;
var ScrollView = /** @class */ (function (_super) {
    tslib_1.__extends(ScrollView, _super);
    function ScrollView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bottomTime = 0;
        _this.topTime = 0;
        _this.onScroll = function (e) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, onScroll, onScrollTop, onScrollBottom, el, topTime, bottomTime;
            return tslib_1.__generator(this, function (_b) {
                _a = this.props, onScroll = _a.onScroll, onScrollTop = _a.onScrollTop, onScrollBottom = _a.onScrollBottom;
                if (onScroll)
                    this.props.onScroll(e);
                el = e.target;
                if (el.scrollTop < 30) {
                    //this.eachChild(this, 'top');
                    if (onScrollTop !== undefined) {
                        topTime = new Date().getTime();
                        if (topTime - this.topTime > scrollTimeGap) {
                            this.topTime = topTime;
                            onScrollTop();
                        }
                    }
                }
                if (el.scrollTop + el.offsetHeight > el.scrollHeight - 30) {
                    //this.eachChild(this, 'bottom');
                    if (onScrollBottom !== undefined) {
                        bottomTime = new Date().getTime();
                        if (bottomTime - this.bottomTime > scrollTimeGap) {
                            this.bottomTime = bottomTime;
                            onScrollBottom();
                        }
                    }
                }
                return [2 /*return*/];
            });
        }); };
        return _this;
    }
    ScrollView.prototype.eachChild = function (c, direct) {
        var _this = this;
        var props = c.props;
        if (props === undefined)
            return;
        var children = props.children;
        if (children === undefined)
            return;
        React.Children.forEach(children, function (child, index) {
            var _$scroll = child._$scroll;
            if (_$scroll)
                _$scroll(direct);
            console.log(child.toString());
            _this.eachChild(child, direct);
        });
    };
    ScrollView.prototype.render = function () {
        return (React.createElement("main", { className: this.props.className, onScroll: this.onScroll }, this.props.children));
    };
    return ScrollView;
}(React.Component));
var Page = /** @class */ (function (_super) {
    tslib_1.__extends(Page, _super);
    function Page(props) {
        var _this = _super.call(this, props) || this;
        var tabs = props.tabs;
        if (tabs === undefined || tabs.length === 0)
            return _this;
        _this.tabs = tabs;
        var cur;
        var tabStates = [];
        for (var _i = 0, tabs_1 = tabs; _i < tabs_1.length; _i++) {
            var tab = tabs_1[_i];
            var t = _.clone(tab);
            if (cur === undefined) {
                if (t.isSelected === true)
                    cur = t;
                else
                    t.isSelected = false;
            }
            else {
                t.isSelected = false;
            }
            t.isMounted = false;
            tabStates.push(t);
        }
        _this.state = {
            cur: cur,
            tabs: tabStates,
        };
        return _this;
    }
    Page.prototype.componentDidMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var t0;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.tabs === undefined)
                            return [2 /*return*/];
                        t0 = this.state.tabs[0];
                        if (t0 === undefined)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.onTabClick(t0)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Page.prototype.onTabClick = function (tab) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var cur, tabs, _i, tabs_2, t, load;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (tab.isSelected === true)
                            return [2 /*return*/];
                        tabs = this.state.tabs;
                        for (_i = 0, tabs_2 = tabs; _i < tabs_2.length; _i++) {
                            t = tabs_2[_i];
                            if (t === tab) {
                                t.isSelected = true;
                                cur = t;
                            }
                            else
                                t.isSelected = false;
                        }
                        if (!(cur.isMounted !== true)) return [3 /*break*/, 2];
                        load = cur.load;
                        if (!(load !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, load()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.setState({
                            cur: cur,
                            tabs: tabs
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Page.prototype.onTouchStart = function (evt) {
    };
    Page.prototype.renderTabs = function (footer) {
        var _this = this;
        var _a = this.props, header = _a.header, back = _a.back, right = _a.right, keepHeader = _a.keepHeader;
        var cur = this.state.cur;
        var tabs = React.createElement("div", null, this.state.tabs.map(function (tab, index) {
            var icon = tab.icon, isSelected = tab.isSelected, title = tab.title, redDot = tab.redDot;
            var img, redDotView, cn;
            if (icon !== undefined)
                img = React.createElement("img", { src: icon });
            if (redDot !== undefined) {
                var v = redDot.get();
                if (v < 0) {
                    cn = classNames('red-dot');
                    redDotView = React.createElement("u", null);
                }
                else if (v > 0) {
                    cn = classNames('red-dot', 'num');
                    redDotView = React.createElement("u", null, v);
                }
            }
            return React.createElement("div", { key: index, className: classNames('va-tab', { cur: isSelected }), onClick: function () { return _this.onTabClick(tab); } },
                img,
                React.createElement("div", { className: cn },
                    title,
                    redDotView));
        }));
        var titleBar;
        if (header !== false) {
            titleBar = React.createElement(TitleBar, { back: back, center: keepHeader === true ? header : (cur && (cur.header || cur.title)), right: right });
        }
        return React.createElement("article", { className: 'page-container' },
            titleBar,
            React.createElement("section", { className: "position-relative" },
                this.props.sideBar,
                this.state.tabs.map(function (tab, index) {
                    var isSelected = tab.isSelected, isMounted = tab.isMounted, content = tab.content;
                    if (isSelected === true || isMounted === true) {
                        tab.isMounted = true;
                        return React.createElement(ScrollView, { key: index, className: classNames({ invisible: isSelected === false }), onScroll: tab.onScroll, onScrollTop: tab.onScrollTop, onScrollBottom: tab.onScrollBottom }, (typeof content) === 'function' ? content() : content);
                    }
                })),
            tabs,
            footer);
    };
    Page.prototype.renderSingle = function (footer) {
        var _a = this.props, back = _a.back, header = _a.header, right = _a.right, onScroll = _a.onScroll, onScrollTop = _a.onScrollTop, onScrollBottom = _a.onScrollBottom, children = _a.children;
        var titleBar;
        if (header !== false)
            titleBar = React.createElement(TitleBar, { back: back, center: header, right: right, logout: this.props.logout });
        return (React.createElement("article", { className: 'page-container', onTouchStart: this.onTouchStart },
            titleBar,
            React.createElement("section", { className: "position-relative" },
                this.props.sideBar,
                React.createElement(ScrollView, { onScroll: onScroll, onScrollTop: onScrollTop, onScrollBottom: onScrollBottom }, children)),
            footer));
    };
    Page.prototype.render = function () {
        var footer = this.props.footer;
        var elFooter;
        if (footer !== undefined)
            elFooter = React.createElement("footer", null, footer);
        if (this.tabs !== undefined)
            return this.renderTabs(elFooter);
        else
            return this.renderSingle(elFooter);
    };
    Page = tslib_1.__decorate([
        observer
    ], Page);
    return Page;
}(React.Component));
export { Page };
//# sourceMappingURL=page.js.map