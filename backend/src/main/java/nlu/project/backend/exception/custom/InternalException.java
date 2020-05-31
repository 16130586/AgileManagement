package nlu.project.backend.exception.custom;

public class InternalException extends RuntimeException {

    public InternalException(String message) {
        super(message);
    }

    public InternalException(Throwable throwable) {
        super(throwable);
    }

    public InternalException(String message, Throwable throwable) {
        super(message, throwable);
    }
}
