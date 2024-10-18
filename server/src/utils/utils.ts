import { sign, verify, decode } from 'hono/jwt';

/**
 * const payload = {
 *  sub: 'user123',
 *  role: 'admin',
 *  exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
 * }
 * const secret = 'mySecretKey'
 * @param payload 
 * @param secret 
 * @returns 
 */
const generatesToken = (payload: any, secret: string) => {
  return sign(payload, secret)
}

/**
 * const token = 'token'
 * const secretKey = 'mySecretKey'
 * @returns {Object} { "sub": "1234567890", "name": "John Doe", "iat": 1516239022 }
 */
const verifyToken = (token: string, secretKey: string) => {
  return verify(token, secretKey);
}


/**
 * Decode the JWT token
 * const tokenToDecode ='eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJzdWIiOiAidXNlcjEyMyIsICJyb2xlIjogImFkbWluIn0.JxUwx6Ua1B0D1B0FtCrj72ok5cm1Pkmr_hL82sd7ELA'
 * @param token 
 */
const decodesToken = (token: string) => {
    const { header, payload } = decode(token);
    return {
        header,
        payload
    }
}

export {
  generatesToken,
  verifyToken,
  decodesToken
}
