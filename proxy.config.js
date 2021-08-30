const proxy = [
    {
      context: '/api',
      target: 'http://localhost:44330',
      pathRewrite: {'^/api' : ''}
    }
  ];
module.exports = proxy;