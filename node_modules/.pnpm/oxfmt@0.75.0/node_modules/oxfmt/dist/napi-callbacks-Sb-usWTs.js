//#region src-js/libs/napi-callbacks.ts
/**
* Wrap a `formatFile`-shaped `Promise<string>` so it never rejects, preserving the error message.
*/
async function toFormatFileResult(run) {
	return run.then((code) => ({
		ok: true,
		code
	})).catch((err) => ({
		ok: false,
		error: errorToMessage(err)
	}));
}
/**
* Wrap a best-effort formatter `Promise<T>` so it never rejects, discarding the error as `null`.
* Used for embedded code / tailwind sorting, where Rust falls back to the original code on failure.
*/
async function toNullable(run) {
	return run.catch(() => null);
}
function errorToMessage(err) {
	if (err instanceof Error) return String(err);
	if (err !== null && typeof err === "object") {
		const { name, message } = err;
		if (typeof message === "string") return typeof name === "string" && name.length > 0 ? `${name}: ${message}` : message;
	}
	return String(err);
}
//#endregion
export { toNullable as n, toFormatFileResult as t };
