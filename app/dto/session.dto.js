export class SessionDTO {
    constructor(user) {
        this.id = user._id?.toString();
        this.email = user.email;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.role = user.role;
    }

    toResponse() {
        return {
            id: this.id,
            email: this.email,
            first_name: this.first_name,
            last_name: this.last_name,
            role: this.role
        };
    }
}