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
  next();
};

module.exports = requestExtractor;
