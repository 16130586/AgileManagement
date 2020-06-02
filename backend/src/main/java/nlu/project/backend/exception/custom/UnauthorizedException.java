package nlu.project.backend.exception.custom;

public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(String message) {
        super(message);
    }

    public UnauthorizedException(Throwable throwable) {
        super(throwable);
    }

    public UnauthorizedException(String message, Throwable throwable) {
        super(message, throwable);
    }
}
