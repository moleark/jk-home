import * as React from 'react';
import { Dir, CHome } from './cHome';
import { View, nav, Page } from 'tonva-tools';

export class VDir extends View<CHome> {
    render() {
        let { dirs } = this.controller;
        return <nav className="navbar navbar-expand-lg">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav flex-column bg-white">
                    {dirs.map(v => {
                        return <li key={v.caption} className="nav-item">
                            <a className="nav-link" href="#" onClick={(evt) => { evt.preventDefault(); this.controller.showDir(v) }}>{v.caption}</a></li>
                    })}
                </ul>
            </div>
        </nav>
    }
}