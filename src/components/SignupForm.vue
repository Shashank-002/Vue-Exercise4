<template>
    <div class="signup-form">
        <form @submit.prevent="validateForm">
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="form.email" required />
                <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
            </div>

            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="form.password" required />
                <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
            </div>

            <div>
                <label for="role">Role:</label>
                <select id="role" v-model="form.role" class="custom-select">
                    <option value="Web Developer">Web Developer</option>
                    <option value="Web Designer">Web Designer</option>
                </select>
            </div>

            <div>
                <label for="skills">Skills:</label>
                <input type="text" id="skills" v-model="skillInput" @keyup.enter="addSkill" @keyup="addSkillOnComma"
                    placeholder="Add skills" />
                <div v-if="form.skills.length">
                    <span v-for="(skill, index) in form.skills" :key="index">
                        {{ skill }}
                        <button @click="removeSkill(index)">x</button>
                    </span>
                </div>
            </div>

            <div class="check-box">
                <input type="checkbox" v-model="form.terms" id="terms" required />
                <label for="terms">Accept Terms and Conditions</label>
                <span v-if="errors.terms">{{ errors.terms }}</span>
            </div>

            <button type="submit">Create an Account</button>
        </form>

        <div v-if="submitted">
            <h3>Submitted Data:</h3>
            <p>Email: {{ form.email }}</p>
            <p>Role: {{ form.role }}</p>
            <p>Skills: {{ form.skills.join(', ') }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SignupForm',
    data() {
        return {
            form: {
                email: '',
                password: '',
                role: '',
                skills: [],
                terms: false,
            },
            skillInput: '',
            errors: {},
            submitted: false,
        };
    },
    methods: {
        addSkill() {
            if (this.skillInput.trim()) {
                this.form.skills.push(this.skillInput.trim());
                this.skillInput = '';
            }
        },
        addSkillOnComma(event) {
            if (event.key === ',') {
                this.addSkill();
            }
        },
        removeSkill(index) {
            this.form.skills.splice(index, 1);
        },
        validateForm() {
            this.errors = {};
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

            if (!emailPattern.test(this.form.email)) {
                this.errors.email = 'Invalid email format';
            }

            if (!passwordPattern.test(this.form.password)) {
                this.errors.password =
                    'Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 number, and 1 special character.';
            }

            if (!this.form.terms) {
                this.errors.terms = 'You must accept the terms and conditions';
            }

            if (Object.keys(this.errors).length === 0) {
                this.submitted = true;
            }
        },
    },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

body {
  background-color: #f1f1f1;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.signup-form {
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
}

.signup-form label {
  font-size: 12px;
  font-weight: bold;
  text-align: left;
  color: #888;
  display: block;
  margin-top: 15px;
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 0.5px;

}

.signup-form input[type="email"],
.signup-form input[type="password"],
.signup-form input[type="text"],
.signup-form select {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 2px solid #ddd;
  font-size: 14px;
  outline: none;
  background-color: transparent;
}

.error-message{
    color: red;
    font-size: 12px;
}

.signup-form input::placeholder {
  color: #aaa;
}

.signup-form input:focus {
  border-bottom: 2px solid #007bff;
}

.signup-form select {
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #ddd;
  cursor: pointer;
}

.custom-select option {
    background-color: #ffffff; 
    color: #333; 
    padding: 10px; 
    font-size: 16px;
    width: 50%;
}

.skills-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.skills-container .skill {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 8px 15px;
  font-size: 12px;
  color: #333;
  display: flex;
  align-items: center;
}
.check-box {
  display: flex;
  align-items: center;
  justify-content: flex-start; 
  gap: 5px; 
  margin-left: 0; 
  margin-bottom: 20px;
}

.terms {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.terms label {
  font-size: 12px;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.signup-form input[type="checkbox"] {
  margin-right: 5px;
  cursor: pointer;
  margin-top: 8px;
}

.signup-form button {
  background-color: #007bff;
  color: white;
  padding: 12px 5px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  width: 50%;
}

.signup-form button:hover {
  background-color: #0056b3;
}
</style>



