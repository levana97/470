class User {
    constructor(name, email, age) {
        this.name = name;
        this.email = email;
        this.age = age;
    }

    set(name, email, age) {
        this.name = name;
        this.email = email;
        this.age = age;
    };

    get() {
        return {
            'name': this.name,
            'age': this.age,
            'email': this.email,
            'id': this.id,
        };
    };
}

module.exports = User;