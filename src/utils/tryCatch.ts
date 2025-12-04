type Success<T> = [T, null];

type Failure<E> = [null, E];

type Result<T, E = Error> = Success<T> | Failure<E>;

/**
 * Tries to execute a promise and returns a tuple indicating success or failure.
 * @param promise The promise to execute.
 * @returns A tuple where the first element is the result or null, and the second element is the error or null.
 */
export async function tryCatch<T, E = Error>(
    promise: Promise<T>
): Promise<Result<T, E>> {
    try {
        const data = await promise;
        return [data, null];
    } catch (error) {
        return [null, error as E];
    }
}
