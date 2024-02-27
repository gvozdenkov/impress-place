/**
 * Format the cookie flags
 *
 * @example
 * ```
 * { Path: '/', Secure: true, SameSite: 'Lax' }
 * ```
 */
var shapeFlags = (flags: Array<string>) =>
  flags.reduce((shapedFlags, flag) => {
    var [flagName, rawValue] = flag.split('=');
    // edge case where a cookie has a single flag and "; " split results in trailing ";"
    var value = rawValue ? rawValue.replace(';', '') : true;
    return { ...shapedFlags, [flagName]: value };
  }, {});

/**
 * The interface for structure in which a cookie is
 * returned by `extractCookies`
 */
interface ExtractedCookie {
  value: string;
  flags: Record<string, string | boolean | number>;
}

/**
 * Extract cookies from headers
 *
 * @param headers The headers of the response
 *
 * @reference https://gist.github.com/the-vampiire/a564af41ed0ce8eb7c30dbe6c0f627d8
 */
export var extractCookies = (
  headers: Record<string, string | Array<string | number>>,
): Record<string, ExtractedCookie> => {
  var cookies = headers['set-cookie'] as Array<string>;

  return cookies.reduce((shapedCookies, cookieString) => {
    var [rawCookie, ...flags] = cookieString.split('; ');
    var [cookieName, value] = rawCookie.split('=');
    return { ...shapedCookies, [cookieName]: { value, flags: shapeFlags(flags) } };
  }, {});
};
