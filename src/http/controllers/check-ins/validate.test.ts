import request from 'supertest'
import { app } from '@/app'
import { test, describe, expect, beforeAll, afterAll } from "vitest"
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Validate Check-in (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    test('it should be able to validate a check-in', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const gym = await prisma.gym.create({
            data: {
                title: 'New Gym',
                latitude: -20.2993007,
                longitude: -45.5440955,
            }
        })

        let checkIn = await prisma.checkIn.create({
            data: {
                gym_Id: gym.id,
                user_Id: user.id
            }
        })
        
        const response = await request(app.server)
            .patch(`/check-ins/${checkIn.id}/validate`)
            .set('Authorization', `Bearer ${token}`)
            .send()
        
        expect(response.statusCode).toEqual(204)

        checkIn = await prisma.checkIn.findUniqueOrThrow({
            where: {
                id: checkIn.id,
            }
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
    })
})