/* import mysql from 'mysql2/promise';
import { test } from '../customFixtures/expertusFixture';

export default class DB {
    private DBConfig: mysql.ConnectionOptions = {
        host: "mysql-qa-testing-master-ncus.mysql.database.azure.com",
        user: "qaadmin",
        database: "universal_profile",
        password: "1wR?cHeQe_",
        port: 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    };

    async executeQuery(query: string): Promise<any[]> {
        const connection = await mysql.createConnection(this.DBConfig);
        //console.log(connection);
        try {
            const [rows] = await connection.execute(query) as [any[], any];
            return rows;
        } catch (error) {
            console.error("Error in connection/executing query:", error);
            throw error;
        } finally {
            await connection.end().catch((error) => {
                console.error("Error ending connection:", error);
            });
        }
    }
}


test('fetch data from database', async () => {
    const dataBase = new DB();
    try {
        const sample = await dataBase.executeQuery("SHOW GRANTS FOR 'qaadmin'@'%';");
        console.log(sample);
    } catch (error) {
        console.log("Not executed " + error);
    }
});
 */
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://chatgpt.com/c/66ecfeca-b72c-8011-a313-1ee27595383c');
    await page.waitForTimeout(10000)
    await page.locator('##prompt-textarea p').focus();
    await page.keyboard.type("WHo is this", { delay: 200 })
    await page.waitForTimeout(3000)
    await page.click('button[aria-label="Send prompt"]')
})