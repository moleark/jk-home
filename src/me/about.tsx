import * as React from 'react';
import { Page, nav } from 'tonva';
import logo from '../images/logo.png';

export class About extends React.Component {
    private showLogs = () => {
        nav.push(<Page header="Logs">
            <div>NODE_ENV: {process.env.NODE_ENV}</div>
            {nav.logs.map((v, i) => {
                return <div key={i} className="px-3 py-1">{v}</div>;
            })}
        </Page>);
    }

    render() {
        let right = null; //<button className='btn btn-success btn-sm' onClick={this.showLogs}>log</button>;
        return <Page header="关于百灵威" right={right}>
            <div className='m-3'>
                <img className="h-3c position-absolute" src={logo} />
                <div className="h3 flex-fill text-center">
                    <span className="text-primary mr-3">百灵威集团</span>
                </div>
                <p className="mt-5">
                    &emsp;&emsp;百灵威科技有限公司致力于研发和生产化学及相关产品。集敏捷制造、全球营销和现代物流为一体。
                    在中国内地、香港，欧洲及北美等多个国家和地区设有物流中心，提供专业化、个性化的一站式服务。
                    为全球超过200,000 名科技和工业领域的客户提供产品资源及配套技术服务。
                </p>
            </div>
        </Page>;
    }
}