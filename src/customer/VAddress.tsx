import * as React from 'react';
import { VPage, Page } from 'tonva-tools';
import { tv } from 'tonva-react-uq';
import { List } from 'tonva-react-form';
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
        return <Page header="省">
            <List items={provinces.items} item={{ render: this.renderProvince, onClick: this.onProvinceClick }} />
        </Page>
    }

    private renderProvince(province: any) {
        return <div>{tv(province.province)}</div>
    }

    private renderCity(city: any) {
        return <div>{tv(city.city)}</div>
    }

    private renderCounty(county: any) {
        return <div>{tv(county.county)}</div>
    }

    private onProvinceClick = async (item: any) => {
        this.provinceId = item.province.id;
        let cities = await this.controller.getProvinceCities(this.provinceId);
        if (cities) {
            let len = cities.length;
            if (len === 1) {
                await this.onCityClick(cities[0]);
                return;
            }
            if (len > 0) {
                this.backLevel++;
                this.openPageElement(<Page header="市">
                    <List items={cities} item={{ render: this.renderCity, onClick: this.onCityClick }} />
                </Page>);
                return;
            }
        } else {
            this.closePage(1);
            this.saveAddress();
        }
    }

    private onCityClick = async (item: any) => {
        this.cityId = item.city.id;
        let counties = await this.controller.getCityCounties(this.cityId);
        if (counties && counties.length > 0) {
            this.backLevel++;
            this.openPageElement(<Page header="区县">
                <List items={counties} item={{ render: this.renderCounty, onClick: this.onCountyClick }} />
            </Page>);
        } else {
            this.closePage(2);
            this.saveAddress();
        }
    }

    private onCountyClick = async (item: any) => {
        this.countyId = item.county.id;
        this.closePage(this.backLevel);
        this.saveAddress();
    }

    private saveAddress = async () => {
        await this.controller.saveAddress(43, this.provinceId, this.cityId, this.countyId);
    }
}
