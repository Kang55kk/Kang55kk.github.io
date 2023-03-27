var jqArrToJsArr = function (jqobjArr) {
    //jq对象数组转换成dom数组
    let times = jqobjArr.length
    let tempArr = []
    for (let index = 0; index < times; index++) {
        tempArr.push(jqobjArr[index])
    }
    return tempArr
}


