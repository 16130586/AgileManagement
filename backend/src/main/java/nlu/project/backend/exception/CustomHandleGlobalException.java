package nlu.project.backend.exception;

import nlu.project.backend.exception.custom.InternalException;
import nlu.project.backend.exception.custom.InvalidInputException;
import nlu.project.backend.exception.custom.NotFoundException;
import nlu.project.backend.model.response.ApiResponse;
import nlu.project.backend.util.Header;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class CustomHandleGlobalException extends ResponseEntityExceptionHandler {

    @Autowired
    Header header;

    /**
     * Handle when Spring Validation throw exception
     */
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers, HttpStatus status, WebRequest request) {
        headers.add("Content-type", "application/json");
        Map<String, String> errors = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }
        ApiResponse apiResponse = new ApiResponse(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, null, errors, null);
        return new ResponseEntity<>(apiResponse, headers, HttpStatus.OK);
    }


    /**
     * Handle when throw custom InternalException
     */
    @ExceptionHandler(InternalException.class)
    protected ResponseEntity<Object> handleInternalException(RuntimeException ex, WebRequest request) {
        ApiResponse apiResponse = new ApiResponse(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, null, ex.getMessage(), null);
        return new ResponseEntity<>(apiResponse, header.getHeaders(), HttpStatus.OK);
    }

    /**
     * Handle when throw custom NotFoundException
     */
    @ExceptionHandler(NotFoundException.class)
    protected ResponseEntity<Object> handleNotFoundException(RuntimeException ex, WebRequest request) {
        ApiResponse apiResponse = new ApiResponse(HttpServletResponse.SC_NOT_FOUND, null, ex.getMessage(), null);
        return new ResponseEntity<>(apiResponse, header.getHeaders(), HttpStatus.OK);
    }

    /**
     * Handle when throw custom InvalidInputException
     */
    @ExceptionHandler(InvalidInputException.class)
    protected ResponseEntity<Object> handleInvalidInputException(RuntimeException ex, WebRequest request) {
        ApiResponse apiResponse = new ApiResponse(HttpServletResponse.SC_BAD_REQUEST, null, ex.getMessage(), null);
        return new ResponseEntity<>(apiResponse, header.getHeaders(), HttpStatus.OK);
    }

}
