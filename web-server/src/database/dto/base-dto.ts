export abstract class BaseDto<T> {
    abstract validate(): T;
    protected errors: string[];
}