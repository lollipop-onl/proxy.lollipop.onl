import { NowRequest, NowResponse } from '@vercel/node';

export default (req: NowRequest, res: NowResponse): void => {
  console.log('run serverless function.');

  res.status(200).json({ success: true });
};
