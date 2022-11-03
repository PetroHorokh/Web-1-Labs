//setup block
const data1 = {
    datasets: [{
        data: [32, 68],
        backgroundColor: [
            'rgb(234, 242, 249)','rgb(92, 174, 225)'
        ],
        borderWidth: 1,
        weight: 1,
        cutout: '90%',
        borderRadius: 20,
    }]
};

const data2 = {
    datasets: [{
        data: [61, 39],
        backgroundColor: [
            'rgb(234, 242, 249)','rgb(205, 217, 69)'
        ],
        borderWidth: 1,
        weight: 1,
        cutout: '90%',
        borderRadius: 20,
    }]
};

//options block
const options_d = {
    tooltips: {enabled: false},
    hover: {mode: null},
    events: [],
    maintainAspectRatio: false,
};

//plugin block
const counter1 = {
    id: 'counter1',
    beforeDraw ( chart, args, options ) {
        const { ctx, chartArea: { top, right, bottom, left, width, height }  } = chart;
        ctx.save();
        ctx.fillStyle = 'rgb(90, 99, 120)';
        ctx.font = '25px sans-serif';
        ctx.fillText('68%', 25, 80);
    }
};

const counter2 = {
    id: 'counter2',
    beforeDraw ( chart, args, options ) {
        const { ctx, chartArea: { top, right, bottom, left, width, height }  } = chart;
        ctx.save();
        ctx.fillStyle = 'rgb(90, 99, 120)';
        ctx.font = '25px sans-serif';
        ctx.fillText('39%', 25, 80);
    }
};

//config block
const config1 = {
    type: 'doughnut',
    data: data1,
    options: options_d,
    plugins: [counter1]
};

const config2 = {
    type: 'doughnut',
    data: data2,
    options: options_d,
    plugins: [counter2]
};