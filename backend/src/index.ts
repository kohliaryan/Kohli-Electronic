import { Hono } from 'hono'
import { adminRouter } from './v1/admin'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Welcome to Kohli Electronics')
})

app.route('/v1/admin', adminRouter)


export default app
