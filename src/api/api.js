import request from '../utils/request';

let baseUrl = 'http://localhost:9090';
// 登录
export const login = {
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
