package nlu.project.backend.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import nlu.project.backend.exception.custom.UnauthorizedException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtProvider {
    @Value("${oauth.jwt.token.secret.key}")
    private String JWT_SECRET;
    @Value("${oauth.jwt.token.expiry}")
    private long JWT_EXPIRATION;
    private final String USER_NAME_KEY = "user_name";

    public String generateToken(String userName) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION);

        String token = null;
        try {
            Algorithm algorithm = Algorithm.HMAC256(JWT_SECRET);
            token = JWT.create().withClaim(USER_NAME_KEY, userName)
                    .withExpiresAt(expiryDate).sign(algorithm);
        } catch (JWTCreationException exception) {
            exception.printStackTrace();
        }

        return token;
    }

    public String getUserNameFromJWT(DecodedJWT jwt) {
        return jwt.getClaim(USER_NAME_KEY).asString();
    }

    public DecodedJWT validateToken(String authToken) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(JWT_SECRET);
            JWTVerifier verifier = JWT.require(algorithm).build();
            return verifier.verify(authToken);
        } catch (SignatureVerificationException | JWTDecodeException ex) {
            System.out.println("Invalid JWT token");
            throw new UnauthorizedException("Unauthorized!");
        } catch (TokenExpiredException ex) {
            System.out.println("Expired Token");
            throw new UnauthorizedException("Unauthorized!");
        }
    }

}
