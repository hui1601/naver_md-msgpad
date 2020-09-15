importClass(javax.crypto.Mac);
importClass(javax.crypto.spec.SecretKeySpec);
importClass(java.lang.StringBuilder);
importClass(java.lang.StringBuffer);
importClass(java.util.Base64);
importClass(org.jsoup.Jsoup);
const _String = java.lang.String;


function toBase64(buffer) {
    return Base64.getEncoder().encodeToString(buffer);
}
/**
 * @param str 네이버 앱마다 다른 고정값의 hMac키 입니다.
 * @returns javax.crypto.Mac mac입니다.
 */
function getInstance(str) {
    let secretKeySpec = new SecretKeySpec(new _String(str).getBytes(), "HmacSHA1");
    let instance = Mac.getInstance("HmacSHA1");
    instance.init(secretKeySpec);
    return instance;
}

/**
 * @param mac 앞에서 얻은 javax.crypto.Mac
 * @param url 원본 Api url(md, msgpad없이)
 * @param time unix timestemp로 된 시간
 * @returns String md와 msgpad가 추가된 url
 */
function getUrl(mac, url, timestamp) {
    let substring = url.substring(0, Math.min(255, url.length));
    let sb = new StringBuilder();
    sb.setLength(0);
    sb.append(substring);
    sb.append(timestamp);
    let encode = encodeURIComponent(toBase64(mac.doFinal(new _String(sb.toString()).getBytes())));
    sb = new StringBuilder();
    sb.setLength(0);
    sb.append(url);
    if (url.includes("?")) {
        sb.append("&");
    } else {
        sb.append("?");
    }
    sb.append("msgpad=");
    sb.append(timestamp);
    sb.append("&md=");
    sb.append(encode);
    return sb.toString();
}
