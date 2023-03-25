const generalStatsTr = document.getElementById('general-stats')
const tbodyEvents = document.getElementById('tbody')

let eventsArray
let currentDate

function newTableTitle(id, text) {
    let tr = id.insertRow(-1)
    tr.colSpan = 3
    let th = document.createElement('th')
    th.textContent = text
    tr.appendChild(th)
}

function staticTrsTds(id) {
    let tr = id.insertRow(-1)
    let td1 = document.createElement('td')
    let td2 = document.createElement('td')
    let td3 = document.createElement('td')
    td1.textContent = 'Categories'
    td2.textContent = 'Revenues'
    td3.textContent = 'Percentage of attendance'
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    id.appendChild(tr)
}

function removeDuplicates(array) {
    return array.filter((item,
        index) => array.indexOf(item) === index);
}

function eventsStats(array) {
    const attendance = array.filter(element => element.assistance !== undefined)
    const arrayAttendance = attendance.map(element => Number(element.assistance))
    const highestAttendance = Math.max(...arrayAttendance)
    const highestAttendanceEvent = array.filter(element => element.assistance == highestAttendance && Date.parse(element.date) < currentDate)
    const highestAttendancePercent = highestAttendanceEvent[0].assistance / highestAttendanceEvent[0].capacity * 100

    const lowestAttendance = Math.min(...arrayAttendance)
    const lowestAttendanceEvent = array.filter(element => element.assistance == lowestAttendance && Date.parse(element.date) < currentDate)
    const lowestAttendancePercent = lowestAttendanceEvent[0].assistance / lowestAttendanceEvent[0].capacity * 100

    const capacity = array.map(element => element.capacity)
    const largestCapacity = Math.max(...capacity)
    const largestCapacityEvent = array.filter(element => element.capacity == largestCapacity && Date.parse(element.date) < currentDate)

    let tdEventsStatsContent = `<td>${highestAttendanceEvent[0].name} (${(highestAttendancePercent).toFixed(2)}%)</td>
                                <td>${lowestAttendanceEvent[0].name} (${(lowestAttendancePercent).toFixed(2)}%)</td>
                                <td>${largestCapacityEvent[0].name} (${largestCapacity})</td>`

    return generalStatsTr.innerHTML = tdEventsStatsContent
}

function upcomingEventsStats(array) {
    let upcomingEvents = array.filter(element => Date.parse(element.date) > currentDate)
    let categories = removeDuplicates(upcomingEvents.map(element => element.category))

    const revenuesArray = Object.values(upcomingEvents.reduce((acc, event) => {
        if (!acc[event.category]) {
            acc[event.category] = 0;
        }
        acc[event.category] += event.price * event.estimate;
        return acc
    }, {}));

    const groupedPercentages = upcomingEvents.reduce((acc, event) => {
        const category = event.category;
        const percentage = (event.estimate / event.capacity) * 100;
        if (!acc[category]) {
            acc[category] = {
                total: 0,
                count: 0,
            };
        }
        acc[category].total += percentage;
        acc[category].count += 1;
        return acc;
    }, {});

    const averages = [];
    for (const category in groupedPercentages) {
        const average = groupedPercentages[category].total / groupedPercentages[category].count;
        averages.push(average.toFixed(2));
    }

    newTableTitle(tbodyEvents, 'Upcoming events statistics by category')
    staticTrsTds(tbodyEvents)

    categories.forEach((category, index) => {
        const tr = tbodyEvents.insertRow(-1);
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');
        const cell3 = document.createElement('td');

        cell1.textContent = category;
        cell2.textContent = '$' + revenuesArray[index];
        cell3.textContent = '(' + averages[index] + '%)';

        tr.appendChild(cell1)
        tr.appendChild(cell2)
        tr.appendChild(cell3)

        tbodyEvents.appendChild(tr);
    });
}

function pastEventsStats(array) {
    let pastEvents = array.filter(element => Date.parse(element.date) < currentDate)
    let categories = removeDuplicates(pastEvents.map(element => element.category))

    const revenuesArray = Object.values(pastEvents.reduce((acc, event) => {
        if (!acc[event.category]) {
            acc[event.category] = 0;
        }
        acc[event.category] += event.price * event.assistance;
        return acc
    }, {}));

    const groupedPercentages = pastEvents.reduce((acc, event) => {
        const category = event.category;
        const percentage = (event.assistance / event.capacity) * 100;
        if (!acc[category]) {
            acc[category] = {
                total: 0,
                count: 0,
            };
        }
        acc[category].total += percentage;
        acc[category].count += 1;
        return acc;
    }, {});

    const averages = [];
    for (const category in groupedPercentages) {
        const average = groupedPercentages[category].total / groupedPercentages[category].count;
        averages.push(average.toFixed(2));
    }

    newTableTitle(tbodyEvents, 'Past events statistics by category')
    staticTrsTds(tbodyEvents)

    categories.forEach((category, index) => {
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');
        const cell3 = document.createElement('td');

        cell1.textContent = category;
        cell2.textContent = '$' + revenuesArray[index];
        cell3.textContent = '(' + averages[index] + '%)';

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);

        tbodyEvents.appendChild(row);
    });
}


async function obtainData() {
    try {
        data = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
            .then(data => data.json())
            .then(data => {
                return data
            })
    }

    catch (error) {
        data = await fetch('./scripts/amazing.json')
            .then(data => data.json())
            .then(data => {
                return data
            })
    }
    eventsArray = data.events
    currentDate = Date.parse(data.currentDate)
    return data
}

async function init() {
    await obtainData()
    eventsStats(eventsArray)
    upcomingEventsStats(eventsArray)
    pastEventsStats(eventsArray)
}

init()