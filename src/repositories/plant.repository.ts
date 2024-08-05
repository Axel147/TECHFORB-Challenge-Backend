import { Plant } from "../models/plant.model";
import { pool } from "../config/db";

export class PlantRepository {

    findPlants = async () => {
        try{
            const res = await pool.query(`SELECT name, readings, country, mediumalerts, redAlerts, disableSensors FROM "challenge"."plant" WHERE valid = true`);
            //const res = await pool.query(`SELECT name, readings, country, mediumalerts, redAlerts, disableSensors FROM "challenge"."plant"`);
            return res.rows;
        }catch(error){
            return error;
        }
    };

    findById = async (id: Number) => {
        try{
            const res = await pool.query(`SELECT id, name, readings, country, mediumalerts, redAlerts, disableSensors FROM "challenge"."plant" WHERE valid = true and id = $1`, id );
            return res.rows;
        }catch(error){
            return error;
        }
    };

    totalCount = async (field: string) => {
        try{
            const suma = await pool.query(`SELECT SUM(${field}) as total FROM "challenge"."plant" WHERE valid = true`);
            return suma;
        } catch(error){
            return error;
        }
    };

    createPlant = async (plant: Plant) => {
        try {
            const res = await pool.query(
            'INSERT INTO "challenge"."plant" (name, readings, country, mediumalerts, redAlerts, disableSensors, valid) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [plant.name, plant.readings, plant.country, plant.mediumAlerts, plant.redAlerts, plant.disableSensors, plant.valid]);
            return res.rows[0];
        }catch(error){
            return error;
        }
    };

    deletePlant = async (plant: Plant) => {
        try {
            const res = await pool.query(
                `DELETE FROM "challenge"."plant" WHERE id = $1`, [plant.id]);
            return res.json({message: 'Plant deleted'});
        }catch(error){
            return error;
        }
    };

    deletePlant2 = async (plant: Plant) => {
        try {
            const res = await pool.query(
                `UPDATE "challenge"."plant" SET valid WHERE id = $1`, [plant.id]);
            return res.json({message: 'Plant deleted'});
        }catch(error){
            return error;
        }
    };

    closeConexion = async () => {
        try {
            await pool.end();
        } catch (error) {
            return error;
        }
    }

}
