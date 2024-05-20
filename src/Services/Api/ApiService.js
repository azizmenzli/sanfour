import axiosInstance from "./ApiInterceptor";
// import urlConfig from "./Endpoints/url.json"; // Make sure this path matches your project structure

class ApiService {
    constructor() {
        // Get the Axios instance configured with the interceptor
        this.axiosInstance = axiosInstance;
    }

    /**
     * Registers a new user.
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * @param {string} name - The name of the user.
     * @param {string} role - The role of the user.
     * @param {string} [Adress] - The address of the user.  
     * @param {string} [Ville] - The city of the user.
     * @returns The response from the server.
     */
    async register(email, password, name, role, Adress, Ville) {
        try {
            const response = await this.axiosInstance.post("/auth/register", {
                email,
                password,
                name,
                role,
                Adress,
                Ville,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Logs in a user.
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * @returns The response from the server, including the authentication token.
     */
    async login(email, password) {
        try {
            const response = await this.axiosInstance.post("/auth/login", {
                email,
                password,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async createCommand(commandData) {
        try {
          const response = await axiosInstance.post("/commands/", commandData);
          return response.data;
        } catch (error) {
          throw error;
        }
      }
      async getCommandByBarcode(barcode) {
        try {
          const response = await axiosInstance.get(`/commands/barcode/${barcode}`);
          return response.data;
        } catch (error) {
          throw error;
        }
      }
      async getCommandById(commandId) {
        try {
          const response = await axiosInstance.get(`/commands/${commandId}`);
          return response.data;
        } catch (error) {
          throw error;
        }
      }
    
      // Method to update the status of a command
      async updateCommandStatus(commandId, status) {
        try {
          const response = await axiosInstance.patch(`/commands/${commandId}/status`, { status });
          return response.data;
        } catch (error) {
          throw error;
        }
      }
      async getAllCommands() {
        try {
          const response = await axiosInstance.get('/commands');
        
          return response.data;
        } catch (error) {
          throw error;
        }
      }
      async changePassword(currentPassword, newPassword) {
        try {
            const response = await this.axiosInstance.patch("/auth/change-password", {
                currentPassword,
                newPassword,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    // Additional methods as needed...
}

export default new ApiService();
