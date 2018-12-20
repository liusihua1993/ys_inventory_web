import instance from "./Interceptor";
import qs from 'qs';
var qsd = require('qs');
let oauth = '/api';

//oauth2登录验证获取token
// export const requestOauth = params => { return instance.post(`${oauth}`, qsd.stringify({
//     x: prefix + params
// }))};
// 
// 登录验证获取token
export const requestLogin = (params, config) => {
    return instance.post(`${oauth}/oauth/token`, params, config)
}
// 登录
export const Login = params => {
    return instance.post(`${oauth}/login`, params,{headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }})
}
// 产品列表 || 产品编辑
export const productList = params =>{
    return instance.get(`${oauth}/product?${params}`)
}
// 产品编辑
export const productbian = params =>{
    return instance.get(`${oauth}/product/${params}`)
}
// 产品保存
export const productSave = (productId, params) =>{
    return instance.put(`${oauth}/product/${productId}/updateProduct`, params, {headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }})
}
// 删除产品
export const deleteproduct = (meterialId) => {
    return instance.delete(`${oauth}/product/${meterialId}`)
}
// 新增原料
export const meterialCreate = params => {
    return instance.post(`${oauth}/material`, params, {headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }})
}
// 新增产品
export const productCreate = params => {
    return instance.post(`${oauth}/product`, params, {headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }})
}
export const updateMater = params => {
    return instance.post(`${oauth}/material/updateMaterialNumber`, params, {headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }})
}
// 原料列表 || 原料编辑
export const meterialList = params =>{
    return instance.get(`${oauth}/material?${params}`)
}

// 原料编辑
export const meterialbian = params =>{
    return instance.get(`${oauth}/material/${params}`)
}
// 原料保存
export const meterialSave = (productId, params) =>{
    return instance.put(`${oauth}/material/${productId}/updateMaterial`, params, {headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }})
}

// 删除原料
export const deleteMeterial = (meterialId) => {
    return instance.delete(`${oauth}/material/${meterialId}`)
}

// 日志列表
export const logList = (params) => {
    return instance.get(`${oauth}/logs?${params}`, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
// 日志下载
export const logdownload = (params) => {
    return instance.get(`${oauth}/logs/download?${params}`, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

// 产品模板列表
export const productTempList = params =>{
    return instance.get(`${oauth}/productTemp?${params}`)
}
// 产品模板详情
export const productTempbian = params =>{
    return instance.get(`${oauth}/productTemp/${params}`)
}
// 新增产品模板
export const productTempCreate = params => {
    return instance.post(`${oauth}/productTemp`, params, {headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }})
}
// 删除产品模板
export const deleteProductTemp = (productTempId, updateTime) => {
    return instance.delete(`${oauth}/productTemp/${productTempId}`)
}
// 产品模板保存
export const productTempSave = (productTempId, params) =>{
    return instance.put(`${oauth}/productTemp/${productTempId}/updateProductTemp`, params, {headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }})
}