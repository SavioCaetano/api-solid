import { expect, test, describe, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymsUseCase(gymsRepository)
    })
    
    test('user be able to search for gyms', async () => {
        await gymsRepository.create({
            title: 'JS Gym',
            latitude: -20.2993007,
            longitude: -45.5440955,
            description: null,
            phone: null
        })

        await gymsRepository.create({
            title: 'TS Gym',
            latitude: -20.2993007,
            longitude: -45.5440955,
            description: null,
            phone: null
        })
        
        const { gyms } = await sut.execute({
            query: 'TS',
            page: 1,
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title:  'TS Gym' })
        ])
    })

    test('user be able to fetch paginated gyms search', async () => {
        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                title: `JS Gym ${i}`,
                latitude: -20.2993007,
                longitude: -45.5440955,
                description: null,
                phone: null
            })
        }

        const { gyms } = await sut.execute({
            query: 'JS',
            page: 2,
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title:  'JS Gym 21' }),
            expect.objectContaining({ title:  'JS Gym 22' }),
        ])
    })

})