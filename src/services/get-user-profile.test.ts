import { expect, test, describe, beforeEach, } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found'

let usersRespository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        usersRespository = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRespository)
    })

    test('user be able to get user profile', async () => {
        const createdUser = await usersRespository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6)
        })
        
        const { user } = await sut.execute({
            userId: createdUser.id
        })

        expect(user.name).toEqual('John Doe')
    })

    test('user should not be able to get user profile with wrong id', async () => {       
        await expect(() => sut.execute({
            userId: 'non-existing-id',
        })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})