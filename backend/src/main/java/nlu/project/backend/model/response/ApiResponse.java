package nlu.project.backend.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApiResponse {
    private Integer status;
    private Integer code;
    private Object message;
    private Object data;
}
