import { expect, test, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new FetchNearbyGymsUseCase(gymsRepository)
    })
    
    test('user be able to fetch nearby gyms', async () => {
        await gymsRepository.create({
            title: 'Near Gym',
            latitude: -20.2993007,
            longitude: -45.5440955,
            description: null,
            phone: null
        })

        await gymsRepository.create({
            title: 'Far Gym',
            latitude: -27.0610928,
            longitude: -49.5229501,
            description: null,
            phone: null
        })
        
        const { gyms } = await sut.execute({
            userLatitude: -20.2993007,
            userLongitude: -45.5440955
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title:  'Near Gym' })
        ])
    })

})