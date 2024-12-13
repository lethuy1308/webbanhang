import axiosClient from "../axiosClient";

const LoginRequest = async (payload) => {
    try {
        const res = await axiosClient.get("/users");
        const kiemTraUser = res.find(user => user.email === payload.email && user.password === payload.password);
        if(kiemTraUser){
            return kiemTraUser;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export default LoginRequest;