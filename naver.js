const KEY = "";//네이버 앱마다 다른 hMac키
/**
 * @param url 원본 Api url(md, msgpad없이)
 * @param time unix timestemp로 된 시간
 * @returns String md와 msgpad가 추가된 url
 */
function getUrl(u,t){
    let m=javax.crypto.Mac.getInstance('HmacSHA1');
    m.init(new javax.crypto.spec.SecretKeySpec(new java.lang.String(KEY).getBytes(),'HmacSHA1'));
    return (u.includes('?')?u+'&':u+'?')+'msgpad='+t+'&md='+encodeURIComponent(java.util.Base64.getEncoder().encodeToString(m.doFinal(new java.lang.String(u.substring(0,Math.min(255,u.length))+t).getBytes())));
}
