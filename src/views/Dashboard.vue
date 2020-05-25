<template>
  <v-container>
    <v-row>
      <v-col>
        <chart-bar
        v-if="loaded"
        :chartdata="chartdata_bar"
        :options="options"/>
      </v-col>
      <v-col>
        <v-card
          class="mx-auto"
          max-width="344"
          outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                Profissionais - Total
              </v-list-item-title>
              <v-list-item-subtitle>
                Quantidade de Profissionais Cadastrados
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar
              size="80"
              color="red">
              {{ total_profissionais }}
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <chart-pie
          v-if="loaded"
          :chartdata="chartdata_pie"/>
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script>
import ChartBar from '@/components/charts/Chart_bar.vue'
import ChartPie from '@/components/charts/Chart_pie.vue'

export default {
  name: 'Dashboard',
  components: { ChartBar, ChartPie },
  data: function(){
  	return {
      total_profissionais: 0,
      loaded: false,
      chartdata_pie: {
        labels: [],
        datasets: [{
          data: [],
            backgroundColor: [
              'rgba(255, 20, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(72, 125, 64, 0.2)',
              'rgba(255, 125, 64, 0.2)',
              'rgba(11, 134, 80, 0.2)',
              'rgba(55, 134, 80, 0.2)',
              'rgba(100, 99, 80, 0.2)',
              'rgba(253, 20, 110, 0.2)',
              'rgba(253, 20, 110, 0.2)',
              'rgba(253, 20, 150, 0.2)',
              'rgba(213, 200, 190, 0.2)',
              'rgba(155, 200, 190, 0.2)',
              'rgba(155, 155, 10, 0.2)',
              'rgba(155, 55, 10, 0.2)',
              'rgba(55, 55, 10, 0.2)',
              'rgba(136, 96, 100, 0.2)',
              'rgba(20, 10, 100, 0.2)',
              'rgba(20, 189, 100, 0.2)',
              'rgba(20, 189, 180, 0.2)',
              'rgba(20, 223, 220, 0.2)',
              'rgba(220, 23, 22, 0.2)',
              'rgba(12, 230, 22, 0.2)',
              'rgba(12, 230, 114, 0.2)',
            ],
            BorderColor: [
              'rgba(255, 20, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(72, 125, 64, 1)',
              'rgba(255, 125, 64, 1)',
              'rgba(11, 134, 80, 1)',
              'rgba(55, 134, 80, 1)',
              'rgba(100, 99, 80, 1)',
              'rgba(253, 20, 110, 1)',
              'rgba(253, 20, 110, 1)',
              'rgba(253, 20, 150, 1)',
              'rgba(213, 200, 190, 1)',
              'rgba(155, 200, 190, 1)',
              'rgba(155, 155, 10, 1)',
              'rgba(155, 55, 10, 1)',
              'rgba(55, 55, 10, 1)',
              'rgba(136, 96, 100, 1)',
              'rgba(20, 10, 100, 1)',
              'rgba(20, 189, 100, 1)',
              'rgba(20, 189, 180, 1)',
              'rgba(20, 223, 220, 1)',
              'rgba(220, 23, 22, 1)',
              'rgba(12, 230, 22, 1)',
              'rgba(12, 230, 114, 1)',
            ],
            borderWidth: 1
        }]
      },
  	  chartdata_bar: {
        labels: [],
        datasets: [{
          label: 'Quantidade de Profissionais por Profissão',
          data: [],
          backgroundColor: [
            'rgba(255, 20, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(72, 125, 64, 0.2)',
            'rgba(255, 125, 64, 0.2)',
            'rgba(11, 134, 80, 0.2)',
            'rgba(55, 134, 80, 0.2)',
            'rgba(100, 99, 80, 0.2)',
            'rgba(253, 20, 110, 0.2)',
            'rgba(253, 20, 110, 0.2)',
            'rgba(253, 20, 150, 0.2)'
          ],
          borderColor: [
            'rgba(255, 20, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(72, 125, 64, 0.6)',
            'rgba(255, 125, 64, 0.6)',
            'rgba(11, 134, 80, 0.6)',
            'rgba(55, 134, 80, 0.6)',
            'rgba(100, 99, 80, 0.6)',
            'rgba(253, 20, 110, 0.6)',
            'rgba(253, 20, 110, 0.6)',
            'rgba(253, 20, 150, 0.6)'
          ],
            borderWidth: 1
        }]
      },
  	  options: {
  	  	scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
  	  }
  	}
  },
  methods: {
  	initialize(){
      this.$http
        .get('/api/get_chart')
        .then(response => {
          //Bar
          this.chartdata_bar.labels           = response.data.profissoes;
          this.chartdata_bar.datasets[0].data = response.data.quantidades;
          this.total_profissionais            = response.data.total;

          //Pie
          this.chartdata_pie.labels           = response.data.estados;
          this.chartdata_pie.datasets[0].data = response.data.quantidade_estados;

          //console.log(response.data.quantidades);
          this.loaded = true;
        }).catch((error) => {
          alert('error ao conectar com api');
        });
    }
  },
  created(){
  	this.initialize();
  }
}
</script>