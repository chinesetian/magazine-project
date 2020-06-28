
import config from './config'
const { api, downLoad } = config;

export const user = {
    serverStatus: `${api}server/status`, // 查询服务状态
    login: `${api}session`, //登录、登出、用户信息
    changePwd: `${api}session/chpasswd`, // 修改密码
    getJsFile: `${api}nessus6.js?v=`, // 获取接口所需UUID
}

export const scan = {
    folders: `${api}folders`, // 所有的scan分类（my_scan、all_scan、trash）
    scans: `${api}scans?folder_id=`, //查询scan
    scanDetail: `${api}scans/`, //查询scan详情
    downloadStatus: `${api}tokens/`, //查询下载是否准备好
    edit: `${api}editor/scan/`, // 编辑信息
    csvdownload: `${downLoad}tokens/`, // 下载csv
}