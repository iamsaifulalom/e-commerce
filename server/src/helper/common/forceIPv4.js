// forceIPv4.js
const dns = require('dns');

function forceIPv4() {
  dns.lookup = ((originalLookup) => {
    return function(hostname, options, callback) {
      if (typeof options === 'function') {
        callback = options;
        options = { family: 4 };
      } else if (!options) {
        options = { family: 4 };
      } else {
        options.family = 4;
      }
      return originalLookup.call(this, hostname, options, callback);
    };
  })(dns.lookup);
}

module.exports = forceIPv4;
