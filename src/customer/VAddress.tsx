import * as React from 'react';
import { VPage, Page } from 'tonva';
import { tv } from 'tonva';
import { List, FA } from 'tonva';
import { CAddress } from './CAddress';

export class VAddress extends VPage<CAddress> {
    private provinceId: number;
    private cityId: number;
    private countyId: number;
    private backLevel = 0;

    async open(param: any) {
        let provinces = await this.controller.getCountryProvince(43);
        this.openPage(this.page, { items: provinces });
    }

    private page = (provinces: any) => {
        this.backLevel++;
        return <Page header="选择所在省市">
            <div className="row no-gutters">
                {provinces.items.map(v => this.renderPCC(v, this.onProvinceClick))}
            </div>
        </Page>
    }

    private renderPCC = (pcc: any, onClick: any) => {
        let { id, chineseName } = pcc;
        return <div key={id} className="col-6 col-md-4 col-lg-3 cursor-pointer" >
            <div className="pt-1 pb-1 px-2" onClick={() => onClick(pcc)}
                style={{ border: '1px solid #eeeeee', marginRight: '-1px', marginBottom: '-1px' }}
            >
                <span className="ml-1 align-middle">
                    <FA name="chevron-right" className="text-info small" />
                    &nbsp; {chineseName}
                </span>
            </div>
        </div>;
    }

    private onProvinceClick = async (item: any) => {
        this.provinceId = item.id;
        let cities = await this.controller.getProvinceCities(this.provinceId);
        if (cities) {
            let len = cities.length;
            if (len === 1) {
                await this.onCityClick(cities[0]);
                return;
            }
            if (len > 0) {
                this.backLevel++;
                this.openPageElement(<Page header="选择所在城市">
                    <div className="row no-gutters">
                        {cities.map(v => this.renderPCC(v, this.onCityClick))}
                    </div>
                </Page>);
                return;
            }
        } else {
            this.closePage(1);
            this.saveAddress();
        }
    }

    private onCityClick = async (item: any) => {
        this.cityId = item.id;
        let counties = await this.controller.getCityCounties(this.cityId);
        if (counties && counties.length > 0) {
            this.backLevel++;
            this.openPageElement(<Page header="选择所在区县">
                <div className="row no-gutters">
                    {counties.map(v => this.renderPCC(v, this.onCountyClick))}
                </div>
            </Page>);
        } else {
            this.closePage(2);
            this.saveAddress();
        }
    }

    private onCountyClick = async (item: any) => {
        this.countyId = item.id;
        this.closePage(this.backLevel);
        this.saveAddress();
    }

    private saveAddress = async () => {
        await this.controller.saveAddress(43, this.provinceId, this.cityId, this.countyId);
    }
}
