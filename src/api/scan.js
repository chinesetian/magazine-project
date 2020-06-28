import { httpRequest} from './http'
import { Promise } from 'q';

import { scan } from './url/url'

@httpRequest
class scanService{
    
    getFolders(){
        return this.$httpRequest({
            method: "get",
            url: scan.folders
          });
    }

    getScans(folderId){
        return this.$httpRequest({
            method: "get",
            url: `${scan.scans}${folderId}`
          });
    }

    getScansByTime(folderId, time){
        return this.$httpRequest({
            method: "get",
            url: `${scan.scans}${folderId}&last_modification_date=${time}`
          });
    }

    getScanDetail(id){
        return this.$httpRequest({
            method: "get",
            url: `${scan.scanDetail}${id}`
        });
    }

    changeScanStatus(id, aciton){
        return this.$httpRequest({
            method: "post",
            url: `${scan.scanDetail}${id}/${aciton}`
          });
    }

    getHistoryDetail(scanId, historyId){
        return this.$httpRequest({
            method: "get",
            url: `${scan.scanDetail}${scanId}?history_id=${historyId}`
        });
    }

    exportCsv(scanId, historyId, options,){
        return this.$httpRequest({
            method: "post",
            data: options,
            url: `${scan.scanDetail}${scanId}/export?history_id=${historyId}`
          });
    }

    getDownloadStatus(tokens){
        return this.$httpRequest({
            method: "get",
            url: `${scan.downloadStatus}${tokens}/status`
        });
    }

    downCsv(tokens){
        return this.$httpMultiPart({
            method: "get",
            url: `${scan.downloadStatus}${tokens}/download`
        });
    }

    getScanConfig(scanId){
        return this.$httpRequest({
            method: "get",
            url: `${scan.edit}${scanId}`
        });
    }

    editScanConfig(scanId, options){
        return this.$httpRequest({
            method: "put",
            data: options,
            url: `${scan.scanDetail}${scanId}`
        });
    }

    getFileStream(url){
        return this.$httpMultiPart({
            method: "get",
            url: url
        });
    }

}

export default new scanService()