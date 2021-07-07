//Endpoint Testing
import app from '../index';
import supertest from 'supertest'

const request = supertest(app);

    describe('Test endpoint responses', () => {
        
        it('returns 200 on a valid request', async () => {
            const response = await request.get(
                '/convert?image=icelandwaterfall&width=250&height=250'
            );
            expect(response.status).toBe(200);
        });


        it('returns 400 on an incomplete request', async () => {
            const response = await request.get(
                '/convert?image=iceldandwaterfall&width=&height='
            );
            expect(response.status).toBe(400);
        });
        
});