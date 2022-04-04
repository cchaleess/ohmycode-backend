import jwt from "jsonwebtoken";

const generarJWT = (usuario) => {
    const token = jwt.sign({
        _id: usuario._id,
        name: usuario.name,
        username: usuario.username
    }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
    return token;
}

export default generarJWT;