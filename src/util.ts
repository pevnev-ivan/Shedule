import dayjs from "dayjs";

export type MonthType = ReturnType<typeof getMonth>

export const getMonth = (month = dayjs().month()) => {
    const year = dayjs().year()
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day()
    let currentMonthCount = 0 - firstDayOfTheMonth

    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
                currentMonthCount++
            return dayjs(new Date(year, month, currentMonthCount))
        })
    })

return daysMatrix
}