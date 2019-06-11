
/**
 *
 *
 * @export 获取百分比
 * @param {*} num 数量
 * @param {*} total 总数
 * @returns 
 */
export function getPercent(num, total) {
    num = parseFloat(num);
    total = parseFloat(total);
    if (isNaN(num) || isNaN(total)) {
        return "-";
    }
    return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00).toFixed(0) + "%";

}

/**
 *
 *
 * @export 数组去重
 * @param {*} arr
 * @returns
 */
export function unique(arr) {
    let hash = [];
    for (let i = 0; i < arr.length; i++) {
        if (hash.indexOf(arr[i]) == -1) {
            hash.push(i)
        }
    }
    return arr;
}



/**
 *
 *
 * @export 判断起始时间和结束时间 
 * @param {*} type  类型
 * @param {*} startTime
 * @param {*} endTime
 */
export function timeCheck(type, startTime, endTime) {
    switch (type) {
        case "startTime":
            if (
                !(
                    endTime == "" ||
                    endTime == "null" ||
                    endTime == null
                )
            ) {
                let timeBegin = startTime.toString();
                let timeEnd = startTime.toString();

                if (timeBegin > timeEnd) {
                    this.$message({
                        type: "warning",
                        message: "开始时间不能大于结束时间!"
                    });
                    startTime = "";
                }
            }
            break;
        case "endTime":
            if (
                !(
                    startTime == "" ||
                    startTime == "null" ||
                    startTime == null
                )
            ) {
                let timeBegin = startTime.toString();
                let timeEnd = endTime.toString();

                if (timeBegin > timeEnd) {
                    this.$message({
                        type: "warning",
                        message: "結束时间不能小于开始时间!"
                    });
                    endTime = "";
                }
            }
            break;
    }
}

/**
 *@export 特殊字符禁止输入
 *
 * @param {*} value
 */
export function validForbid(value, type) {
    if (!type) {
        value = value.replace(/[`~!@#$%^&*()_+=<>?:"{}|,/;'\\[\]·~！@#￥%……&*（）——+={}|《》？：“”【】、；‘’，。、]/g, '').replace(/\s/g, "");
        return value
    }
}
/**
 *@export 特殊字符禁止输入
 *
 * @param {*} value
 */

export function specialValidForbid(value, type) {
    if (!type) {
        value = value.replace(/[`~!@#$%^&*()_+=<>?:"{}|,/;'\\[\]·~！@#￥%……&*（）——+={}|《》？：“”【】、；‘’，。、]/g, '').replace(/\s/g, "");
        return value
    }
}

/**
 *@export 深拷贝函数
 *
 * @param {*} value
 */

export function deepClone(obj) {
    let data
    if (Object.prototype.toString.call(obj) === '[object Array]') {
        data = []
        for (let index = 0; index < obj.length; index++) {
            data.push(deepClone(obj[index]))
        }
    } else if (Object.prototype.toString.call(obj) === '[object Object]') {
        data = {}
        for (let key in obj) {
            data[key] = deepClone(obj[key])
        }
    } else {
        return obj
    }
    return data
}


/**
 *@export 格式化时间戳
 *
 * @param {time}  
 */
export function unixDataFormat(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = ((date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1)) + '-';
        var D = date.getDate() < 10 ?  '0'+date.getDate()+ ' ' : date.getDate()+ ' ';
        return Y+M+D;
  
}