const ZZCacheName = '__zz_json_maps_cache__';
const ZZCosResourceBaseUrl = "https://wpm.hsmob.com/wpmv2";

export default async function (options, callBack) {
  try {
    if (!window[ZZCacheName]){
      window[ZZCacheName] = {};
    }
    const caches = window[ZZCacheName];
    let source = '';
    let env = '';
    if (isObject(options)){
      source = options.source;
      env = options.env || window.location.origin.includes('weimobqa') ? 'qa' : 'online';
    }else{
      source = options;
      env = window.location.origin.includes('weimobqa') ? 'qa' : 'online';
    }
    if (caches[source]) {
      callBack(null, caches[source]);
      return caches[source];
    }
    let [_, pkgName] = source.match(/[\\/]+wpmjs[\\/]+\$[\\/]+(.+)/) || []
    let url = '';
    if (pkgName) {
      const {
        name,
        version,
        entry = '',
        query
      } = getPkgInfo(pkgName)
      const filename = 'index.json';
      url = `${ZZCosResourceBaseUrl}/${name}/${version}/${env}/${filename}?${query}&${createTimestampVersion()}`;
    } else if (/^https?:\/\//.test(source)) {
      url = source;
    }
    const data = await fetch(url)
    caches[source] = data;
    callBack(null, data);
    return data;
  } catch (e) {
    callBack(e, null)
    throw e;
  }
}

async function fetch(url) {
  try {
    const response = await window.fetch(url);
    return response.json(); // parses JSON response into native JavaScript objects
  } catch (e) {
    throw e
  }
}

function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]'
}

function createTimestampVersion() {
  const updateCache = 5 * 60 * 1000;
  return `v=${Math.ceil(new Date().getTime() / updateCache)}`;
}

function getPkgInfo(pkgName) {
  //多入口形式如@wemo-ui/klein@1.0.2/Button?a=1
  const {1: name, 5: version = 'latest', 6: entry = "", 9: query = ""} = pkgName.match(/^((@[_\-A-Za-z\d]+\/)?([_\-A-Za-z\d]+))(@(.+?))?(\/([_\-A-Za-z\d/]+))?(\?(.+?))?$/) || [];
  return {
    entry,
    name,
    version,
    query
  }
}
