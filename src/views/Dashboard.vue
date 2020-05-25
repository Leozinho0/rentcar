<template>
  <v-container>
    <v-row>
      <v-col>
        <chart-bar
        v-if="loaded"
        :chartdata="chartdata"
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
          :chartdata="chartdata"
          :options="options"/>
      </v-col>
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
  	  chartdata: {
        labels: [],
        datasets: [{
            label: 'Quantidade de Profissionais por Profissão',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
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
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
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
        .get('/api/teste')
        .then(response => {
          this.chartdata.labels           = response.data.profissoes;
          this.chartdata.datasets[0].data = response.data.quantidades;
          this.total_profissionais        = response.data.total;

          console.log(response.data.quantidades);
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