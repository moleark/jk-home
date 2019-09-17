import AnalyticalChemistry from '../images/AnalyticalChemistry.png';
import LabSupplies from '../images/LabSupplies.png';
import LifeScience from '../images/LifeScience.png';
import MaterialScience from '../images/MaterialScience.png';
import OrganicChemistry from '../images/OrganicChemistry.png';

export const GLOABLE = {
    CHINA: 44,
    CHINESE: 196,
    SALESREGION_CN: 1,
    ROOTCATEGORY: {
        47: {
            src: OrganicChemistry,
            labelColor: 'text-info',
        },
        470: {
            src: AnalyticalChemistry,
            labelColor: 'text-success',
        },
        1013: {
            src: LifeScience,
            labelColor: 'text-danger',
        },
        1219: {
            src: MaterialScience,
            labelColor: 'text-warning',
        },
        1545: {
            src: LabSupplies,
            labelColor: 'text-primary',
        },
    }
}

/*
export const GLOABLE = {
    CHINA: 43,
    CHINESE: 197,
    SALESREGION_CN: 4,
    ROOTCATEGORY: {
        7: {
            src: OrganicChemistry,
            labelColor: 'text-info',
        },
        430: {
            src: AnalyticalChemistry,
            labelColor: 'text-success',
        },
        986: {
            src: LifeScience,
            labelColor: 'text-danger',
        },
        1214: {
            src: MaterialScience,
            labelColor: 'text-warning',
        },
        1545: {
            src: LabSupplies,
            labelColor: 'text-primary',
        },
    }
}
*/