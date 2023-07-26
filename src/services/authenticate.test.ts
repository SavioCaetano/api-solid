import { expect, test, describe, } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials'


describe('Authenticate Use Case', () => {
    test('user be able to authenticate', async () => {
        const usersRespository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRespository)

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
        const usersRespository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRespository)
        
        expect(() => sut.execute({
            email: 'johndoe@example.com',
            password: '123456',
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    test('user should not be able to authenticate with wrong password', async () => {
        const usersRespository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRespository)
        
        await usersRespository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6)
        })
        
        expect(() => sut.execute({
            email: 'johndoe@example.com',
            password: '1234',
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})