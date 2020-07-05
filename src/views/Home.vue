<template>
  <div>
    <section class="section section-shaped section my-0">
      <div class="row" style="
    place-content: center;">
        <router-link slot="brand" class="navbar-brand" to="/">
          <img src="/white.png" alt="white" border="0" style="
          height: 120px;" />
        </router-link>
      </div>
      <div class="shape shape-style-1 bg-gradient-info">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span></span>
      <span></span>

      <div class="container">
        <card class="border-0">
          <h6 class="text-info text-uppercase">Información</h6>
          <form>
            <div class="row">
              <p v-if="errors.length">
                <base-alert v-for="error in errors" type="warning" :key="error">
                  <strong>Atención!</strong>
                  {{ error }}
                </base-alert>
              </p>
            </div>
            <div class="row">
              <div class="col">
                <base-input
                  label="Dominio"
                  type="text"
                  placeholder="Dominio"
                  name="dominio"
                  required
                  v-model="dominio"
                ></base-input>
              </div>

              <div class="col">
                <br />

                <el-button
                  type="primary"
                  @click="checkForm"
                  style="height: 58%;width: -webkit-fill-available;"
                  :loading="load"
                >Buscar</el-button>
              </div>
              <div class="col-md-4">
                <br />

                <base-button
                  type="success"
                  @click="getHistory"
                  style="height: 58%;width: -webkit-fill-available;"
                >Dominios ya buscados</base-button>
              </div>
            </div>
            <div class="row">
              <hr />

              <div class="col-md-8" v-if="show2==true">
                <div class="row">
                  <div class="col-md-2" v-if="info.logo != ''">
                    <img :src="info.logo" style="
                  height: 40px;" />
                  </div>
                 
                  <div class="col-md-6">
                    <h2 class="display-5">{{domain}}</h2>
                  </div>
                </div>
                <br>
                <div class="row">
                  <div class="col-md-2">
                    <h6 class="text-primary" style="text-align:right">Titulo:</h6>
                  </div>
                  <div class="col-md-10">
                    <h6>{{info.title}}</h6>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <h6 class="text-primary" style="text-align:right">Servidor caido?:</h6>
                  </div>
                  <div class="col-md-2">
                    <h6>{{info.is_down}}</h6>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <h6 class="text-primary" style="text-align:right">Ha cambiado el servidor?:</h6>
                  </div>
                  <div class="col-md-2">
                    <h6>{{info.servers_changed}}</h6>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <h6 class="text-primary" style="text-align:right">Grado SSL:</h6>
                  </div>
                  <div class="col-md-2">
                    <h6>{{info.ssl_grade}}</h6>
                  </div>
                </div>
                  <div  v-for="(server, index) in info.servers" :key="index">{{h}}</div>
                    

              </div>

              <div v-if="show==true" class="col-md-4">
                <h2 class="display-4">Historial</h2>
                <ul>
                  <li type="square" v-for="(h, index) in history" :key="index">{{h}}</li>
                </ul>
              </div>
            </div>
          </form>
        </card>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </section>
  </div>
</template>

<script>
import { Notification } from "element-ui";
import Modal from "@/components/Modal";

import axios from "../plugins/axios";
export default {
  components: {
    Modal
  },

  data() {
    return {
      show: false,
      show2: false,
      load: false,
      dominio: "",
      domain: "",
      serverInfo: {
        servers: [
          {
            address: "",
            ssl_grade: "",
            country: "",
            owner: ""
          }
        ],
        servers_changed: "",
        ssl_grade: "",
        previous_ssl_grade: "",
        logo: "",
        title: "",
        is_down: ""
      },
      info: {},
      history: [],
      errors: []
    };
  },
  created() {},

  methods: {
    goLogin() {
      this.$router.push("/login");
    },
    getInfoServer() {
      this.show2 = false;
      this.show = false;
      this.load = true;
      this.domain = this.dominio;
      axios
        .get("/serversInformation/" + this.dominio)
        .then(response => {
          console.log(response);

          this.serverInfo.servers_changed = response.data.servers_changed;
          this.serverInfo.ssl_grade = response.data.ssl_grade;
          this.serverInfo.previous_ssl_grade = response.data.previous_ssl_grade;
          this.serverInfo.logo = response.data.logo;
          this.serverInfo.title = response.data.title;
          this.serverInfo.is_down = response.data.is_down;
          response.data.servers.forEach(element => {
            let server = {
              address: element.address,
              ssl_grade: element.ssl_grade,
              country: element.country,
              owner: element.owner
            };
            this.serverInfo.servers.push(server);
          });

          this.show2 = true;
          this.load = false;
          this.info = this.serverInfo;
          console.log(this.serverInfo);
        })
        .catch(error => {
          this.load = false;
          this.$notify.error({
            type: "Error",
            title: "Error",
            message: error.message
          });
          console.log(JSON.stringify(error));
        });
    },
    getHistory() {
      this.show = true;
      this.history = [];

      axios
        .get("/history")
        .then(response => {
          response.data.items.forEach(element => {
            this.history.push(element.host);
          });
        })
        .catch(error => {
          this.$notify.error({
            type: "Error",
            title: "Error",
            message: error.message
          });
          console.log(JSON.stringify(error));
        });
    },
    checkForm: function(e) {
      this.errors = [];

      if (!this.dominio) {
        this.errors.push("Dominio requerido");
      }

      if (!this.errors.length) {
        this.getInfoServer();
      }

      e.preventDefault();
    }
  }
};
</script>

