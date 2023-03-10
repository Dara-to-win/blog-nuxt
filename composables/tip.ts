// 根据 Hour设置提示语
export const getHelloInfo: () => {helloInfo:string, tipInfo:string} = () => {
    const date:Date = new Date()
    const hour:number = date.getHours()
    const week:number = date.getDay()
    let helloInfo:string = ''
    let tipInfo:string = ''
    if (hour < 6) {
        helloInfo = '凌晨好！'
    } else if (hour < 11) {
        helloInfo = '上午好！'
    } else if (hour < 13) {
        helloInfo = '中午好！'
    } else if (hour < 18) {
        helloInfo = '下午好！'
    } else {
        helloInfo = '晚上好！'
    }
    switch(week) {
        case 0: 
            tipInfo = '须知少时凌云志，曾许人间第一流。'
            break
        case 1:
            tipInfo = '时人不识凌云木，直待凌云始道高。'
            break
        case 2:
            tipInfo = '长风破浪会有时，直挂云帆济沧海。'
            break
        case 3: 
            tipInfo = '丈夫志四海，万里犹比邻。'
            break
        case 4:
            tipInfo = '莫愁前路无知己，天下谁人不识君？'
            break
        case 5:
            tipInfo = '海阔凭鱼跃，天高任鸟飞。'
            break
        default:
            tipInfo = '春风得意马蹄疾，一日看尽长安花。'
    }
    return {helloInfo, tipInfo}
}