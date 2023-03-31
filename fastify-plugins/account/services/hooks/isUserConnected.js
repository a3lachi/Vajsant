function isUserConnected(request) {
    return new Promise(
        (resolve) => {
            if(request.jwtVerify) {
                request.jwtVerify(
                    (err) => {
                        resolve(err ? false : true);
                    }
                );
            } else {
                resolve(false);
            }
        }
    );
}


module.exports = isUserConnected;