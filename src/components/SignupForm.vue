<template>
    <div>
        <div class="signup-form">
            <form @submit.prevent="validateForm">
                <!-- Email Field -->
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="form.email" @input="validateField('email')" />
                    <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
                </div>

                <div>
                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="form.password" @input="validateField('password')" />
                    <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
                </div>

                <!-- Role Selection -->
                <div class="form-group">
                    <label for="role">Role:</label>
                    <select id="role" v-model="form.role" class="custom-select" @change="validateField('role')">
                        <option value="Web Developer">Web Developer</option>
                        <option value="Web Designer">Web Designer</option>
                    </select>
                    <span class="error-message" v-if="errors.role">{{ errors.role }}</span>
                </div>

                <!-- Skills Input -->
                <div>
                    <label for="skills">Skills:</label>
                    <input type="text" id="skills" v-model="skillInput" @keyup.enter.prevent="addSkill"
                        @keyup="addSkillOnComma" placeholder="Add skills" />
                    <div class="skills-container" v-if="form.skills.length">
                        <div class="skills-grid">
                            <div v-for="(skill, index) in form.skills" :key="index" class="skills-inner-container">
                                <div class="skill-badge">
                                    <span>{{ skill }}</span>
                                    <font-awesome-icon :icon="['far', 'pen-to-square']" />

                                </div>
                            </div>
                        </div>
                        <span class="error-message" v-if="errors.skills">{{ errors.skills }}</span>
                    </div>
                </div>

                <!-- Terms Checkbox -->
                <div class="check-box">
                    <input type="checkbox" v-model="form.terms" id="terms" @change="validateField('terms')" />
                    <label for="terms">Accept Terms and Conditions</label>
                </div>
                <span class="error-message" v-if="errors.terms">{{ errors.terms }}</span>

                <!-- Submit Button -->
                <button class="form-submit-btn" type="submit">Create an Account</button>
            </form>
        </div>

        <!-- Display Submitted Data -->
        <div v-if="submitted" class="user-info">
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
            const skill = this.skillInput.trim();
            if (skill && !this.form.skills.includes(skill)) {
                this.form.skills.push(skill);
                this.skillInput = '';
                this.errors.skills = '';
            }
        },

        addSkillOnComma(event) {
            if (event.key === ',') {
                this.skillInput = this.skillInput.replace(',', '');
                this.addSkill();
            }
        },

        removeSkill(index) {
            this.form.skills.splice(index, 1);
            if (this.form.skills.length === 0) {
                this.errors.skills = 'At least one skill is required';
            }
        },

        editSkill(index) {
            this.skillInput = this.form.skills[index];
            this.removeSkill(index);
        },

        validateField(field) {

            if (field === 'email') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!this.form.email) {
                    this.errors.email = 'This field is required';
                } else if (!emailPattern.test(this.form.email)) {
                    this.errors.email = 'Invalid email format';
                } else {
                    this.errors.email = '';
                }
            }

            // Password validation
            if (field === 'password') {
                const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                if (!this.form.password) {
                    this.errors.password = 'This field is required';
                } else if (!passwordPattern.test(this.form.password)) {
                    this.errors.password =
                        'Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 number, and 1 special character.';
                } else {
                    this.errors.password = '';
                }
            }

            // Role validation
            if (field === 'role') {
                if (!this.form.role) {
                    this.errors.role = 'This field is required';
                } else {
                    this.errors.role = '';
                }
            }

            // Skills validation
            if (field === 'skills') {
                if (this.form.skills.length === 0) {
                    this.errors.skills = 'At least one skill is required';
                } else {
                    this.errors.skills = '';
                }
            }

            // Terms validation
            if (field === 'terms') {
                if (!this.form.terms) {
                    this.errors.terms = 'You must accept the terms and conditions';
                } else {
                    this.errors.terms = '';
                }
            }
        },

        // Main validation for form submission
        validateForm() {
            this.errors = {};

            // Validate each field
            this.validateField('email');
            this.validateField('password');
            this.validateField('role');
            this.validateField('skills');
            this.validateField('terms');

            // Submit if no errors
            if (Object.keys(this.errors).length === 0 || Object.values(this.errors).every((error) => !error)) {
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
    align-items: baseline;
}

.signup-form {
    background-color: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 500px;
    text-align: left;
}

.signup-form label {
    font-size: 10px;
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
    margin-bottom: 15px;
    border: none;
    border-bottom: 2px solid #ddd;
    font-size: 14px;
    outline: none;
    background-color: transparent;
}

.error-message {
    color: red;
    font-size: 12px;
    text-align: left;
    margin-bottom: 5px;
}

.signup-form input::placeholder {
    color: #aaa;
}

.signup-form input:focus {
    border-bottom: 2px solid #007bff;
}

.skills-container {
    margin-bottom: 10px;
    /* Add some spacing below the skills container */
}

.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 15px;
    /* Space between grid items */
}

.skills-inner-container {
    display: flex;
    flex-direction: column;
    /* Stack badge and buttons vertically */
    align-items: center;
    /* Center items horizontally */
}

.skill-badge {
    position: relative;
    background-color: #f1f1f1;
    color: #333;
    border-radius: 5px;
    padding: 10px 15px;
    /* Add some padding to badges */
    font-size: 17px;
    display: inline-flex;
    align-items: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    width: 100%;
    /* Make badges take full width of their container */
}

.skill-button {
    display: flex;
    flex-direction: row;
    /* Align buttons in a row */
    gap: 5px;
    /* Space between buttons */
    margin-top: 5px;
    /* Add some space above buttons */
}

.edit-skill,
.remove-skill-btn {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease, transform 0.2s;
}

.edit-skill {
    background-color: #007bff;
    color: white;
}

.remove-skill-btn {
    background-color: #dc3545;
    color: white;
}

/* Hover effects */
.edit-skill:hover {
    background-color: #0056b3;
}

.remove-skill-btn:hover {
    background-color: #c82333;
}

/* Hover effects */
.edit-skill:hover {
    background-color: #0056b3;
}

.remove-skill-btn:hover {
    background-color: #c82333;
}



.check-box {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
    margin-left: 0;
    margin-bottom: 5px;
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

.form-submit-btn {
    background-color: #007bff;
    color: white;
    padding: 12px 5px;
    border: none;
    border-radius: 30px;
    font-size: 16px;
    cursor: pointer;
    width: 50%;
    margin-top: 15px;
}

.form-submit-btn:hover {
    background-color: #0056b3;
}

.user-info {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
    color: #333;
    text-align: left;
}

.user-info h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #007bff;
}

.user-info p {
    font-size: 1rem;
    margin: 8px 0;
    color: #555;
}

.user-info p span {
    font-weight: bold;
}

.user-info p:first-of-type {
    margin-top: 20px;
}

@media (max-width:425px) {
    .signup-form {
        width: 340px;
    }

    .form-submit-btn {
        font-size: 14px;
    }
}

@media (max-width:375px) {
    .signup-form {
        width: 300px;
    }

    .form-submit-btn {
        font-size: 12px;
    }
}

@media (min-width:1600px) {
    .signup-form {
        width: 500px;
    }

    .form-submit-btn {
        font-size: 16px;
    }

    .user-info {
        max-width: 500px;
    }

}
</style>
