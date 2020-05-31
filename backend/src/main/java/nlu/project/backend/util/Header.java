package nlu.project.backend.util;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

@Component
public class Header {
    private HttpHeaders headers = new HttpHeaders();

    public HttpHeaders getHeaders() {
        if (headers.isEmpty()) {
            headers.add("Content-type", "application/json");
        }
        return headers;
    }

}
