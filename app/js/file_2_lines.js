function CreateLine(points){
    let lines = [],
    pointBackgroundColorS = [],
    pointBorderColorS = [];

    for(let i = 0; i < points.length; i++){

        let lines_tmp = [],
        pointBackgroundColorS_tmp = [],
        pointBorderColorS_tmp = [];

        points[i].forEach(
            (value) => {                
                if(value.checker == false){
                    pointBackgroundColorS_tmp.push('transparent');
                    pointBorderColorS_tmp.push('transparent');
                    lines_tmp.push(value.point);
                }
                else{
                    if(i == 0){
                        pointBackgroundColorS_tmp.push('rgb(98, 186, 240)');
                    }
                    else{
                        pointBackgroundColorS_tmp.push('rgb(170, 241, 58)');
                    }
                    pointBorderColorS_tmp.push('white');
                    lines_tmp.push(value.point);
                }
                
            }
        );

        lines.push(lines_tmp);
        pointBackgroundColorS.push(pointBackgroundColorS_tmp);
        pointBorderColorS.push(pointBorderColorS_tmp);
    }

    datasets = [];

    for(let i = 0; i < points.length; i++){

        let dataset = {
            label: "Info" + (i+1),
            data: lines[i],
            pointBackgroundColor: pointBackgroundColorS[i],
            pointBorderColor: pointBorderColorS[i],
            tension: 0.5,
        }
        
        if(i == 0){
            dataset.backgroundColor = 'rgb(98, 186, 240)';
            dataset.borderColor = 'rgb(98, 186, 240)';
        }
        else{
            dataset.backgroundColor = 'rgb(191, 203, 61)';
            dataset.borderColor = 'rgb(191, 203, 61)';
        }

        datasets.push(dataset);
    }

    const data = {
        labels: ["","","","","","","","","","","","","","","","","","","","","","","","","","",],
        datasets: datasets,
    };

    const options_l = {
        elements:{
            point:{
            radius: 6,
            borderWidth: 2,
            }
        },
        plugins:{
            tooltip: {
                yAlign: 'bottom',
                usePointStyle: true,
                cornerRadius: 15,
                padding:{
                    top: 7,
                    bottom: 7,
                    left:15,
                    right:15,
                },
                callbacks:{
                    label: function(item, data){
                        return "    " + String(item.raw);
                    },
                },
                filter: function(item, data){
                   return item.element.options.borderColor === 'white';
                },
            },
            responsive: true,

            legend:{
                position: 'bottom',
                align: "start",
                labels:{
                    padding:50,
                    color: 'rgb(163, 174, 200)',
                    boxWidth:12,
                },
                padding: {
                    left: 100
                },
            },
        },
        scales : {
            y:{
                max:40,
                min:0,
                ticks:{
                    stepSize: 10,
                    color:'rgb(163, 174, 200)',
                },
                grid:{
                    display: false,
                    borderWidth: 0,
                }
            },
            x:{
                grid:{
                    display: false,
                    borderWidth: 0,
                },
                ticks:{
                    color:'rgb(163, 174, 200)',
                    padding: 10,
                },
            }
        }
    };
    
    const subLabels ={
        id: 'subLabels',
        afterDatasetsDraw(chart, args, pluginOptions) {
            const { ctx, chartArea: {left, right, top, bottom, width, height} } = chart;
            ctx.save();
    
            subLabelText("Oct 14-20", width/5*1 - 70);
            subLabelText("Oct 21-27", width/5*2 - 50);
            subLabelText("Oct 28-3", width/5*3 - 30);
            subLabelText("Nov 4-10", width/5*4 - 10);
    
            function subLabelText(text, x){
                ctx.fillStyle = 'rgb(163, 174, 200)';
                ctx.fillText(text, x + left, bottom + 30);
            };
        }
    }

    const config3 = {
        type: 'line',
        data: data,
        options: options_l,
        plugins: [subLabels],
    };

    const chart = new Chart( document.getElementById('myChart3'), config3);
}

$.ajax({
    method: "GET",
    url: 'http://localhost:3000/Charts',
    success: function(data){
        CreateLine(data);
    },
});