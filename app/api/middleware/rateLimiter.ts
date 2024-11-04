// app/api/middleware/rateLimiter.ts
import rateLimit from 'express-rate-limit'
import { NextApiRequest, NextApiResponse } from 'next'

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per windowMs
  message: 'Whoa there, speed racer! Looks like you have got us working overtime. Take a breather and try again later',
  standardHeaders: true,
  legacyHeaders: false,
})

export default function applyRateLimit(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    rateLimiter(req, res, (result: Error | undefined) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}
