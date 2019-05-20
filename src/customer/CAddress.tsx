import * as React from 'react';
import { Controller } from 'tonva';
import { CCartApp } from 'CCartApp';
import { Query, Tuid } from 'tonva';
import { VAddress } from './VAddress';

export class CAddress extends Controller {
    private cApp: CCartApp;
    private getCountryProvincesQuery: Query;
    private getProvinceCitiesQuery: Query;
    private getCityCountiesQuery: Query;
    private addressTuid: Tuid;

    constructor(cApp: CCartApp, res: any) {
        super(res);
        this.cApp = cApp;

        let { cUqCommon } = this.cApp;
        this.getCountryProvincesQuery = cUqCommon.query('GetCountryProvinces');
        this.getProvinceCitiesQuery = cUqCommon.query('GetProvinceCities');
        this.getCityCountiesQuery = cUqCommon.query('GetCityCounties');
        this.addressTuid = cUqCommon.tuid("Address");
    }

    protected async internalStart() {
        this.openVPage(VAddress);
    }

    getCountryProvince = async (countryId: number): Promise<any[]> => {
        return await this.getCountryProvincesQuery.table({ country: countryId });
    }

    getProvinceCities = async (provinceId: number): Promise<any[]> => {
        return await this.getProvinceCitiesQuery.table({ province: provinceId });
    }

    getCityCounties = async (cityId: number): Promise<any[]> => {
        return await this.getCityCountiesQuery.table({ city: cityId });
    }

    saveAddress = async (countryId: number, provinceId: number, cityId?: number, countyId?: number): Promise<any> => {
        let newAddress = await this.addressTuid.save(undefined, { country: countryId, province: provinceId, city: cityId, county: countyId });
        let addressId = newAddress && this.addressTuid.boxId(newAddress.id);
        this.returnCall(addressId);
    }
}
