import { expect, test, describe, beforeEach, } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials'

let usersRespository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
    beforeEach(() => {
        usersRespository = new InMemoryUsersRepository()
        sut = new AuthenticateUseCase(usersRespository)
    })

    test('user be able to authenticate', async () => {
        await usersRespository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6)
        })
        
        const { user } = await sut.execute({
            email: 'johndoe@example.com',
            password: '123456',
        })

        expect(user.id).toEqual(expect.any(String))
    })

    test('user should not be able to authenticate with wrong email', async () => {       
        await expect(() => sut.execute({
            email: 'johndoe@example.com',
            password: '123456',
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    test('user should not be able to authenticate with wrong password', async () => {
        await usersRespository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6)
        })
        
        await expect(() => sut.execute({
            email: 'johndoe@example.com',
            password: '1234',
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})