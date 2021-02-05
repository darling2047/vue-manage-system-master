import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};

export const testData = query => {
    return request({
        url: './deviceData.json',
        method: 'get',
        params: query
    });
};