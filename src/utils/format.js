/**
 * 处理location.search的方法,将字符串转换成json
 * @param {string} search
 */
export function queryFormat(search = '') {
  let params = {};
  if(search === ''){
    return params
  }
  if (typeof search === 'string') {
    search = search.indexOf('?') < 0 ? search : search.substr(search.indexOf('?') + 1);
    let a = search.split('&');
    let b = a.map(v => v.split('='));
    b.map(v => (params[v[0]] = v[1]));
  }
  return params;
}

/**
 * 处理字符串的方法,将字符串转换成json
 * @param {string} search
 */
export function stringFormat(search = '') {
  let params = {}
  if (search.length) {
      let a = search.split(';')
      let b = a.map(v => v.split('='))
      b.map(v => (params[v[0]] = v[1]))
  }
  return params
}