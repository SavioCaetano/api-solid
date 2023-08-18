import request from 'supertest'
import { app } from '@/app'
import { test, describe, expect, beforeAll, afterAll } from "vitest"
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create Check-in (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    test('it should be able to create a check-in', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const gym = await prisma.gym.create({
            data: {
                title: 'New Gym',
                latitude: -20.2993007,
                longitude: -45.5440955,
            }
        })
        
        const response = await request(app.server)
            .get(`/gyms/${gym.id}/check-ins`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                latitude: -20.2993007,
                longitude: -45.5440955,
            })
        
        expect(response.statusCode).toEqual(201)
    })
})