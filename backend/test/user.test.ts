// @ts-expect-error Importing ts file doesn't work otherwise (must be .js for some reason)
import { User } from '../src/models/user.ts'
// @ts-expect-error Importing ts file doesn't work otherwise (must be .js for some reason)
import { type IUser } from '../src/models/user.ts'
import { expect } from '@jest/globals'

describe('user', () => {
    it('should create a new User with the appropriate fields', () => {
      const user: IUser = {
        first_name: 'first',
        last_name: 'last',
        username: 'user',
        password: 'pass'
      }
      const result = new User(user)
      expect(result.first_name).toBe(user.first_name)
      expect(result.last_name).toBe(user.last_name)
      expect(result.username).toBe(user.username)
      expect(result.password).toBe(user.password)
    })
  })