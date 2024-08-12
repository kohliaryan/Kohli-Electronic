import { Hono } from 'hono'
import { categoryRoute } from './v1/category'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Welcome to Kohli Electronics')
})

app.route('/v1/admin', categoryRoute)


export default app
