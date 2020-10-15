import { NowRequestQuery } from '@vercel/node';
import { getProxyErrorResponse, ProxyErrorResponse } from './getProxyErrorResponse';

export type TargetResult = string | ProxyErrorResponse;

/**
 * クエリからターゲットURLを取得
 * @param requestQuery リクエストクエリ
 */
export const getTargetUrl = (requestQuery: NowRequestQuery): TargetResult => {
  const { proxyTarget } = requestQuery;

  if (!proxyTarget) {
    return getProxyErrorResponse('error.missingParameter', 'パラメータが不足しています。', { property: 'proxyTarget' });
  }

  if (Array.isArray(proxyTarget) || !/^https?:\/\//.test(proxyTarget)) {
    return getProxyErrorResponse('error.invalidParameter', 'パラメータが不正です。', { property: 'proxyTarget' });
  }

  return proxyTarget;
};
