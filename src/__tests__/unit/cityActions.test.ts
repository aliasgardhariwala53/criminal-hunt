import { getCities } from '../../app/actions/cityActions';

describe('getCities', () => {
    it('should fetch cities from the database', async () => {
        const cities = await getCities();
        expect(cities).toBeDefined();
        expect(cities.length).toBeGreaterThan(0);
        expect(cities[0]).toHaveProperty('id');
        expect(cities[0]).toHaveProperty('name');
        expect(cities[0]).toHaveProperty('distance');
    });
});