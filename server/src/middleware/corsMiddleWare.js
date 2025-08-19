const allowedDomain = "bazarbhai.com";

function checkOrigin(origin, callback) {

    if (!origin) {
        return callback(null, true);
    }

    const url = new URL(origin);
    const hostname = url.hostname;

    // Check if it's localhost (for dev)
    const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";

    // Check if it's the main domain or any subdomain of it
    const isAllowed = hostname === allowedDomain || hostname.endsWith(`.${allowedDomain}`);

    if (isLocalhost || isAllowed) {
        callback(null, true);
    } else {
        callback(new Error("Not allowed by CORS"));
    }
}

module.exports = checkOrigin;