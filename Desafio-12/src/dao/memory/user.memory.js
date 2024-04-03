export default class UserMemory {
    constructor() {
        this.users = [];
    }

    async getUser(email) {
        return this.users.find(user => user.email === email);
    }

    async getUserById(id) {
        return this.users.find(user => user.id === id);
    }

    async addUser(user) {
        try {
            const validation = !user.first_name || !user.last_name || !user.email || !user.age || !user.password ? false : true;
            if (!validation)
                return { message: "ERROR", rdo: "Faltan datos en la creacion del usuario" }
            this.users.push(user);
            return { message: "OK", rdo: user };
        } catch (error) {
            return { message: "ERROR", rdo: "Error al dar de alta el usuario - " + error.message };
        }
    }

    async deleteUser(id) {
        try {
            const index = this.users.findIndex(user => user.id === id);
            if (index !== -1) {
                const deletedUser = this.users.splice(index, 1)[0];
                return { message: "OK", rdo: `Usuario con ID ${id} eliminado exitosamente.` };
            }
            return { message: "ERROR", rdo: `No se encontró el usuario con el ID ${id}. No se pudo eliminar.` };
        } catch (error) {
            return { message: "ERROR", rdo: "Error al eliminar el usuario - " + error.message };
        }
    }
}