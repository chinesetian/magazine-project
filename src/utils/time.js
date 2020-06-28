
export function timeToDay(startTime,endTime){
	var stime = Date.parse(new Date(startTime));
	var etime = Date.parse(new Date(endTime));
	var usedTime = etime - stime;  //两个时间戳相差的毫秒数
	var days=Math.floor(usedTime/(24*3600*1000));
	//计算出小时数
	var leave1=usedTime%(24*3600*1000);    //计算天数后剩余的毫秒数
	var hours=Math.floor(leave1/(3600*1000));
	//计算相差分钟数
	var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
    var minutes=Math.floor(leave2/(60*1000));
    //计算相差秒数
	var leave3=leave2%(60*1000);        //计算分钟数后剩余的毫秒数
    var second=Math.floor(leave3/(1000));

    var time = '';
    if(days >= 1){
        // time = days + "天" + hours + "小时" + minutes + "分钟";
        time = `${days} 天 ${hours} 小时`;
    } else if(hours >= 1){
        time = `${hours} 小时 ${minutes} 分钟`;
    } else if(minutes >= 1){
        time = `${minutes} 分钟`;
    } else if(second >= 1){
        time = `${second} 秒`;
    }
	return time;
}


