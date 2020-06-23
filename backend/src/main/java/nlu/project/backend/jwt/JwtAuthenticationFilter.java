package nlu.project.backend.jwt;

import com.auth0.jwt.interfaces.DecodedJWT;
import nlu.project.backend.business.UserBusiness;
import nlu.project.backend.model.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends GenericFilterBean {
    @Autowired
    JwtProvider jwtProvider;

    @Autowired
    UserBusiness userBusiness;

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        // Kiểm tra xem header Authorization có chứa thông tin jwt không
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        try {
            // Lấy jwt từ request
            String jwt = getJwtFromRequest((HttpServletRequest) request);
            DecodedJWT decodedJWT = jwtProvider.validateToken(jwt);

            // Lấy username từ chuỗi jwt
            String userName = jwtProvider.getUserNameFromJWT(decodedJWT);
            // Lấy thông tin người dùng từ username
            UserDetails userDetails = userBusiness.loadUserByUsername(userName);
            // Set attribute user into httpRequest
            ((HttpServletRequest) request).setAttribute("user", userDetails);
            // Nếu người dùng hợp lệ, set thông tin cho Seturity Context
            UsernamePasswordAuthenticationToken
                    authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails((HttpServletRequest) request));

            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (Exception ex) {
            //ex.printStackTrace();
            SecurityContextHolder.getContext().setAuthentication(null);
            System.out.println("Failed on set user authentication");
        }
        chain.doFilter(request, response);
    }
}
