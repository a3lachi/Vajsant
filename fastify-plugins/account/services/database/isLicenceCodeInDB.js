const securePassword = require("secure-password");
const pwd = securePassword();
const { ObjectId } = require("@fastify/mongodb");

async function isLicenceCodeInDb (licenceCodeCollection, licenceCode) {
    const licenceCodes = await licenceCodeCollection.find().toArray();
    
    let promises = [];
    // Checking the result with password encryption
    await licenceCodes.forEach(
        (code) => {
            promises.push(
                pwd.verify(
                    Buffer.from(licenceCode),
                    code.hashedPassword.buffer
                )
            );
        }
    );

    const results = await Promise.all(promises);
    let codeIndex = -1;
    results.forEach(
        (el, index) => {
            if (
                el == securePassword.VALID ||
                el == securePassword.VALID_NEEDS_REHASH
            ) {
                codeIndex = index;
                if (el === securePassword.VALID_NEEDS_REHASH) {
                    req.log.info(
                        {
                            licenceCode
                        },
                        "password needs rehashing"
                    );
                    console.log("value to rehash : %o", Buffer.from(password));
                    const hashedPassword = pwd.hash(Buffer.from(password));
                    userCollection.update(
                        {
                            _id: el._id
                        },
                        {
                            hashedPassword: hashedPassword
                        }
                    );
                }
            } else {
                console.log("securePassword el : %o", el);
            }
        }
    );

    let foundCode = codeIndex != -1;
    if (foundCode) {
        foundCode = licenceCodes[codeIndex];
        if (!foundCode) {
            return false;
        }
        const updateFilter = { _id: ObjectId(foundCode._id) };

        await licenceCodeCollection.deleteOne(
            updateFilter
        );
    }
    return foundCode ? foundCode : false;
}

module.exports = isLicenceCodeInDb;