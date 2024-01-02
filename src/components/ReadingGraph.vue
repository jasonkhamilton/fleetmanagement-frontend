<template>
    <div>
        <canvas ref="myChart"></canvas>
    </div>
</template>
<script>
    import Line from 'vue-chartjs';

    export default {
        extends: Line,
        mounted () {
            // The 'myChart' canvas element reference
            this.renderChart(
                {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: [40, 20, 30, 50, 60, 30, 70],
                    },
                ],
                },
                { responsive: true, maintainAspectRatio: false }
            );
        }
    }
</script>