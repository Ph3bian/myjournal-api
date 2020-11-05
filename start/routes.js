'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in welcome to my journal api' }
})


Route.post('auth/login', 'UserController.login').middleware('guest')

Route.put('auth/register', 'UserController.register').middleware('guest')

Route.get('posts', 'PostController.getPosts').middleware('auth')

Route.post('post', 'PostController.getPost').middleware('auth')

Route.post('posts', 'PostController.createPost').middleware('auth')

Route.patch('posts', 'PostController.editPost').middleware('auth')

Route.delete('posts', 'PostController.deletePost').middleware('auth')

Route.any('*', ({ response }) =>
    response.badRequest({ success: false, message: 'Route does not exist' })
)
