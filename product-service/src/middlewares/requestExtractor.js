const aqp = require('api-query-params');
const url = require('url');
const requestExtractor = () => (req, res, next) => {
  req.requestInfo = {
    corelationId: req.corelationId,
    ip: req.ip,
    ips: req.ips,
    method: req.method,
    originalUrl: req.originalUrl,
    userAgent: req.get('User-Agent'),
    time: new Date().toISOString()
  };
  const { filter, skip, limit, sort } = aqp(url.parse(req.url, true).query, {
    skipKey: 'page'
  });
  const options = {
    page: skip,
    limit,
    sort
  };
  if (!req.filter) {
    req.filter = filter;
  }
  req.options = options;
  next();
};

module.exports = requestExtractor;
