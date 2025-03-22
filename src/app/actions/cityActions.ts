import { neon } from '@neondatabase/serverless';

const sql = neon('postgresql://neondb_owner:npg_2w1GgOTDpfqu@ep-shrill-smoke-a15rtbrx-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

export async function getCities() {
    try {
        const  rows  = await sql`SELECT * FROM cities`;
        return rows;
    } catch (error) {
        console.error('Error fetching cities:', error);
        throw new Error('Failed to fetch cities');
    }
}