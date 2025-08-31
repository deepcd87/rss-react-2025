export function createResource<T>(promise: Promise<T>) {
  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: T;
  let error: unknown;

  const suspender = promise.then(
    (res) => {
      status = 'success';
      result = res;
    },
    (err) => {
      status = 'error';
      error = err;
    }
  );

  return {
    read(): T {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw error;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return result!;
    },
  };
}
