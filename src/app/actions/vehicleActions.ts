import { neon } from '@neondatabase/serverless';

const sql = neon('postgresql://neondb_owner:npg_2w1GgOTDpfqu@ep-shrill-smoke-a15rtbrx-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

export async function getVehicles() {
    try {
        const  rows  = await sql`SELECT * FROM vehicles`;
        return rows;
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        throw new Error('Failed to fetch vehicles');
    }
}