import request from 'supertest'
import { app } from '@/app'
import { test, describe, expect, beforeAll, afterAll } from "vitest"
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gyms (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    test('it should be able search gyms by title', async () => {
        const { token } = await createAndAuthenticateUser(app)

        await request(app.server)
            .get('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Barra Gym',
                description: 'Some description',
                phone: '00999999999',
                latitude: -20.2993007,
                longitude: -45.5440955,
        })

        await request(app.server)
            .get('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'GT Gym',
                description: 'Some description',
                phone: '00999999999',
                latitude: -20.2993007,
                longitude: -45.5440955,
        })
        
        const response = await request(app.server)
            .get('/gyms/search')
            .query({
                q: 'Barra',
            })
            .set('Authorization', `Bearer ${token}`)
            .send()
        
        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'Barra Gym',
            })
        ])
    })
})