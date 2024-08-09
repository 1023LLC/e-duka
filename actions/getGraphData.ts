import moment from "moment";
import prisma from "@/libs/prismadb";


export default async function getGraphData(){
    try{
        // Get the start and the end dates for the data range (7 days ago to today)
        const startDate = moment().subtract(6, "days").startOf("day");
        const endDate = moment().endOf("day");


        //Query the database to get the order data grouped by createdDate
        const result = await prisma.order.groupBy({
            by: ["createDate"],
            where: {
                createDate: {
                    gte: startDate.toISOString(),
                    lte: endDate.toISOString(),
                },
                status: "complete",
            },
            _sum: {
                amount: true
            }
        })

        // Initialize an object to aggregate the data by day
        const aggregatedData: {
            [day: string]: { day: string; date: string; totalAmount: number }
        } = {};

        // Create a clone of the start date to iterate over each day
        const currentDate = startDate.clone();

        // Iterate over each day in the date range
        while (currentDate <= endDate){
            //Format the day as a string (e.g. "Monday")
            const day = currentDate.format("dddd")
            console.log("day<<<", day, currentDate)

            // initialize the aggregated data for the day with the day, date, and totalAmount
            aggregatedData[day] = {
                day,
                date: currentDate.format("YYYY-MM-DD"),
                totalAmount: 0
            };

            //Move to the next day
            currentDate.add(1, "day");
        }

        // Calculate the total amount for each day by summing the order amounts
        result.forEach((entry) => {
            const day = moment(entry.createDate).format("dddd")
            const amount = entry._sum.amount || 0;
            aggregatedData[day].totalAmount += amount
        });

        // Convert the aggregatedData object to an array and start it by date
        const formattedData = Object.values(aggregatedData).sort((a, b) =>
            moment(a.date).diff(moment(b.date))
        );


        // Return the formatted data
        return formattedData;
    
    } catch (error: any){
        throw new Error(error)
    }
}