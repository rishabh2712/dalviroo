import URL from 'url-parse'

export function buildUrl(baseUrl, endpoint, queryObj = {}) {
  let url = URL(baseUrl + endpoint, true)
  if(queryObj === null) {
    return url.toString()
  }
  return addQueryParamsToUrl(url, queryObj)
}

export function addQueryParamsToUrl(url, queryObj = {}) {
  let urlObj = URL(url, true)
  urlObj.query = Object.assign({}, urlObj.query, queryObj)
  return urlObj.toString()
}
