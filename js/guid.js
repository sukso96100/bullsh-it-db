var guid = null;

function setupGuid(){
    guid = getCookie('guid');
if(guid == undefined || guid == null){
    guid = createGuid()
    setCookie('guid',guid,3650)
    console.log(guid)
}else{
    console.log(guid)
}
    }
 // 쿠키 생성
    function setCookie(cName, cValue, cDay){
        var expire = new Date();
        expire.setDate(expire.getDate() + cDay);
        cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
        if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
        document.cookie = cookies;
    }
 
    // 쿠키 가져오기
    function getCookie(cName) {
        cName = cName + '=';
        var cookieData = document.cookie;
        var start = cookieData.indexOf(cName);
        var cValue = '';
        if(start != -1){
            start += cName.length;
            var end = cookieData.indexOf(';', start);
            if(end == -1)end = cookieData.length;
            cValue = cookieData.substring(start, end);
        }
        return unescape(cValue);
    }

function createGuid(){
        var currentdate = new Date();
        var datetime = "GUID" 
                + currentdate.getFullYear()
                + (currentdate.getMonth()+1)
                + currentdate.getDate()
                + currentdate.getHours()
                + currentdate.getMinutes()
                + currentdate.getSeconds()
                + currentdate.getMilliseconds();
    return datetime;
}