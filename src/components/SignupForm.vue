<template>
    <div>
        <div class="signup-form">
            <form @submit.prevent="validateForm">
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="form.email" required />
                    <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
                </div>

                <div>
                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="form.password" required @keyup.enter.prevent />
                    <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
                </div>

                <div class="form-group">
                    <label for="role">Role:</label>
                    <select id="role" v-model="form.role" class="custom-select">
                        <option value="Web Developer">Web Developer</option>
                        <option value="Web Designer">Web Designer</option>
                    </select>
                </div>

                <div>
                    <label for="skills">Skills:</label>
                    <input type="text" id="skills" v-model="skillInput" @keyup.enter.prevent="addSkill"
                        @keyup="addSkillOnComma" placeholder="Add skills" />
                    <div class="skills-container" v-if="form.skills.length">
                        <div v-for="(skill, index) in form.skills" :key="index" class="skill-badge">
                            <span>{{ skill }}</span>
                            <button class="remove-skill-btn" @click="removeSkill(index)">&#10005;</button>
                        </div>
                    </div>
                </div>


                <div class="check-box">
                    <input type="checkbox" v-model="form.terms" id="terms" required />
                    <label for="terms">Accept Terms and Conditions</label>
                    <span v-if="errors.terms">{{ errors.terms }}</span>
                </div>

                <button class="form-submit-btn" type="submit">Create an Account</button>
            </form>
        </div>

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
            }
        },
        addSkillOnComma(event) {
            if (event.key === ',') {
                this.skillInput = this.skillInput.replace(',', '');
                this.addSkill();
            }
            if (event.key === 'Enter') {
                event.preventDefault();
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
    align-items: baseline;
}

.signup-form {
    background-color: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 400px;
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
    margin-bottom: 20px;
    border: none;
    border-bottom: 2px solid #ddd;
    font-size: 14px;
    outline: none;
    background-color: transparent;
}

.error-message {
    color: red;
    font-size: 12px;
}

.signup-form input::placeholder {
    color: #aaa;
}

.signup-form input:focus {
    border-bottom: 2px solid #007bff;
}

.skills-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 10px;
}

.skill-badge {
    position: relative;
    background-color: #f1f1f1;
    color: #333;
    border-radius: 5px;
    padding: 5px 5px;
    font-size: 10px;
    display: inline-flex;
    align-items: center;
    cursor: default;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.remove-skill-btn {
    background: none;
    border: none;
    font-size: 8px;
    color: white;
    position: absolute;
    top: -3px;
    right: -3px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: flex;
    align-items: baseline;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    background-color: #007bff;
}

.remove-skill-btn:hover {
    background-color: red;
    color: white;
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

.form-submit-btn {
    background-color: #007bff;
    color: white;
    padding: 12px 5px;
    border: none;
    border-radius: 30px;
    font-size: 16px;
    cursor: pointer;
    width: 50%;
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
