import * as React from 'react';
import { SearchBox, List, Muted } from 'tonva-react-form';
import { Button } from 'reactstrap';
import { TuidMain, Entity } from '../../entities';
import { Page } from 'tonva-tools';
import { CLink } from '../link';
import { VEntity } from '../CVEntity';
import { CTuidMain, TuidUI } from './cTuid';

export class VTuidMain extends VEntity<TuidMain, TuidUI, CTuidMain> {
    protected controller: CTuidMain;
    onNew = () => this.event('new');
    onList = () => this.event('list');
    onSearch = async (key:string) => this.event('list', key);

    async showEntry(param?:any):Promise<void> {
        this.openPage(this.view);
    }

    protected entityRender(link: CLink, index: number): JSX.Element {
        return link.render();
    }

    protected async entityClick(link: CLink) {
        await link.onClick();
    }

    protected get view() {
        let {label, proxyLinks, isFrom} = this.controller;
        let newButton;
        if (isFrom === false) newButton = <Button className="ml-3" color="primary" onClick={this.onNew}>新增</Button>;
        return () => <Page header={label}>
            {proxyLinks === undefined ?
            <>
                <SearchBox className="w-100" onSearch={this.onSearch} placeholder={'搜索'+label} />
                <div className='my-3'>
                    {newButton}
                    <Button className="ml-3" color="primary" onClick={this.onList}>列表</Button>
                </div>
            </> :
            <List className="my-2"
                header={<Muted>{label} 代理下列Tuid</Muted>}
                items={proxyLinks}
                item={{render: this.entityRender, onClick:this.entityClick}} />
            }
        </Page>;
    }
}
