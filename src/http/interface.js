import axios from './api' // 倒入 api

/* 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 此处的数据依然来自 Easy Mock
 */

// 登陆
    // gcid 安全码    accountName 用户名  accountPwd 密码
export const loginApi = data => {
    return axios({
        url: 'api/v2/jjr_user_login/pc_login_new',
        method: 'post',
        data
    })
}

export const workbenchApi = data => {
    return axios({
        url: 'uat/chengzu/v1/toDo/get',
        method: 'post',
        data
    })
}

export const allHourseIdApi = data => {
    return axios({
        url: 'api/v2/item/house_item/get_list',
        method: 'post',
        data
    })
}

export const weakenData = data => {
    return axios({
        url: 'uat/chengzu/v1/toDo/get',
        method: 'post',
        data
    })
}


  
export const mock = params => {
    return axios({
        url: '/mock',
        method: 'get',
        params
    })
}

export const upload = data => {
    return axios({
        url: '/upload',
        method: 'post',
        data
    })
}

// 默认全部倒出
// 根绝需要进行  
export default {
    loginApi,
    allHourseIdApi,
    weakenData,
    mock,
    upload
}