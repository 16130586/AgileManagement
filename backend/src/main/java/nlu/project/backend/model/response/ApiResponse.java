package nlu.project.backend.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse {
    private Integer status;
    private Integer code;
    private Object message;
    private Object data;

    public static ApiResponse OnSuccess(Object data , Object message){
        ApiResponse ret = new ApiResponse();
        ret.status = 200;
        ret.code = 200;
        ret.message = message;
        ret.data = data;
        return ret;
    }
    public static ApiResponse OnCreatedSuccess(Object data , Object message){
        ApiResponse ret = new ApiResponse();
        ret.status = 201;
        ret.code = 201;
        ret.message = message;
        ret.data = data;
        return ret;
    }
    public static ApiResponse OnCreatedSuccess(Object data){
        ApiResponse ret = new ApiResponse();
        ret.status = 201;
        ret.code = 201;
        ret.message = "Created success!";
        ret.data = data;
        return ret;
    }
    public static ApiResponse OnNotFound(Object message){
        ApiResponse ret = new ApiResponse();
        ret.status = 404;
        ret.code = 404;
        ret.message = message == null ? "Not found!" : message;
        ret.data = null;
        return ret;
    }
    public static ApiResponse OnNotFound(){
        ApiResponse ret = new ApiResponse();
        ret.status = 404;
        ret.code = 404;
        ret.message =  "Not found!";
        ret.data = null;
        return ret;
    }

    public static ApiResponse OnBadRequest(){
        ApiResponse ret = new ApiResponse();
        ret.status = 400;
        ret.code = 400;
        ret.message = "Bad request!" ;
        ret.data = null;
        return ret;
    }
    public static ApiResponse OnBadRequest(Object message){
        ApiResponse ret = new ApiResponse();
        ret.status = 400;
        ret.code = 400;
        ret.message = message;
        ret.data = null;
        return ret;
    }
    public static ApiResponse OnForbidden(){
        ApiResponse ret = new ApiResponse();
        ret.status = 403;
        ret.code = 403;
        ret.message = "Bad request!";
        ret.data = null;
        return ret;
    }
    public static ApiResponse OnForbidden(Object message){
        ApiResponse ret = new ApiResponse();
        ret.status = 403;
        ret.code = 403;
        ret.message = message;
        ret.data = null;
        return ret;
    }

}
