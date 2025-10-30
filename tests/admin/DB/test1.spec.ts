import DB from "../../../utils/dbUtil";
import { test } from "../../../customFixtures/expertusFixture"
import { format, addMinutes, addDays, subDays } from 'date-fns';


test('fetch data from database', async () => {
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `fetch data from database` },
        { type: `Test Description`, description: `Database` }
    );
    const dataBase = new DB();
    try {
        const currentTimeResult = await dataBase.executeQuery("SELECT NOW()");
        const currentTimeString = currentTimeResult[0]['NOW()'];
        const currentTime = new Date(currentTimeString);
        const pastDate = currentTime.setDate(currentTime.getDate() - 5);
        const formattedPreviousDate = format(pastDate, 'yyyy-MM-dd HH:mm:ss');
        console.log(formattedPreviousDate);
        const newTime = new Date(currentTime.getTime() - 15 * 60 * 1000);
        const formattedNewTime = format(newTime, 'yyyy-MM-dd HH:mm:ss');
        console.log('Formatted New Time (15 mins subtracted):', formattedNewTime);
    } catch (error) {
        console.log("Not executed " + error);
    }
});


