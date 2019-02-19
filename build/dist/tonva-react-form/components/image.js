import * as React from 'react';
var defaultImage = 'http://101.200.46.56/imgs/Bear-icon.png';
export function Image(props) {
    /*
    @observable private src: string;
    async componentWillMount() {
        let {src} = this.props;
        if (!src) {
            this.src = defaultImage;
            return;
        }
        if (src.startsWith(':') === false) {
            this.src = src;
            return;
        }
        this.src = 'http://localhost:3015/res/' + src.substr(1);
    }
    render() {
    */
    var className = props.className, style = props.style, src = props.src;
    if (!src) {
        src = defaultImage;
    }
    else if (src.startsWith(':') === true) {
        src = 'http://localhost:3015/res/' + src.substr(1);
    }
    return React.createElement("img", { src: src, className: className, style: style });
    //}
}
//# sourceMappingURL=image.js.map