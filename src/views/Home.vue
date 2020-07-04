<template>
  <div>
    <section class="section section-shaped section-lg my-0">
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

    <div class="container">
      <card class="border-0">
        <h6 class="text-info text-uppercase">Formulario de Registro</h6>
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
                label="Nombre"
                type="text"
                placeholder="Nombre"
                name="first_name"
                required
                v-model="user.first_name"
              ></base-input>
            </div>

            <div class="col">
              <base-input
                label="Apellido"
                type="text"
                placeholder="Apellido"
                name="last_name"
                required
                v-model="user.last_name"
              ></base-input>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <base-input required label="Tipo de Documento">
                <el-select
                  style="width: -webkit-fill-available;"
                  label="Tipo de documento"
                  collapse-tags
                  size="large"
                  required
                  placeholder="Ingrese el tipo de Documento"
                  v-model="user.document_type"
                >
                  <el-option
                    v-for="option in document_types"
                    class="select-primary"
                    :value="option.type"
                    :label="option.type"
                    :key="option.type"
                  ></el-option>
                </el-select>
              </base-input>
            </div>
            <div class="col">
              <base-input
                label="Documento de identidad"
                type="number"
                placeholder="Documento"
                name="document_number"
                required
                v-model="user.document_number"
              ></base-input>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <base-input label="Fecha de Nacimiento" type="date" name="birthdate" required>
                <el-date-picker
                  style="width: -webkit-fill-available;"
                  v-model="user.birthdate"
                  type="date"
                  format="dd/MM/yyyy"
                  placeholder="Selecciona una fecha de nacimiento"
                ></el-date-picker>
              </base-input>
            </div>
          </div>

          <div class="row" v-if="userType === 'health'">
            <div class="col">
              <base-input
                label="Numero Tarjeta profesional"
                type="number"
                placeholder="Numero Tarjeta profesional"
                name="professionalCardNumber"
                required
                v-model="user.professional_card_number"
              ></base-input>
            </div>

            <div class="col">
              <base-input
                label="Area de la Salud"
                type="text"
                placeholder="Area de la Salud"
                name="healtArea"
                required
              >
                <el-select
                  v-model="user.health_area"
                  size="large"
                  placeholder="Seleccionar"
                  style="width: -webkit-fill-available;"
                >
                  <el-option
                    v-for="item in areas"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </base-input>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <base-input
                label="Correo Electronico"
                type="text"
                placeholder="Correo"
                name="email"
                required
                v-model="user.email"
              ></base-input>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <base-input
                label="Contraseña"
                type="password"
                name="password"
                required
                v-model="user.password"
              ></base-input>
            </div>

            <div class="col">
              <base-input
                label="Confirmar Contraseña"
                type="password"
                name="confirm_password"
                required
                v-model="confirmation_password"
              ></base-input>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <base-input label="Género" required name="gender">
                <el-select
                  style="width: -webkit-fill-available;"
                  size="large"
                  required
                  placeholder="Género"
                  v-model="user.gender"
                >
                  <el-option
                    v-for="option in genders"
                    :value="option.type"
                    :label="option.type"
                    :key="option.type"
                  ></el-option>
                </el-select>
              </base-input>
            </div>
            <div class="col">
              <base-input
                label="Número telefónico"
                type="number"
                name="phone_number"
                v-model="user.phone_number"
              ></base-input>
            </div>
          </div>

          <base-input required label="Breve Descripción">
            <textarea
              class="form-control"
              id="description"
              rows="3"
              label="Breve Descripción"
              placeholder="Haz una breve descripción tuya"
              v-model="user.description"
            ></textarea>
          </base-input>
          <div class="row">
            <div class="col"></div>
          </div>
        </form>
        <base-button type="info" @click="checkForm">Registrarme</base-button>
      </card>
    </div>


  </section>
  </div>
</template>

<script>
import { Select, Option } from "element-ui";
import Modal from "@/components/Modal";

import axios from "../plugins/axios";
export default {
  components: {
    Modal,
    [Option.name]: Option,
    [Select.name]: Select
  },

  
  data() {
    return {
      modalShow: false,
      messageRegister: "",
      user: {
        first_name: "",
        last_name: "",
        gender: "",
        document_type: "",
        document_number: "",
        professional_card_number: "",
        email: "",
        password: "",
        phone_number: "",
        description: "",
        health_area: "",
        birthdate: ""
      },
      
      errors: []
    };
  },
  created() {},

  methods: {
    goLogin() {
      this.$router.push("/login");
    },
    register() {
      if (this.userType == "normal") {
        axios.post("/users/normalUser", this.user).then(response => {
          if (response.status == 200) {
            this.messageRegister =
              "El usuario con el emial " +
              this.email +
              " ha sido creado correctamente. Ya puede iniciar sesión.";
            this.modalShow = true;
          }
        });
      } else if (this.userType == "health") {
        axios
          .post("/users/healthProfessional", this.user)
          .then(response => {
            if (response.status == 200) {
              this.messageRegister =
                "El usuario con el emial " +
                this.email +
                " ha sido creado correctamente. Ya puede iniciar sesión.";
              this.modalShow = true;
            }
          });
      }
    },

    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    checkForm: function(e) {
      if (this.name && this.age) {
        return true;
      }

      this.errors = [];

      if (!this.user.first_name) {
        this.errors.push("Nombre requerido");
      }
      if (!this.user.last_name) {
        this.errors.push("Apellido requerido.");
      }
      if (!this.user.document_type) {
        this.errors.push("Tipo de Documento Requerido");
      }
      if (!this.user.document_number) {
        this.errors.push("Número de documento requerido");
      }
      if (!this.user.password) {
        this.errors.push("Contraseña requerida");
      }
      if (!this.user.birthdate) {
        this.errors.push("Fecha de nacimiento Requerida");
      }
      if (!this.user.email) {
        this.errors.push("Correo Requerido");
      } else if (!this.validEmail(this.user.email)) {
        this.errors.push("El correo electrónico no es válido");
      }
      if (this.user.password != this.confirmation_password) {
        this.errors.push("Las contraseñas no coinciden");
      }

      if (this.userType == "health") {
        if (!this.user.professional_card_number) {
          this.errors.push("Número de tarjeta profesional Requerida");
        }

        if (!this.user.health_area) {
          this.errors.push("Área de salud requerida");
        }
      }

      if (!this.errors.length) {
        this.register();
      }

      e.preventDefault();
    }
  }
};
</script>
