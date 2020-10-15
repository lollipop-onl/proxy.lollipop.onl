import { NowRequest, NowResponse } from '@vercel/node';

export default (req: NowRequest, res: NowResponse): void => {
  res.status(404).json({ message: 'page not found.' });
};
