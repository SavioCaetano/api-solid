import request from 'supertest'
import { app } from '@/app'
import { test, describe, expect, beforeAll, afterAll } from "vitest"
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Check-in History (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    test('it should be able to list the history of check-ins', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()
        
        const gym = await prisma.gym.create({
            data: {
                title: 'New Gym',
                latitude: -20.2993007,
                longitude: -45.5440955,
            }
        })

        await prisma.checkIn.createMany({
            data: [
                {
                    gym_Id: gym.id,
                    user_Id: user.id
                },
                {
                    gym_Id: gym.id,
                    user_Id: user.id
                },
            ]
        })
        
        const response = await request(app.server)
            .get('/check-ins/history')
            .set('Authorization', `Bearer ${token}`)
            .send()
        
        expect(response.statusCode).toEqual(200)
        expect(response.body.checkIns).toEqual([
            expect.objectContaining({
                gym_Id: gym.id,
                user_Id: user.id
            }),
            expect.objectContaining({
                gym_Id: gym.id,
                user_Id: user.id
            }),
        ])
    })
})