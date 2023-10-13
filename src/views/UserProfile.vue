<script setup>
import { computed, reactive, watch, ref } from 'vue';

const message = ref('');
const year = ref('');
const user = reactive({
      name: 'Mashud Karim',
      profileImage: '/user.png',
      birthdate: '2002-01-01',
      email: 'mashud@gmail.com',
      description: 'Vuejs batch one student',
}); 

const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onloadend = (e) => {
            user.profileImage = reader.result;
        };
        reader.readAsDataURL(file);
    }
  }

  const birthYear = computed(() => {
        if (user.birthdate) {
            const birthYear = new Date(user.birthdate).getFullYear();
            return birthYear;
        }
        return '';
  })

  const voterMessage = computed(() => {
        if (birthYear.value) {
            const age = new Date().getFullYear() - birthYear.value;
            if (age >= 18) {
                return 'You are eligible for voting';
            } else {
                return 'You are not eligible for voting';
            }
        }
        return '';
  })

  watch(birthYear, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        const age = new Date().getFullYear() - birthYear.value;
        year.value = birthYear
        if (age >= 18) {
            message.value = 'You are eligible for voting';
        } else {
            message.value = 'You are not eligible for voting';
        }
      }
  })


const saveChange = () => {
    console.log(user)
    alert('Successfully updated')
}

</script>

<template>
    <div class="container">
    <h3 class="pt-3">User Details</h3>

    <div class="row">
        <div class="col-3">
            <div style="height: 220px; width: 220px">
                <img :src="user.profileImage" class="img-thumbnail" alt="User Photo">
            </div>
            <div>
                <h5>Watcher Property Result</h5>
                <p>Birth Year: {{ year }}</p>
                <p>Message: {{ message }}</p>
            </div>
            <div>
                <h5>Computed Property Result</h5>
                <p>Birth Year: {{ birthYear }}</p>
                <p>{{ voterMessage }}</p>
            </div>

            <!-- <div>
                <h2>User Info</h2>
                <p>Name: {{ user.name }}</p>
                <p>Birthdate: {{ user.birthdate }}</p>
                <p>Email: {{ user.email }}</p>
                <p>Description: {{ user.description }}</p>
            </div> -->
        </div>
        <div class="col-9">
            <form @submit.prevent="saveChange">
                <div class="form-group mb-3">
                    <label for="name" class="form-label">Name:</label>
                    <input v-model="user.name" id="name" type="text"  class="form-control">
                </div>
                <div class="form-group mb-3">
                    <label for="profileImage" class="form-label">Profile Image:</label>
                    <input id="profileImage" type="file" class="form-control" accept="image/*" @change="handlePhotoUpload">
                </div>

                <div class="form-group mb-3">
                    <label for="birthdate" class="form-label">Birthdate:</label>
                    <input v-model="user.birthdate" id="birthdate" type="date"  class="form-control">
                </div>
                <div class="form-group mb-3">
                    <label for="email" class="form-label">Email:</label>
                    <input v-model="user.email" id="email" type="email"  class="form-control">
                </div>

                <div class="form-group mb-3">
                    <label for="description" class="form-label">Description:</label>
                    <textarea v-model="user.description" id="description"  class="form-control"></textarea>
                </div>
                <div class="form-group mb-3">
                    <button type="submit" class="btn btn-success">Save Change</button>
                </div>
                </form>
        </div>
    </div>
  </div>
</template>
