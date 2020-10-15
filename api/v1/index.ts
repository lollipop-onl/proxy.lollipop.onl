import { NowRequest, NowResponse } from '@vercel/node';
import httpProxy from 'http-proxy';
import { ALLOWED_ORIGIN_LIST } from '../../helpers/constants';
import { getProxyErrorResponse } from '../../helpers/getProxyErrorResponse';
import { getTargetUrl } from '../../helpers/getTargetUrl';

const proxy = httpProxy.createProxyServer();

export default (req: NowRequest, res: NowResponse): void => {
  const { headers, query } = req;
  const { origin } = headers;
  const isAllowedOrigin = ALLOWED_ORIGIN_LIST.some((pattern) => typeof pattern === 'string' ? pattern === origin : pattern.test(origin));

  if (isAllowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  const target = getTargetUrl(query);

  if (typeof target !== 'string') {
    res.status(400).json(target);

    return;
  }

  proxy.web(req, res, { target: target, changeOrigin: true }, (proxyError, proxyReq, proxyRes, proxyTarget) => {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    res.status(proxyRes.statusCode).json(getProxyErrorResponse('error.proxyFailed', 'Proxyを実行中に問題が発生しました。', { target: typeof proxyTarget === 'string' ? proxyTarget : proxyTarget.href || target, message: proxyError.message }));
  });
};
