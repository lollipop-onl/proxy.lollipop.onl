export type ProxyErrorResponse = {
  isProxyError: true;
  code: string;
  message: string;
  data: Record<any, unknown>;
};

/**
 * ProxyError のレスポンスデータを取得する
 * @param code エラーコード
 * @param message メッセージ
 * @param data 詳細なデータ
 */
export const getProxyErrorResponse = (code: string, message: string, data: Record<any, unknown>): ProxyErrorResponse => {
  return {
    isProxyError: true,
    code,
    message,
    data,
  };
};
