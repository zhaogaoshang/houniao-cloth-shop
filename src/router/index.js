import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'

Vue.use(Router)

const route = new Router({
  routes: [
    {
      path: '/',
      name: 'Container',
      redirect: '/category/model',
      component: () => import('@/views/Container'),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/category/model',
          name: 'CategoryAddModel',
          component: () => import('@/views/CategoryAddModel'),
          meta: {
            requiresAuth: true
          },
          children: [
            {
              path: '/category/model/measure/config',
              name: 'CategoryMeasureConfig',
              component: () => import('@/views/CategoryMeasureConfig'),
              meta: {
                requiresAuth: true
              }
            },
            {
              path: '/category/model/model/manage',
              name: 'CategoryModelManage',
              component: () => import('@/views/CategoryModelManage'),
              meta: {
                requiresAuth: true
              }
            },
            {
              path: '/category/model/relation',
              name: 'CategoryModelRelation',
              component: () => import('@/views/CategoryModelRelation'),
              meta: {
                requiresAuth: true
              }
            }
          ]
        },
        {
          path: '/account',
          name: 'Account',
          redirect: '/account/list',
          component: () => import('@/views/Account'),
          meta: {
            requiresAuth: true
          },
          children: [
            {
              path: '/account/list',
              name: 'AccountList',
              component: () => import('@/views/AccountList'),
              meta: {
                requiresAuth: true
              }
            },
            {
              path: '/account/add/edit',
              name: 'AccountAddEdit',
              component: () => import('@/views/AccountAddEdit'),
              meta: {
                requiresAuth: true
              }
            }
          ]
        },
        {
          path: '/project',
          name: 'Project',
          redirect: '/project/list',
          component: () => import('@/views/Project'),
          meta: {
            requiresAuth: true
          },
          children: [
            {
              path: '/project/list',
              name: 'ProjectList',
              component: () => import('@/views/ProjectList'),
              meta: {
                requiresAuth: true
              }
            },
            {
              path: '/project/model',
              name: 'ProjectModel',
              component: () => import('@/views/ProjectModel'),
              meta: {
                requiresAuth: true
              },
              children: [
                {
                  path: '/project/model/show',
                  name: 'ProjectModelShow',
                  component: () => import('@/views/ProjectModelShow'),
                  meta: {
                    requiresAuth: true
                  }
                }
              ]
            }
          ]
        },
        {
          path: '/volume',
          name: 'Volume',
          component: () => import('@/views/Volume'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/position',
          name: 'Position',
          component: () => import('@/views/Position'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/special',
          name: 'Special',
          component: () => import('@/views/Special'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/cloth',
          name: 'Cloth',
          redirect: '/cloth/list',
          component: () => import('@/views/Cloth'),
          meta: {
            requiresAuth: true
          },
          children: [
            {
              path: '/cloth/list',
              name: 'ClothList',
              component: () => import('@/views/ClothList'),
              meta: {
                requiresAuth: true
              }
            },
            {
              path: '/cloth/add/edit',
              name: 'ClothAddEdit',
              component: () => import('@/views/ClothAddEdit'),
              meta: {
                requiresAuth: true
              }
            },
            {
              path: '/cloth/info',
              name: 'ClothInfo',
              component: () => import('@/views/ClothInfo'),
              meta: {
                requiresAuth: true
              }
            },
            {
              path: '/cloth/brand',
              name: 'ClothBrand',
              component: () => import('@/views/ClothBrand'),
              meta: {
                requiresAuth: true
              }
            }
          ]
        },
        {
          path: '/fabric/brand',
          name: 'FabricBrand',
          redirect: '/fabric/brand/list',
          component: () => import('@/views/FabricBrand'),
          meta: {
            requiresAuth: true
          },
          children: [
            {
              path: '/fabric/brand/list',
              name: 'FabricBrandList',
              component: () => import('@/views/FabricBrandList'),
              meta: {
                requiresAuth: true
              }
            },
            {
              path: '/fabric/brand/edit',
              name: 'FabricBrandEdit',
              component: () => import('@/views/FabricBrandEdit'),
              meta: {
                requiresAuth: true
              }
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login'),
      meta: {
        requiresAuth: false
      }
    }
  ]
})

route.beforeEach((to, from, next) => {
  // console.log(to)
  if (to.meta.requiresAuth) {
    if (store.state.user.userInfo === null) {
      next('/login')
    } else {
      store.commit('aside/switch', to.fullPath)
      next()
    }

    return false
  }
  next()
})

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Router.prototype.replace = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default route
