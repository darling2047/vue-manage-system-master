import request from '../utils/request';

let baseUrl = 'http://121.199.58.24:9090';
// let baseUrl = 'http://127.0.0.1:9090';
// 登录
export const sys = {
    doLogin: params => {
        return request({
            url: baseUrl + '/system/doLogin',
            method: 'post',
            params: params
        });
    },
    getMenus: params => {
        return request({
            url: baseUrl + '/system/getMenus',
            method: 'get',
            params: params
        });
    },
    getUsers: params => {
        return request({
            url: baseUrl + '/user/getUserInfo',
            method: 'get',
            params: params
        });
    },
    delUsers: params => {
        return request({
            url: baseUrl + '/user/delUserInfoById',
            method: 'get',
            params: params
        });
    },
    editUsers: params => {
        return request({
            url: baseUrl + '/user/editUserInfo',
            method: 'post',
            params: params
        });
    }
};


// 测试页面url
export const test = {
    fetchData: query => {
        return request({
            url: './table.json',
            method: 'get',
            params: query
        });
    },
    testData: query => {
        return request({
            url: './deviceData.json',
            method: 'get',
            params: query
        });
    }
}
