import { expect, test, describe, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(gymsRepository)
    })
    
    test('user be able to create gym', async () => {
        const { gym } = await sut.execute({
            title: 'JS Gym',
            latitude: -20.2993007,
            longitude: -45.5440955,
            description: null,
            phone: null
        })

        expect(gym.id).toEqual(expect.any(String))
    })
    
})