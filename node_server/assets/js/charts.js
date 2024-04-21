import Chart from "../../node_server/chart.js/auto";

(async function () {
    const data = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
    ];

    const data2 = [
        { year: 2010, count: 120 },
        { year: 2011, count: 10 },
        { year: 2012, count: 50 },
        { year: 2013, count: 35 },
        { year: 2014, count: 12 },
        { year: 2015, count: 40 },
        { year: 2016, count: 18 },
    ];

    new Chart(document.getElementById("chart"), {
        type: "line",
        data: {
            labels: data.map((row) => row.year),
            datasets: [
                {
                    label: "Acquisitions by year",
                    data: data.map((row) => row.count),
                },
                {
                    label: "Acquisitions by year2",
                    data: data2.map((row) => row.count),
                }
            ],
            
        },
    });
})();
