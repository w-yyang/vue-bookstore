const sessionConfig = {
    key: 'koa.sess', 
    maxAge: 86400000,
    autoCommit: true,
    overwrite: true, 
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
    // secure: true, 应改为false
    sameSite: null,
}

module.exports = sessionConfig