import { neon } from '@neondatabase/serverless';

const sql = neon('postgresql://neondb_owner:npg_2w1GgOTDpfqu@ep-shrill-smoke-a15rtbrx-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
   
export async function simulateFugitiveLocation() {
    const rows = await sql`SELECT id FROM cities ORDER BY RANDOM() LIMIT 1`;
    console.log(rows[0].id,'rowsrowsrows')
    return rows[0].id;
}

export async function checkCapture(fugitiveLocationId: number, copSelections: { cop1City: number; cop2City: number; cop3City: number; cop1Vehicle: number; cop2Vehicle: number; cop3Vehicle: number }) {
    const { cop1City, cop2City, cop3City, cop1Vehicle, cop2Vehicle, cop3Vehicle } = copSelections;
    const  cities = await sql`SELECT id, distance FROM cities`;
    const  vehicles  = await sql`SELECT id, range FROM vehicles`;
    console.log(cities,vehicles,fugitiveLocationId,cop1City,cop2City,cop3City,'cities')

    const cops = [
        { name: 'Cop 1', cityId: cop1City, vehicleId: cop1Vehicle },
        { name: 'Cop 2', cityId: cop2City, vehicleId: cop2Vehicle },
        { name: 'Cop 3', cityId: cop3City, vehicleId: cop3Vehicle },
    ];

    for (const cop of cops) {
        const city = cities.find(c => c.id === cop.cityId);
        const vehicle = vehicles.find(v => v.id === cop.vehicleId);

        if (city && vehicle && cop.cityId === fugitiveLocationId && vehicle.range >= city.distance * 2) {
            return { success: true, copName: cop.name };
        }
    }

    return { success: false, copName: '' };
}