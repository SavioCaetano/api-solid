import request from 'supertest'
import { app } from '@/app'
import { test, describe, expect, beforeAll, afterAll } from "vitest"
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    test('it should be able to create a gym', async () => {
        const { token } = await createAndAuthenticateUser(app, true)

        const response = await request(app.server)
            .get('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Barra Gym',
                description: 'Some description',
                phone: '00999999999',
                latitude: -20.2993007,
                longitude: -45.5440955,
            })
        
        expect(response.statusCode).toEqual(201)
    })
})