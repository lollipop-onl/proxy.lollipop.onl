/** 許可されたリクエスト元オリジンのリスト */
export const ALLOWED_ORIGIN_LIST: Array<string | RegExp> = [
  /^https?:\/\/[^/]+lollipop\.onl/,
];

/** 許可されたプロキシターゲットURLのリスト */
export const ALLOWED_TARGET_URL_LIST: Array<string | RegExp> = [
  /.*/,
];
