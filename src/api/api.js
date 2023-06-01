import request from '../utils/request';

// 民宿项目生产地址
// let baseUrl = 'http://112.124.56.76:9090';
let baseUrl = 'http://127.0.0.1:9090';
// 设备管理项目生产地址
// let baseUrl = 'http://121.199.58.24:9090';
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
    getRoomAudit: params => {
        return request({
            url: baseUrl + '/roomAudit/getList',
            method: 'get',
            params: params
        });
    },
    getAuditResult: params => {
        return request({
            url: baseUrl + '/auditResult/getList',
            method: 'get',
            params: params
        });
    },
    getBjDetails: params => {
        return request({
            url: baseUrl + '/details/getBjDetails',
            method: 'get',
            params: params
        });
    },
    getDingBxDetails: params => {
        return request({
            url: baseUrl + '/details/getDingBxDetails',
            method: 'get',
            params: params
        });
    },
    getTgfd: params => {
        return request({
            url: baseUrl + '/roomAudit/getSelectData',
            method: 'get',
            params: params
        });
    },
    getBaseRooms: params => {
        return request({
            url: baseUrl + '/room/getList',
            method: 'get',
            params: params
        });
    },
    delBaseRoom: params => {
        return request({
            url: baseUrl + '/room/delRoomById',
            method: 'get',
            params: params
        });
    },
    editBaseRoom: params => {
        return request({
            url: baseUrl + '/room/edit',
            method: 'post',
            params: params
        });
    },
    updateResult: params => {
        return request({
            url: baseUrl + '/auditResult/update',
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
