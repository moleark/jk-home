

export function telephoneValidation(value: string) {
    return (value && value.length > 15) ? '固定电话号码最多15位！' : undefined;
}

export function mobileValidation(value: string) {
    return (value && value.length !== 11) ? '手机号格式不正确，请重新输入！' : undefined;
}

export function emailValidation(value: string) {
    if (value && !/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value))
        return "Email格式不正确，请重新输入！";
    else
        return undefined;
}

export function faxValidation(value: string) {
    return (value && value.length > 15) ? "传真号码最多15位！" : undefined;
}

export function addressDetailValidation(value: string) {
    return (value && value.length > 200) ? "详细地址最多200个字！" : undefined;
}

export function zipCodeValidation(value: string) {
    return (value && value.length > 15) ? "邮编过长，请修改后录入！" : undefined;
}


export function organizationNameValidation(value: string) {
    return (value && value.length > 100) ? "单位名称最多100个字！" : undefined;
}

export function departmentNameValidation(value: string) {
    return (value && value.length > 100) ? "部门名称名称最多100个字！" : undefined;
}

export function salutationValidation(value: string) {
    return (value && value.length > 100) ? "单位名称最多100个字！" : undefined;
}

export function nameValidation(value: string) {
    return (value && value.length > 50) ? "姓名最多50个字！" : undefined;
}