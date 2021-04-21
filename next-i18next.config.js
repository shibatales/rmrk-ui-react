const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    localeDetection: false,
    locales: ['en'],
    localePath: path.resolve('./public/locales'),
  },
};
