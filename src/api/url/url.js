
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

/**
 * 基础接口(字典、)
 */
export const base = {
    dictType: `${api}qikan/dictType/listData`, // 数据字典类型
    dictData: `${api}qikan/dictData/listData`, // 数据字典内容
    image: `${api}qikan/image/listData`, // 顶部、底部图片
    articleOther: `${api}qikan/articleOther/listData`, // 流程须知、关于我们
    getLinkData: `${api}qikan/link/listData`, // 外部链接

    articleThesis: `${api}qikan/articleThesis/listData`, // 范文列表、没total
    qikan: `${api}qikan/qikan/listData`, // 期刊查询、没total
    articleInfo: `${api}qikan/articleInfo/listData`, // 问题和咨询、没total

    articleThesispageList: `${api}qikan/articleThesis/pageList`, // 范文列表、有total
    qikanpageList: `${api}qikan/qikan/pageList`, // 期刊查询、有total
    articleInfopageList: `${api}qikan/articleInfo/pageList`, // 问题和咨询、有total
    
    qikanDetail: `${api}qikan/qikan/detail`, // 期刊查询详情

    uploadFile: `${api}qikan/uploadFile`, // 稿件上传
    tougaoAdd: `${api}qikan/tougao/add`, // 投稿
    tougaoList: `${api}qikan/tougao/listData`, // 投稿列表
    tougaoDetail: `${api}qikan/tougao/detail`, // 投稿详情
}
