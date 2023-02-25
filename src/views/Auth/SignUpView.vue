<template>
  <v-card class="mx-auto pa-6 ma-2" max-width="400">
    <v-card-title class="text-center">
      <h3 class="headline my-2">Sign Up</h3>
    </v-card-title>
    <v-form v-model="valid" lazy-validation @submit.prevent="onSubmit">
      <v-text-field label="Name" v-model="name" :rules="nameRules" required />
      <v-text-field label="Email" v-model="email" :rules="emailRules" required />
      <v-text-field
        label="Password"
        v-model="password"
        :rules="passwordRules"
        required
        type="password"
      />
      <v-text-field label="Phone Number" v-model="phoneNumber" :rules="phoneNumberRules" required />
      <v-text-field
        label="Date of Birth"
        v-model="dateOfBirth"
        :rules="dateOfBirthRules"
        required
        type="date"
        :picker-date="pickerDate"
      />
      <error-message cssClass="mb-2" errorType="error" v-show="formError">
        Sorry, there was an error creating your account. Please try again later.
      </error-message>
      <v-btn @click="onSubmit" block variant="flat" color="primary"> Sign Up </v-btn>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { supabase } from '@/supabase/supabase'
import { PasswordUtils } from '@/utilities/PasswordUtils'
import ErrorMessage from '@/atoms/ErrorMessage.vue'

export default defineComponent({
  components: { ErrorMessage },
  setup() {
    const valid = ref(false)
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const phoneNumber = ref('')
    const dateOfBirth = ref('')
    const pickerDate = ref(new Date())
    const formError = ref(false)
    const nameRules = [(v: string) => !!v || 'Name is required']
    const emailRules = [
      (v: string) => !!v || 'Email is required',
      (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid'
    ]
    const passwordRules = [
      (v: string) => !v && 'Password is required',
      (v: string) =>
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v) &&
        'Password too weak, please use a mix of uppercase, lowercase, numbers and symbols.'
    ]
    const phoneNumberRules = [(v: string) => !!v || 'Phone number is required']
    const dateOfBirthRules = [(v: string) => !!v || 'Date of birth is required']
    const onSubmit = async () => {
      // your code to submit the form
      const signUpOptions = {
        email: email.value,
        password: password.value,
        phone: `+95${phoneNumber.value}`,
        options: {
          data: {
            name: name.value,
            phoneNumber: phoneNumber.value,
            dateOfBirth: dateOfBirth.value
          }
        }
      }
      const { data: authData, error: authError } = await supabase.auth.signUp(signUpOptions)
      if (!authError && authData?.user) {
        // User is successfully created in supbase
        console.log('User stored in auth successfully')
        let hashedPassword: string = ''
        if (password.value != null) {
          const passwordHasher = new PasswordUtils()
          hashedPassword = await passwordHasher.hashPassword(password.value)
        }
        const insertOptions = {
          name: name.value,
          email: email.value,
          password: hashedPassword,
          phone: `+95${phoneNumber.value}`,
          dateOfBirth: dateOfBirth.value
        }
        try {
          const { data: insertData, error: insertError } = await supabase
            .from('users')
            .insert(insertOptions)
            .select()
          if (insertError) {
            throw new Error('Failed to insert user data')
          }
          if (insertData?.length !== 0) {
            console.log({
              user: insertData,
              message: 'User is successfully stored in the database with information'
            })
          }
        } catch (insertError) {
          console.log(insertError)
          formError.value = true
        }
      } else {
        console.error(authError)
        formError.value = true
      }
    }
    return {
      valid,
      name,
      email,
      password,
      phoneNumber,
      dateOfBirth,
      pickerDate,
      nameRules,
      emailRules,
      passwordRules,
      phoneNumberRules,
      dateOfBirthRules,
      onSubmit,
      formError
    }
  }
})
</script>
