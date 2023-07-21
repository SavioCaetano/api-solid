import { expect, test, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

describe('Register Use Case', () => {
    test('user be able to register', async () => {
        const usersRespository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRespository)

        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        })

        expect(user.id).toEqual(expect.any(String))
    })
    
    test('user password on registration must be hash', async () => {
        const usersRespository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRespository)

        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash,
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    test('user can not be able to register with same email twice', async () => {
        const usersRespository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRespository)

        const email = 'johndoe@example.com'
        
        await registerUseCase.execute({
            name: 'John Doe',
            email,
            password: '123456',
        })

        expect(() =>
            registerUseCase.execute({
                name: 'John Doe',
                email,
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })

})