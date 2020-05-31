package nlu.project.backend.exception.custom;

public class InvalidInputException extends RuntimeException {
    public InvalidInputException(String message) {
        super(message);
    }

    public InvalidInputException(Throwable throwable) {
        super(throwable);
    }

    public InvalidInputException(String message, Throwable throwable) {
        super(message, throwable);
    }
}
